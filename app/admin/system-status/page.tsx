'use client'

import React from 'react'
import { useApprovedUserSystemStatusQuery } from '@/app/redux/services/approvedUserApi'
import { useAuthSystemStatusQuery } from '@/app/redux/services/authApi'
import AppleLoader from '@/app/components/common/AppleLoader'
import { useClientLeadSystemStatusQuery } from '@/app/redux/services/clientLeadApi'
import { usePhotoGallerySystemStatusQuery } from '@/app/redux/services/photoGalleryImageApi'
import { useProfileSystemStatusQuery } from '@/app/redux/services/profileApi'
import { useServiceSystemStatusQuery } from '@/app/redux/services/serviceApi'
import { useTestimonialSystemStatusQuery } from '@/app/redux/services/testimonialApi'
import { useTextBlockSystemStatusQuery } from '@/app/redux/services/textBlockApi'
import AwesomeIcon from '@/app/components/common/AwesomeIcon'
import { checkIcon, timesIcon } from '@/app/icons'
import SystemsStatusBar from '@/app/components/admin/SystemsStatusBar'
import { useUserSystemStatusQuery } from '@/app/redux/services/userApi'
import AdminCommandArea from '@/app/components/admin/AdminCommandArea'

const queries = [
  { name: 'Approved User Service', queryHook: useApprovedUserSystemStatusQuery },
  { name: 'Auth Service', queryHook: useAuthSystemStatusQuery },
  { name: 'Client Lead Service', queryHook: useClientLeadSystemStatusQuery },
  { name: 'Photo Gallery Service', queryHook: usePhotoGallerySystemStatusQuery },
  { name: 'Profile Service', queryHook: useProfileSystemStatusQuery },
  { name: 'Cleaning Solution Service', queryHook: useServiceSystemStatusQuery },
  { name: 'Testimonial Service', queryHook: useTestimonialSystemStatusQuery },
  { name: 'TextBlock Service', queryHook: useTextBlockSystemStatusQuery },
  { name: 'User Service', queryHook: useUserSystemStatusQuery }
]

const SystemStatus = () => {
  const statusData: any = queries.map(({ name, queryHook }) => {
    const { data, isLoading, isError, error } = queryHook()
    return {
      name,
      data,
      isLoading,
      isError,
      error
    }
  })

  const allQueriesOperational = statusData.every((status: any) => !status.isLoading && !status.isError)
  const allLoading = statusData.some((status: any) => status.isLoading)
  const systemError = statusData.some((status: any) => !status.isLoading && status.isError)

  return (
    <>
      <AdminCommandArea type="SYSTEM_STATUS" />
      <div className="flex items-center justify-center w-full mb-10 animate-fadeIn">
        {allQueriesOperational ? (
          <div className="flex items-center gap-x-2">
            <div className="bg-lime-800 rounded-full p-2 aspect-square w-12 h-12 flex items-center justify-center">
              <AwesomeIcon icon={checkIcon} className="text-lime-800 p-2 w-3.5 h-3.5 aspect-square text-sm bg-lime-500 rounded-full" />
            </div>
            <h4 className="text-lg rubik-regular text-white">All systems operational</h4>
          </div>
        ) : (systemError || statusData?.error) && !allLoading ? (
          <div className="flex items-center gap-x-2">
            <div className="bg-red-800 rounded-full p-2 aspect-square w-12 h-12 flex items-center justify-center">
              <AwesomeIcon icon={timesIcon} className="text-red-800 p-2 w-3.5 h-3.5 aspect-square text-sm bg-red-500 rounded-full" />
            </div>
            <h4 className="text-lg rubik-regular text-white">System Error</h4>
          </div>
        ) : (
          <AppleLoader width="w-12" />
        )}
      </div>
      {statusData.map((service: any, index: number) => (
        <div key={index} className="mb-6">
          <div className="flex items-center gap-x-3">
            <h3 className="text-lg font-rubik text-[#7e7e7e] mb-1 whitespace-nowrap">{service?.name}</h3>
            {service.isLoading && <AppleLoader />} <span className="text-xs text-red-500 font-rubik">{service?.error?.data?.message}</span>
            {!service.isLoading && (
              <AwesomeIcon
                icon={service?.error?.data?.message ? timesIcon : checkIcon}
                className={`${service?.error?.data?.message ? 'text-red-500' : 'text-lime-500'} text-xs`}
              />
            )}
          </div>
          <SystemsStatusBar isLoading={service.isLoading} status={service?.data?.status || service?.error?.data?.status} />
        </div>
      ))}
    </>
  )
}

export default SystemStatus
