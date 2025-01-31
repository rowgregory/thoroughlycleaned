import React from 'react'
import PublicModal from '../components/common/PublicModal'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { timesIcon } from '../icons'
import ClientLeadForm from '../forms/ClientLeadForm'
import { setCloseModalClientLeadPublic } from '../redux/features/appSlice'
import EditableTextArea from '../components/common/EditableTextArea'
import Picture from '../components/common/Picture'
import useCustomPathname from '../hooks/useCustomPathname'

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
    <PublicModal show={openModalClientLeadPublic} onClose={reset}>
      <div className="py-16 px-7 max-w-md mx-auto flex flex-col items-center justify-center w-full">
        <AwesomeIcon icon={timesIcon} onClick={reset} className="w-5 h-5 text-jetBlack absolute top-5 left-5 z-10 cursor-pointer" />
        <Picture src={imgSrc} className="w-32 h-auto" priority={false} />
        <EditableTextArea
          tag="h1"
          initialValue={text.clientLeadModalTitle}
          type="HEADER"
          textBlockKey="clientLeadModalTitle"
          className="font-semibold text-jetBlack text-2xl mt-5 mb-2 text-center"
        />
        <EditableTextArea
          tag="p"
          initialValue={text.clientLeadModalSubtitle}
          type="HEADER"
          textBlockKey="clientLeadModalSubtitle"
          className="text-zinc-700 text-center mb-7"
        />
        <ClientLeadForm
          formStyles="flex flex-col gap-y-5 w-full"
          inputStyles="w-full h-[56px] bg-white p-4 border-2 border-skyAqua focus:border-skyAqua focus:outline-none text-[#4a4a4a] placeholder:text-[#4a4a4a] shadow-none"
          selectStyles="h-[56px] bg-white p-4 text-[#4a4a4a] border-2 border-skyAqua focus:border-skyAqua focus:outline-none shadow-none"
          buttonStyles="h-[56px] shadow-none"
          errorStyles="text-red-500"
          bubbleColor="bg-sunny"
        />
      </div>
    </PublicModal>
  )
}

export default ClientLeadModal
