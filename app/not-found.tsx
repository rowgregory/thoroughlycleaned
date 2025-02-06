'use client'

import React, { useState } from 'react'
import Picture from './components/common/Picture'
import Link from 'next/link'
import Logo from './components/common/Logo'
import Spinner from './components/common/Spinner'

const NotFound = () => {
  const [loading, setLoading] = useState(false)
  return (
    <div className="px-4 990:min-h-screen flex items-center justify-center">
      <Logo src="/images/logo-bubble-transparent.png" className="w-20 990:w-32 h-auto absolute top-4 left-4" priority={false} />
      <div className="max-w-screen-lg w-full px-16 mx-auto flex flex-col 990:flex-row items-center gap-y-10 990:gap-x-10 pt-32 990:pt-0">
        <div className="order-2 990:order-1 flex flex-col gap-y-7">
          <h1 className="text-5xl font-bold text-stealthGray text-center 990:text-left">Something&apos;s wrong here...</h1>
          <h1 className="text-lg text-stealthGray font-medium text-center 990:text-left">
            This page has taken a cleaning break. Let&apos;s scrub up a better link for you! Head back home.
          </h1>
          <Link
            onClick={() => setLoading(true)}
            href="/"
            className="bg-iceberg text-center text-white font-medium h-12 w-60 hover:bg-neonIce duration-300 flex items-center justify-center self-center 990:self-start group relative"
          >
            {loading ? (
              <Spinner wAndH="w-4 h-4" fill="fill-iceberg" />
            ) : (
              <div>
                <div className="absolute top-1/2 -translate-y-1/2 duration-300 group-hover:-translate-y-12 left-1/2 -translate-x-1/2 transform">
                  Home
                </div>
                <div className="absolute translate-y-12 duration-300 group-hover:-translate-y-1/2 left-1/2 -translate-x-1/2 transform">
                  Home
                </div>
              </div>
            )}
          </Link>
        </div>
        <div className="order-1 990:order-2 flex justify-center w-full items-center">
          <Picture
            src="/images/tc-404.png"
            alt="Thoroughly Cleaned, LLC"
            className="w-full h-full object-contain max-w-80 990:max-w-lg"
            priority={true}
          />
        </div>
      </div>
    </div>
  )
}

export default NotFound
