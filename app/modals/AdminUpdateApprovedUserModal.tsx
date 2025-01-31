import React, { FormEvent } from 'react'
import AdminModal from '../components/common/AdminModal'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import useForm from '../hooks/useForm'
import validateApprovedUserForm from '../validations/validateApprovedUserForm'
import AdminApprovedUserForm from '../forms/AdminApprovedUserForm'
import { useUpdateApprovedUserMutation } from '../redux/services/approvedUserApi'
import { resetApprovedUser } from '../redux/features/approvedUserSlice'
import { ADMIN_APPROVED_USER_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import AdminModalClostBtn from '../components/admin/AdminModalClostBtn'
import useSoundEffect from '../hooks/useSoundEffect'

const AdminUpdateApprovedUserModal = () => {
  const dispatch = useAppDispatch()
  const { openModalUpdateApprovedUser, approvedUser } = useAppSelector((state: RootState) => state.approvedUser)
  const [updateApprovedUser, { isLoading, error }] = useUpdateApprovedUserMutation()
  const { profile } = useAppSelector((state: RootState) => state.profile)
  const { play: playError } = useSoundEffect('/sound-effects/cartoon-jump.mp3', profile.isSoundEffectsOn)
  const { inputs, handleInput, submitted, errors, setErrors, setSubmitted } = useForm(
    ADMIN_APPROVED_USER_INITIAL_FIELDS,
    validateApprovedUserForm,
    approvedUser
  )

  const reset = () => {
    dispatch(resetApprovedUser())
    setSubmitted(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    const isValid = validateApprovedUserForm(inputs, setErrors)
    if (!isValid) return

    await updateApprovedUser(inputs)
      .unwrap()
      .then(() => reset())
      .catch(() => playError())
  }

  return (
    <AdminModal show={openModalUpdateApprovedUser}>
      <AdminModalClostBtn reset={reset} />
      <AdminApprovedUserForm
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        inputs={inputs}
        submitted={submitted}
        errors={errors}
        reset={reset}
        isLoading={isLoading}
        isUpdating={true}
        error={error?.data?.message}
      />
    </AdminModal>
  )
}

export default AdminUpdateApprovedUserModal
