import { contactInfo } from '@/public/data/footer..data'
import ContactInfoItem from './ContactInfoItem'
import { RootState, useAppSelector } from '@/app/redux/store'
import EditableImage from '../common/EditableImage'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import EditableTextArea from '../common/EditableTextArea'
import { headerNavigationLinkData } from '@/public/data/navigation-link.data'
import FooterNavLinkItem from './FooterNavLinkItem'
import { sqyshUrl } from '@/public/data/paths'
import { FC } from 'react'

const FooterTop: FC<{ textBlockMap: any }> = ({ textBlockMap }: any) => {
  const path = useCustomPathname()
  const isBiohazard = path?.split('/')[2] === 'biohazard'
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)

  const imgSrc = isBiohazard
    ? textBlockMap?.HEADER?.headerBiohazardLogoFile?.value || '/images/logo-bubble-transparent.png'
    : textBlockMap?.HEADER?.headerLogoFile?.value || '/images/logo-bubble-transparent.png'

  return (
    <div className="relative z-10 pb-20">
      <div className="grid grid-cols-12 gap-y-12 990:gap-x-16">
        <div className="col-span-12 990:col-span-4">
          <EditableImage
            src={imgSrc}
            type="FOOTER"
            textBlockKey="footerFile"
            className="w-32 h-auto aspect-square mb-3.5 relative z-50 object-contain"
            priority={true}
          />

          <EditableTextArea
            tag="div"
            initialValue={textBlockMap?.FOOTER?.footerJingle}
            type="FOOTER"
            textBlockKey="footerJingle"
            className="text-white font-medium mb-5 text-sm 480:text-base"
          />
          <div className="flex items-center gap-x-1 text-sm 480:text-base">
            <span className="text-white font-medium">Built by </span>
            <div className="relative group bg-neonIce w-fit">
              <span className="relative z-10 font-medium text-white cursor-pointer" onClick={() => window.open(sqyshUrl, '_blank')}>
                Sqysh
              </span>
              <div className="bg-sqysh w-10 h-10 bg-cover bg-no-repeat bg-center absolute right-[2px] bottom-0 z-0 opacity-0 group-hover:translate-y-[-5px] group-hover:opacity-100 transition-all duration-300" />
            </div>
          </div>
        </div>
        <div className="col-span-12 990:col-span-4">
          <EditableTextArea
            tag="div"
            initialValue={textBlockMap?.FOOTER?.footerContactInfoTitle}
            type="FOOTER"
            textBlockKey="footerContactInfoTitle"
            className="uppercase text-white font-semibold text-xl mb-3"
          />

          <div className="flex flex-col gap-y-3.5">
            {contactInfo(textBlockMap).map((contactInfo, i) => (
              <ContactInfoItem key={i} {...contactInfo} />
            ))}
          </div>
        </div>
        <div className="col-span-12 990:col-span-4 xl:col-span-3 xl:col-start-10">
          <EditableTextArea
            tag="div"
            initialValue={textBlockMap?.FOOTER?.footerFormTitle}
            type="FOOTER"
            textBlockKey="footerFormTitle"
            className="font-semibold text-xl uppercase text-white mb-3"
          />
          <div className="flex flex-col gap-y-3.5">
            {headerNavigationLinkData(path, isAuthenticated).map((link, i) => (
              <FooterNavLinkItem key={i} {...link} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterTop
