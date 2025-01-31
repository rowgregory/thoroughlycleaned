'use client'

import React from 'react'
import AdminCommandArea from '@/app/components/admin/AdminCommandArea'
import AdminErrorText from '@/app/components/admin/AdminErrorText'
import FullScreenAppleLoader from '@/app/components/common/FullScreenAppleLoader'
import { useFetchLogsQuery } from '@/app/redux/services/logApi'
import { formatDate } from '@/app/utils/date.functions'

const Logs = () => {
  const { isLoading, data, error: fetchError } = useFetchLogsQuery(undefined, { refetchOnMountOrArgChange: true })

  return (
    <>
      <AdminCommandArea type="LOGS" />
      {isLoading ? (
        <FullScreenAppleLoader />
      ) : fetchError ? (
        <AdminErrorText error={fetchError?.data?.message} />
      ) : (
        <div className="w-full animate-fadeIn flex flex-col gap-y-7">
          {data?.logs?.map((log: any) => (
            <div
              key={log.id}
              className="grid grid-cols-12 w-full gap-4 hover:bg-[#2C2C2E] px-2 py-1 -ml-2 rounded-md relative after:absolute after:content-[''] after:w-full after:z-10 after:h-[0.5px] after:bg-[#2c2c2e] after:-bottom-6 after:left-0 760:after:hidden"
            >
              <div className="col-span-12 1160:col-span-2 text-zinc-200 whitespace-nowrap">{formatDate(log?.createdAt)}</div>
              <div className="col-span-12 1160:col-span-3 text-zinc-200 whitespace-nowrap 1160:text-center">
                {log?.metadata?.url?.split?.('api')?.[1]}
              </div>
              <div className="col-span-12 1160:col-span-3 text-zinc-200">{log?.metadata?.errorMessage}</div>
              <div className="col-span-12 1160:col-span-4 text-zinc-200 break-words">{log?.metadata?.errorLocation}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Logs
