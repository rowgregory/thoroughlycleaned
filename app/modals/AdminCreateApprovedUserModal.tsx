import React, { FormEvent } from 'react'
import AdminModal from '../components/common/AdminModal'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import useForm from '../hooks/useForm'
import validateApprovedUserForm from '../validations/validateApprovedUserForm'
import { useCreateApprovedUserMutation } from '../redux/services/approvedUserApi'
import { resetApprovedUser } from '../redux/features/approvedUserSlice'
import AdminApprovedUserForm from '../forms/AdminApprovedUserForm'
import { ADMIN_APPROVED_USER_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import AdminModalClostBtn from '../components/admin/AdminModalClostBtn'
import useSoundEffect from '../hooks/useSoundEffect'

const AdminCreateApprovedUserModal = () => {
  const dispatch = useAppDispatch()
  const { openModalCreateApprovedUser } = useAppSelector((state: RootState) => state.approvedUser)
  const [createApprovedUser, { isLoading, error }] = useCreateApprovedUserMutation()
  const { profile } = useAppSelector((state: RootState) => state.profile)
  const { play: playError } = useSoundEffect('/sound-effects/cartoon-jump.mp3', profile.isSoundEffectsOn)
  const { inputs, handleInput, submitted, errors, setErrors, setSubmitted } = useForm(
    ADMIN_APPROVED_USER_INITIAL_FIELDS,
    validateApprovedUserForm
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

    await createApprovedUser(inputs)
      .unwrap()
      .then(() => reset())
      .catch(() => playError())
  }

  return (
    <AdminModal show={openModalCreateApprovedUser}>
      <AdminModalClostBtn reset={reset} />
      <AdminApprovedUserForm
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        inputs={inputs}
        submitted={submitted}
        errors={errors}
        reset={reset}
        isLoading={isLoading}
        isUpdating={false}
        error={error?.data?.message}
      />
    </AdminModal>
  )
}

export default AdminCreateApprovedUserModal
