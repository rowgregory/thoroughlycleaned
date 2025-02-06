import React, { FC } from 'react'
import { ServiceCardProps } from '@/app/types/service.types'
import { truncateString } from '@/app/utils/string.functions'
import AwesomeIcon from '../common/AwesomeIcon'
import { arrowRightIcon } from '@/app/icons'
import { useAppDispatch } from '@/app/redux/store'
import { setOpenModalServiceDetails } from '@/app/redux/features/serviceSlice'
import ServiceIconSelector from '../common/ServiceIconSelector'

const ServiceCard: FC<ServiceCardProps> = ({ url, name, description, serviceType }) => {
  const dispatch = useAppDispatch()
  const payload = { url, name, description, serviceType }

  return (
    <div
      onClick={() => dispatch(setOpenModalServiceDetails({ serviceDetails: payload }))}
      className="col-span-12 760:col-span-6 990:col-span-4 shadow-serviceCard group cursor-pointer relative z-10"
    >
      <div
        style={{ backgroundImage: `url(${url})` }}
        className="bg-paleBlue bg-cover bg-no-repeat bg-center w-full h-auto aspect-[10/7] relative"
      >
        <div className="absolute z-10 bottom-2 right-2 bg-neonIce rounded-lg w-20 h-auto aspect-square flex items-center justify-center transform transition-all group-hover:-translate-y-2 ease-in-out duration-500">
          <ServiceIconSelector serviceType={serviceType} />
        </div>
      </div>
      <div className="bg-white p-6 relative flex flex-col justify-betwween h-[227px]">
        <div>
          <h1 className="font-bold text-[18px] mb-4 truncate">{name}</h1>
          <p>{truncateString(description, 70)}</p>
        </div>
        <div className="flex items-center gap-x-2 mt-10">
          <h3 className="font-semibold group-hover:text-neonIce">Read More</h3>
          <div className="w-7 h-7 rounded-full bg-stealthGray flex items-center justify-center group-hover:translate-x-2 duration-500 ease-in-out transform transition-all">
            <AwesomeIcon icon={arrowRightIcon} className="text-silver w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
