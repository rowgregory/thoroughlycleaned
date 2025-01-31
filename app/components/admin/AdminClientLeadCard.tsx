import { formatPhoneNumber } from '@/app/utils/string.functions'
import React, { FC } from 'react'
import AppleLoader from '../common/AppleLoader'
import AdminClientLeadCheckbox from './AdminClientLeadCheckbox'
import { formatDate } from '@/app/utils/date.functions'

interface AdminClientLeadCardProps {
  clientLead: any
  loadingCheckbox: any
  handleUpdateContacted: any
}

const ServicePill: FC<{ serviceType: string }> = ({ serviceType }) => (
  <div
    className={`${
      serviceType === 'Commercial'
        ? 'bg-[#252230] text-[#845ADE]'
        : serviceType === 'Biohazard'
        ? 'bg-lime-950 text-lime-600'
        : 'bg-[#2a1d1f] text-pink-600'
    } mt-1 px-2 py-1 rounded-md text-[10px] w-fit`}
  >
    {serviceType}
  </div>
)

const AdminClientLeadCard: FC<AdminClientLeadCardProps> = ({ clientLead, loadingCheckbox, handleUpdateContacted }) => {
  return (
    <div
      className={`shadow-adminServiceCard col-span-12 md:col-span-6 1160:col-span-4 border-zinc-700 border-2 p-5 rounded-xl flex flex-col justify-between`}
    >
      <div className="flex flex-col">
        <a href={`tel:${clientLead?.phoneNumber}`} className="font-rubik font-bold text-2xl text-white mb-1">
          {formatPhoneNumber(clientLead?.phoneNumber)}
        </a>
        <div className="flex items-center justify-between">
          <h1 className="font-rubik text-lg mb-1 text-[#98989b]">{clientLead?.name}</h1>
          {loadingCheckbox[clientLead?.id] ? (
            <AppleLoader />
          ) : (
            <AdminClientLeadCheckbox {...clientLead} handleUpdateContacted={handleUpdateContacted} />
          )}
        </div>
      </div>
      <ServicePill {...clientLead} />
      <div className="text-sm font-rubik text-zinc-600 mt-8">{formatDate(clientLead.createdAt)}</div>
    </div>
  )
}

export default AdminClientLeadCard
