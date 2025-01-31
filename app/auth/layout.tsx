'use client'

import React, { FC } from 'react'
import { ChildrenProps } from '../types/common.types'
import { useFetchPageSpecificTextBlocksQuery } from '../redux/services/textBlockApi'
import AppleLoader from '../components/common/AppleLoader'
import Logo from '../components/common/Logo'
import Link from 'next/link'
import useCustomPathname from '../hooks/useCustomPathname'

const AuthLayout: FC<ChildrenProps> = ({ children }) => {
  const path = useCustomPathname()
  const { isLoading, data } = useFetchPageSpecificTextBlocksQuery(['HEADER'])

  return (
    <div className="min-h-screen w-full bg-[#1c1c1e] flex items-start 1200:items-center justify-center px-4 py-12">
      <div className="w-full flex flex-col items-center max-w-sm">
        <div className="w-full flex flex-col items-center">
          <div className="w-36 flex items-center justify-center aspect-square">
            {isLoading ? (
              <AppleLoader width="w-8" />
            ) : (
              <Logo
                className="w-full h-auto object-contain animate-scaleIn"
                src={data?.transformedTextBlocks?.HEADER?.headerLogoFile?.value}
                priority={true}
              />
            )}
          </div>
          {children}
        </div>
        {path === '/auth/login' ? (
          <div className="flex flex-col items-center gap-y-4">
            <Link href="/auth/forgot-password" className="text-sm font-rubik text-neonSkyAqua">
              Forgot Password
            </Link>
            <Link href="/auth/register" className="text-sm font-rubik text-neonSkyAqua">
              Register
            </Link>
          </div>
        ) : (
          <Link href="/auth/login" className="text-sm font-rubik text-neonSkyAqua mt-6">
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default AuthLayout
