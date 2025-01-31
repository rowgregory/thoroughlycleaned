'use client'

import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import AdminCreateApprovedUserModal from '@/app/modals/AdminCreateApprovedUserModal'
import { useFetchApprovedUsersQuery } from '@/app/redux/services/approvedUserApi'
import ApprovedUserCard from '@/app/components/admin/ApprovedUserCard'
import AdminUpdateApprovedUserModal from '@/app/modals/AdminUpdateApprovedUserModal'
import AdminCommandArea from '@/app/components/admin/AdminCommandArea'
import AdminErrorText from '@/app/components/admin/AdminErrorText'
import FullScreenAppleLoader from '@/app/components/common/FullScreenAppleLoader'

const ApprovedUsers = () => {
  const { isLoading, data: approvedUser, error } = useFetchApprovedUsersQuery()
  const { openModalCreateApprovedUser, openModalUpdateApprovedUser } = useAppSelector((state: RootState) => state.approvedUser)

  return (
    <>
      {openModalCreateApprovedUser && <AdminCreateApprovedUserModal />}
      {openModalUpdateApprovedUser && <AdminUpdateApprovedUserModal />}
      <AdminCommandArea type="APPROVED_USERS" btnText="Add New User" />
      {isLoading ? (
        <FullScreenAppleLoader />
      ) : error ? (
        <AdminErrorText error={error?.data?.message} />
      ) : (
        <div className="grid grid-cols-12 gap-y-10 760:gap-x-10 animate-fadeIn">
          {approvedUser?.approvedUsers?.map((user: any) => (
            <ApprovedUserCard key={user?.id} {...user} />
          ))}
        </div>
      )}
    </>
  )
}

export default ApprovedUsers
