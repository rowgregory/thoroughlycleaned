'use client'

import React, { useState } from 'react'
import { useFetchClientLeadsQuery, useUpdateClientLeadMutation } from '@/app/redux/services/clientLeadApi'
import { RootState, useAppSelector } from '@/app/redux/store'
import AdminClientLeadCard from '@/app/components/admin/AdminClientLeadCard'
import AdminCommandArea from '@/app/components/admin/AdminCommandArea'
import AdminErrorText from '@/app/components/admin/AdminErrorText'
import FullScreenAppleLoader from '@/app/components/common/FullScreenAppleLoader'

const ClientLeads = () => {
  const { isLoading: loadingClientLeads, error } = useFetchClientLeadsQuery()
  const { clientLeads } = useAppSelector((state: RootState) => state.clientLead)
  const [updateClientLead] = useUpdateClientLeadMutation()
  const [loadingCheckbox, setLoadingCheckbox] = useState<Record<string, boolean>>({})

  const handleUpdateContacted = async (id: string, contacted: boolean) => {
    setLoadingCheckbox((prev) => ({ ...prev, [id]: true }))
    await updateClientLead({ id, haveContacted: contacted })
      .unwrap()
      .catch(() => {})
    setLoadingCheckbox((prev) => ({ ...prev, [id]: false }))
  }

  return (
    <>
      <AdminCommandArea type="CLIENT_LEADS" />
      {loadingClientLeads ? (
        <FullScreenAppleLoader />
      ) : error ? (
        <AdminErrorText error={error?.data?.message} />
      ) : (
        <div className="max-w-[690px] 1160:max-w-screen-990 w-full grid grid-cols-12 gap-y-7 760:gap-7 animate-fadeIn">
          {clientLeads?.map((clientLead) => (
            <AdminClientLeadCard
              key={clientLead.id}
              clientLead={clientLead}
              loadingCheckbox={loadingCheckbox}
              handleUpdateContacted={handleUpdateContacted}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default ClientLeads
