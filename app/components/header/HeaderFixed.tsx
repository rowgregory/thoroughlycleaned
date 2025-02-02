import useCustomPathname from '@/app/hooks/useCustomPathname'
import useScrollFromTop from '@/app/hooks/useScrollFromTop'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import NavLinkWithDot from './NavLinkWithDot'
import { headerNavigationLinkData } from '@/public/data/navigation-link.data'
import AwesomeIcon from '../common/AwesomeIcon'
import { barsIcon } from '@/app/icons'
import { setOpenModalClientLeadPublic, setOpenNavigationDrawer } from '@/app/redux/features/appSlice'
import EditableImage from '../common/EditableImage'

const HeaderFixed = ({ textBlockMap }: any) => {
  const dispatch = useAppDispatch()
  const hasScrolled = useScrollFromTop(100)
  const path = useCustomPathname()
  const isBiohazard = path?.split?.('/')?.[2] === 'biohazard'
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)

  const { openModalEditableTextAreaPublic, openModalEditableVideoPublic, openModalImageUploaderPublic } = useAppSelector(
    (state: RootState) => state.app
  )

  const staticImgPath = '/images/logo-bubble-transparent.png'
  const imgSrc = isBiohazard
    ? textBlockMap?.HEADER?.headerBiohazardLogoFile?.value || staticImgPath
    : textBlockMap?.HEADER?.headerLogoFile?.value || staticImgPath

  const modalIsOpen = openModalEditableTextAreaPublic || openModalEditableVideoPublic || openModalImageUploaderPublic

  return (
    <div className="overflow-hidden">
      <div
        className={`fixed z-[70] top-0 left-0 w-full h-[74px] bg-white transition-transform duration-500 px-4 lg:px-12 xl:px-4 ${
          hasScrolled && !modalIsOpen ? 'translate-y-0' : '-translate-y-[74px]'
        }`}
      >
        <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full h-full flex justify-between items-center">
          <EditableImage
            src={imgSrc}
            type="HEADER"
            textBlockKey={isBiohazard ? 'headerBiohazardLogoFile' : 'headerLogoFile'}
            className="cursor-pointer bg-sunny w-[74px] h-full max-h-[74px] 990:max-h-32 990:w-32 aspect-square object-contain 990:mr-12 animate-fadeIn"
            priority={true}
          />
          <div className="hidden 990:flex items-center">
            {headerNavigationLinkData(path, isAuthenticated).map((link, i) => (
              <NavLinkWithDot key={i} link={link} i={i} />
            ))}
          </div>
          <section className="flex items-center gap-x-4 990:hidden">
            <button
              type="button"
              onClick={() => dispatch(setOpenModalClientLeadPublic())}
              className="h-12 text-zinc-800 hidden sm:flex items-center px-5 text-sm font-poppins font-semibold bg-sunny whitespace-nowrap connect-with-us"
            >
              Connect With Us
            </button>
            <AwesomeIcon
              onClick={() => dispatch(setOpenNavigationDrawer())}
              icon={barsIcon}
              className="text-zinc-800 w-7 h-7 cursor-pointer"
            />
          </section>
        </div>
      </div>
    </div>
  )
}

export default HeaderFixed
