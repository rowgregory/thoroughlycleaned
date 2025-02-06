import React from 'react'
import PublicModal from '../components/common/PublicModal'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import ClientLeadForm from '../forms/ClientLeadForm'
import { setCloseModalClientLeadPublic } from '../redux/features/appSlice'
import EditableTextArea from '../components/common/EditableTextArea'
import Picture from '../components/common/Picture'
import useCustomPathname from '../hooks/useCustomPathname'
import IceDotsSVG from '../icons/IceDotsSVG'

const ClientLeadModal = (text: any) => {
  const dispatch = useAppDispatch()
  const { openModalClientLeadPublic } = useAppSelector((state: RootState) => state.app)
  const path = useCustomPathname()
  const isBiohazard = path?.split('/')[2] === 'biohazard'
  const reset = (e: any) => {
    e.preventDefault()
    dispatch(setCloseModalClientLeadPublic())
  }

  const imgSrc = isBiohazard
    ? text.headerBiohazardLogoFile?.value || '/images/logo-bubble-transparent.png'
    : text.headerLogoFile?.value || '/images/logo-bubble-transparent.png'

  return (
    <PublicModal show={openModalClientLeadPublic} reset={reset} modalBg="bg-silver" zIndex="z-[100]">
      <div className="py-16 px-7 max-w-md mx-auto flex flex-col items-center justify-center w-full">
        <Picture src={imgSrc} className="w-32 h-auto z-10" priority={false} />
        <EditableTextArea
          tag="h1"
          initialValue={text.clientLeadModalTitle}
          type="HEADER"
          textBlockKey="clientLeadModalTitle"
          className="font-bold text-stealthGray text-2xl z-10 mt-5 mb-2 text-center"
        />
        <EditableTextArea
          tag="p"
          initialValue={text.clientLeadModalSubtitle}
          type="HEADER"
          textBlockKey="clientLeadModalSubtitle"
          className="text-stealthGray text-center font-medium mb-7 z-10"
        />
        <ClientLeadForm
          formStyles="flex flex-col gap-y-5 w-full relative z-10"
          inputStyles="w-full h-[56px] bg-neonIce p-4 border-2 border-neonIce focus:border-iceberg focus:outline-none text-white placeholder:text-white"
          selectStyles="w-full h-[56px] bg-neonIce p-4 border-2 border-neonIce focus:border-neonIce focus:outline-none text-white"
          buttonStyles="h-[56px]"
          errorStyles="text-frostbite"
          bubbleColor="bg-iceberg"
        />
        <div className="absolute top-0 opacity-20 left-0">
          <IceDotsSVG />
        </div>
      </div>
    </PublicModal>
  )
}

export default ClientLeadModal
