import React, { FormEvent } from 'react'
import { useLogoutMutation } from '@/app/redux/services/authApi'
import AwesomeIcon from '../common/AwesomeIcon'
import { signOutAltIcon } from '@/app/icons'
import AppleLoader from '../common/AppleLoader'
import { useRouter } from 'next/navigation'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { setAuthState } from '@/app/redux/features/authSlice'
import useSoundEffect from '@/app/hooks/useSoundEffect'
import Link from 'next/link'

const AdminHeader = () => {
  const dispatch = useAppDispatch()
  const [logout, { isLoading, error }] = useLogoutMutation()
  const { push } = useRouter()
  const { profile } = useAppSelector((state: RootState) => state.profile)
  const { play } = useSoundEffect('/sound-effects/power-down.mp3', profile.isSoundEffectsOn)

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault()
    await logout()
      .unwrap()
      .then(() => {
        play()
        dispatch(setAuthState({}))
        push('/auth/login')
      })
      .catch(() => {})
  }

  return (
    <header className="sticky top-0 z-50 px-4 w-full bg-[#323235] h-12 flex items-center justify-between">
      <Link href="/" style={{ color: profile?.colorCode }} className="font-rubik font-semibold">
        Thoroughly Cleaned
      </Link>
      <div className="flex items-center gap-x-4">
        {error?.data?.message && <div className="text-13 text-red-500">{error?.data?.message}</div>}
        <button disabled={isLoading} onClick={handleLogout}>
          {isLoading ? <AppleLoader /> : <AwesomeIcon icon={signOutAltIcon} className="w-4 h-4" style={{ color: profile?.colorCode }} />}
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
