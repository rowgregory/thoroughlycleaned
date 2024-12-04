'use client'

import Link from 'next/link'
import { persistor, useAppDispatch } from '../redux/store'
import { setProgress, toggleProgressBar } from '../redux/features/progressBarSlice'
import { resetAuth } from '../redux/features/authSlice'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import useSoundEffect from '@/app/hooks/useSoundEffect'
import Picture from '@/app/components/common/Picture'
import adminNavLinkData from '@/public/data/admin-navigation-link-data'

const AdminSideNavigation = () => {
  const params = usePathname()
  const navigate = useRouter()
  const dispatch = useAppDispatch()
  const soundEffect = useSoundEffect('/sound-effects/descend-musical-mallet.mp3')

  const handleLogout = () => {
    dispatch(toggleProgressBar(true))
    dispatch(setProgress(0))
    soundEffect?.play()
    persistor.purge()
    dispatch(setProgress(50))
    dispatch(resetAuth())
    dispatch(setProgress(100))
    navigate.push('/auth/login')

    setTimeout(() => {
      dispatch(toggleProgressBar(false))
      dispatch(setProgress(0))
    }, 200)
  }

  return (
    <div className="w-[240px]">
      <div className="px-3 pt-5 mb-10">
        <Link href="/">
          <Picture
            src="/images/logo.webp"
            alt="Thoroughly Cleaned"
            className="object-contain mx-auto"
            priority={false}
          />
        </Link>
      </div>
      {adminNavLinkData(params?.split('/')[2]).map((obj: any, i: number) => (
        <div key={i} className="grid grid-cols-9 mb-6 items-center group">
          <FontAwesomeIcon
            icon={obj.icon}
            className={`${
              obj?.isActive
                ? 'bg-slate-600 rounded-tr-2xl rounded-br-2xl text-lime-400'
                : 'text-zinc-400'
            } col-span-2 py-2 pl-2 pr-3 w-4 h-4 duration-200 group-hover:text-lime-400`}
          />
          <Link
            className={`${
              obj.isActive ? 'text-lime-400 font-bold' : 'text-zinc-400'
            } col-span-7 duration-200 group-hover:text-lime-400`}
            href={obj.linkKey}
          >
            {obj.textKey}
          </Link>
        </div>
      ))}
      <div
        onClick={handleLogout}
        className="grid grid-cols-9 mb-6 items-center cursor-pointer group"
      >
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className={`fa-solid fa-right-from-bracket text-zinc-400 col-span-2 py-2 pl-2 pr-3 w-4 h-4 duration-200 group-hover:text-lime-400`}
        />
        <p className="text-zinc-400 col-span-7 duration-200 group-hover:text-lime-400">Logout</p>
      </div>
    </div>
  )
}

export default AdminSideNavigation
