import React from 'react'
import Link from 'next/link'
import headerLinkData from '@/app/data/headerLinkData'
import { RootState, useAppSelector } from '@/app/redux/store'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname } from 'next/navigation'
import Picture from '../common/Picture'
import { useTranslation } from 'react-i18next'

const BottomSection = () => {
  const pathname = usePathname()
  const language = useAppSelector((state: RootState) => state.language)
  const { t } = useTranslation()

  return (
    <div className="bg-white h-24 flex items-center sticky top-0 z-50">
      <div className="max-w-screen-lg mx-auto w-full flex items-center justify-between">
        <Picture
          src="/images/logo.webp"
          alt="Thoroughly Cleaned LLC"
          className="w-24 object-cover"
          priority={false}
        />
        <div className="flex items-center gap-6">
          {headerLinkData(pathname, t).map((obj: any, i: number) => (
            <Link
              key={i}
              href={obj.linkKey}
              className={`${
                obj.active ? 'text-[#58cae3]' : 'text-[#4a5a69]'
              } uppercase text-sm font-bold`}
            >
              {obj.linkText}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/resources/select-location">
            <Picture
              src={language.country.flag}
              alt={language.country.textKey}
              className="w-7"
              priority={false}
            />
          </Link>
          <Link href="/auth/login">
            <FontAwesomeIcon icon={faUser} className="text-gray-700 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BottomSection

// She nneds to update her billag again
// email from you guys that she needs to sign MLS paper work
// who is james d'amico?
// Broker on record also has to sign the paper work
