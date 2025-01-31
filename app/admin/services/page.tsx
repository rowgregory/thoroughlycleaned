'use client'

import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import AdminServiceCard from '@/app/components/admin/AdminServiceCard'
import AdminServiceUpdateModal from '@/app/modals/AdminServiceUpdateModal'
import AdminServiceCreateModal from '@/app/modals/AdminServiceCreateModal'
import { useFetchServicesQuery } from '@/app/redux/services/serviceApi'
import AdminCommandArea from '@/app/components/admin/AdminCommandArea'
import AdminErrorText from '@/app/components/admin/AdminErrorText'
import FullScreenAppleLoader from '@/app/components/common/FullScreenAppleLoader'

const Services = () => {
  const { isLoading, data, error } = useFetchServicesQuery()
  const { modalOpenServiceUpdate, modalOpenServiceCreate } = useAppSelector((state: RootState) => state.service)

  return (
    <>
      {modalOpenServiceUpdate && <AdminServiceUpdateModal />}
      {modalOpenServiceCreate && <AdminServiceCreateModal />}
      <AdminCommandArea type="SERVICES" btnText="Create Service" />
      {isLoading ? (
        <FullScreenAppleLoader />
      ) : error ? (
        <AdminErrorText error={error?.data?.message} />
      ) : (
        <div className="grid grid-cols-12 gap-y-8 480:gap-8 animate-fadeIn">
          {data?.services?.map((service: any) => (
            <AdminServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </>
  )
}

export default Services
