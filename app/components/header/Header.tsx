import React from 'react'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import EditableImage from '../common/EditableImage'
import HeaderTop from './HeaderTop'
import HeaderBottom from './HeaderBottom'
import ClientLeadModal from '@/app/modals/ClientLeadModal'
import { RootState, useAppSelector } from '@/app/redux/store'
import Logo from '../common/Logo'

const Header = () => {
  const path = useCustomPathname()
  const isBiohazard = path?.split?.('/')?.[2] === 'biohazard'
  const { openModalClientLeadPublic } = useAppSelector((state: RootState) => state.app)
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  const staticImgPath = '/images/logo-bubble-transparent.png'
  const imgSrc = isBiohazard
    ? textBlockMap?.HEADER?.headerBiohazardLogoFile?.value || staticImgPath
    : textBlockMap?.HEADER?.headerLogoFile?.value || staticImgPath

  return (
    <header className="flex items-center px-4 lg:px-12 xl:px-4 h-[74px] 990:h-32 bg-white 990:bg-header">
      {openModalClientLeadPublic && <ClientLeadModal {...textBlockMap.HEADER} />}
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full h-full flex">
        {isAuthenticated ? (
          <EditableImage
            src={imgSrc}
            type="HEADER"
            textBlockKey={isBiohazard ? 'headerBiohazardLogoFile' : 'headerLogoFile'}
            className="cursor-pointer w-[74px] h-full max-h-[74px] 990:max-h-32 990:w-32 aspect-square object-contain 990:mr-12 animate-fadeIn"
            priority={true}
          />
        ) : (
          <Logo
            className="cursor-pointer bg-transparent w-[74px] h-full max-h-[74px] 990:max-h-32 990:w-32 aspect-square object-contain 990:mr-12 animate-fadeIn"
            priority={false}
            src={imgSrc}
          />
        )}
        <div className="flex flex-col w-full justify-center">
          <HeaderTop text={textBlockMap?.HEADER} />
          <HeaderBottom />
        </div>
      </div>
    </header>
  )
}

export default Header
