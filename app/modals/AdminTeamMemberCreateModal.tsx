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
import { useCreateTeamMemberMutation } from '../redux/services/teamMemberApi'
import { setActiveTeamMember, setModalCloseTeamMemberCreate } from '../redux/features/teamMemberSlice'

const AdminTeamMemberCreateModal = () => {
  const dispatch = useAppDispatch()
  const [createTeamMember, { error }] = useCreateTeamMemberMutation()
  const { modalOpenTeamMemberCreate } = useAppSelector((state: RootState) => state.teamMember)
  const pictureRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const { inputs, errors, handleInput, setInputs, setErrors, handleUploadProgress, handleDrop, handleFileChange, submitted, setSubmitted } =
    useForm(ADMIN_TEAM_MEMBER_INITIAL_FIELDS, validateTeamMemberForm)

  const reset = () => {
    setInputs({})
    setErrors({})
    dispatch(setModalCloseTeamMemberCreate())
    setSubmitted(false)
    dispatch(setActiveTeamMember({}))
  }

  const handleSubmitCreateTeamMember = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setSubmitted(true)

    const isValid = validateTeamMemberForm(inputs, setErrors)
    if (!isValid) return setLoading(false)

    const url = await uploadFileToFirebase(inputs.file, handleUploadProgress, 'image')

    await createTeamMember({ ...inputs, url, fileName: inputs.file.name })
      .unwrap()
      .then(() => reset())
      .catch(() => {})

    setLoading(false)
  }

  return (
    <AdminModal show={modalOpenTeamMemberCreate}>
      <AwesomeIcon icon={timesIcon} onClick={() => reset()} className="w-5 h-5 text-white absolute top-5 left-5 z-10 cursor-pointer" />
      <AdminTeamMemberForm
        handleSubmit={handleSubmitCreateTeamMember}
        isUpdating={false}
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

export default AdminTeamMemberCreateModal
