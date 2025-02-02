import React, { useRef, useState } from 'react'
import AdminModal from '../components/common/AdminModal'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { timesIcon } from '../icons'
import AdminTeamMemberForm from '../forms/AdminTeamMemberForm'
import useForm from '../hooks/useForm'
import { ADMIN_TEAM_MEMBER_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import validateTeamMemberForm from '../validations/validateTeamMemberForm'
import uploadFileToFirebase from '../utils/uploadFileToFirebase'
import { useUpdateTeamMemberMutation } from '../redux/services/teamMemberApi'
import { setActiveTeamMember, setModalCloseTeamMemberUpdate } from '../redux/features/teamMemberSlice'

const AdminTeamMemberUpdateModal = () => {
  const dispatch = useAppDispatch()
  const [updateTeamMember, { error }] = useUpdateTeamMemberMutation()
  const { modalOpenTeamMemberUpdate, teamMember } = useAppSelector((state: RootState) => state.teamMember)
  const pictureRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const { inputs, errors, handleInput, setInputs, setErrors, handleUploadProgress, handleDrop, handleFileChange, submitted, setSubmitted } =
    useForm(ADMIN_TEAM_MEMBER_INITIAL_FIELDS, validateTeamMemberForm, teamMember)

  const reset = () => {
    setInputs({})
    setErrors({})
    dispatch(setModalCloseTeamMemberUpdate())
    setSubmitted(false)
    dispatch(setActiveTeamMember({}))
  }

  const handleSubmitUpdateTeamMember = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setSubmitted(true)

    const isValid = validateTeamMemberForm(inputs, setErrors)
    if (!isValid) return setLoading(false)

    let url
    if (inputs.file) {
      url = await uploadFileToFirebase(inputs.file, handleUploadProgress, 'image')
    }

    await updateTeamMember({ ...inputs, url: url || inputs.url, fileName: inputs?.file?.name || inputs.fileName })
      .unwrap()
      .then(() => reset())
      .catch(() => {})

    setLoading(false)
  }

  return (
    <AdminModal show={modalOpenTeamMemberUpdate}>
      <AwesomeIcon icon={timesIcon} onClick={() => reset()} className="w-5 h-5 text-white absolute top-5 left-5 z-10 cursor-pointer" />
      <AdminTeamMemberForm
        handleSubmit={handleSubmitUpdateTeamMember}
        isUpdating={true}
        handleDrop={handleDrop}
        inputRef={pictureRef}
        inputs={inputs}
        handleFileChange={handleFileChange}
        errors={errors}
        submitted={submitted}
        handleInput={handleInput}
        reset={reset}
        loading={loading}
        error={error?.data?.message}
      />
    </AdminModal>
  )
}

export default AdminTeamMemberUpdateModal
