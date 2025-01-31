import React from 'react'
import AdminProfileForm from '../forms/AdminProfileForm'
import AdminModal from '../components/common/AdminModal'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { timesIcon } from '../icons'
import { setCloseModalProfileUpdate } from '../redux/features/profileSlice'

const AdminProfileUpdateModal = () => {
  const dispatch = useAppDispatch()
  const { openModalProfileUpdate } = useAppSelector((state: RootState) => state.profile)

  return (
    <AdminModal show={openModalProfileUpdate}>
      <AwesomeIcon
        icon={timesIcon}
        onClick={() => dispatch(setCloseModalProfileUpdate())}
        className="w-5 h-5 text-white absolute top-5 left-5 z-10 cursor-pointer"
      />
      <AdminProfileForm />
    </AdminModal>
  )
}

export default AdminProfileUpdateModal
