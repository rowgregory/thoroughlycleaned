import React, { FC } from 'react'
import PublicModal from '../components/common/PublicModal'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { timesIcon } from '../icons'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { setCloseModalServiceDetails } from '../redux/features/serviceSlice'
import Picture from '../components/common/Picture'
import BubbleBtn from '../components/common/BubbleBtn'
import { setOpenModalClientLeadPublic } from '../redux/features/appSlice'
import ServiceIconSelector from '../components/common/ServiceIconSelector'
import Typewriter from '../components/common/Typewriter'

const PublicServiceDetailsModal: FC<{ show: boolean }> = ({ show }) => {
  const { serviceDetails } = useAppSelector((state: RootState) => state.service)
  const dispatch = useAppDispatch()

  const reset = () => dispatch(setCloseModalServiceDetails())

  return (
    <PublicModal show={show} onClose={reset} zIndex="z-30">
      <div className="py-20 max-w-md mx-auto flex flex-col items-center justify-center w-full">
        <AwesomeIcon icon={timesIcon} onClick={reset} className="w-5 h-5 text-jetBlack absolute top-5 left-5 z-10 cursor-pointer" />
        <div className="py-16 px-7 max-w-md">
          <div className="relative">
            <Picture src={serviceDetails?.url} className="w-full object-cover min-h-[220px] max-h-80 mb-6" priority={false} />
            <div className="absolute z-10 bottom-2 left-2 bg-sunny rounded-lg w-20 h-auto aspect-square flex items-center justify-center transform transition-all group-hover:-translate-y-2 ease-in-out duration-500">
              <ServiceIconSelector serviceType={serviceDetails?.serviceType} />
            </div>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div>
              <Typewriter sentence={serviceDetails?.name} speed={40} text="min-h-[50px] font-bold text-zinc-800 text-4xl" />
              <h2 className="home-page-banner-subtitle mt-2 mb-6">{serviceDetails?.serviceType}</h2>
              <p className="text-zinc-800 mb-10">{serviceDetails?.description}</p>
            </div>
            <div onClick={() => dispatch(setOpenModalClientLeadPublic())} className="cursor-pointer">
              <BubbleBtn bubbleColor="bg-sunny" text="Contact Us" />
            </div>
          </div>
        </div>
      </div>
    </PublicModal>
  )
}

export default PublicServiceDetailsModal
