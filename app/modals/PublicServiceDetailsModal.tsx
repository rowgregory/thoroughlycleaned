import React, { FC } from 'react'
import PublicModal from '../components/common/PublicModal'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { setCloseModalServiceDetails } from '../redux/features/serviceSlice'
import Picture from '../components/common/Picture'
import BubbleBtn from '../components/common/BubbleBtn'
import { setOpenModalClientLeadPublic } from '../redux/features/appSlice'
import useCustomPathname from '../hooks/useCustomPathname'

const PublicServiceDetailsModal: FC<{ show: boolean; textBlockMap: any }> = ({ show, textBlockMap }) => {
  const { serviceDetails } = useAppSelector((state: RootState) => state.service)
  const dispatch = useAppDispatch()
  const path = useCustomPathname()
  const isBiohazard = path?.split('/')[2] === 'biohazard'

  const reset = () => dispatch(setCloseModalServiceDetails())

  const imgSrc = isBiohazard
    ? textBlockMap?.HEADER?.headerBiohazardLogoFile?.value || '/images/logo-bubble-transparent.png'
    : textBlockMap?.HEADER?.headerLogoFile?.value || '/images/logo-bubble-transparent.png'

  return (
    <PublicModal show={show} onClose={reset} reset={reset}>
      <div className="pt-16 pb-8 max-w-md mx-auto flex flex-col items-center justify-center w-full">
        <div className="relative">
          <Picture src={imgSrc} className="w-28 h-auto absolute left-1/2 -top-12 -translate-x-1/2 transform" priority={false} />
          <Picture
            src={serviceDetails?.url}
            className="w-full bg-silver object-cover min-h-[220px] h-full mb-6 border-t-4 border-t-neonIce"
            priority={false}
          />
          <div className="bg-black/50 p-3 left-1/2 w-full text-center -translate-x-1/2 transform whitespace-nowrap absolute bottom-6 right-0 font-bold text-white text-2xl">
            {serviceDetails?.name}
          </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="home-page-banner-subtitle mt-2 mb-6">{serviceDetails?.serviceType}</h2>
            <p className="text-stealthGray mb-5">{serviceDetails?.description}</p>
          </div>
          <div onClick={() => dispatch(setOpenModalClientLeadPublic())} className="cursor-pointer">
            <BubbleBtn bubbleColor="bg-iceberg" text="Contact Us" />
          </div>
        </div>
      </div>
    </PublicModal>
  )
}

export default PublicServiceDetailsModal
