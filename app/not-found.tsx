import React from 'react'
import Picture from './components/common/Picture'
import Link from 'next/link'
import Logo from './components/common/Logo'

const NotFound = () => {
  return (
    <div className="px-4 990:min-h-screen flex items-center justify-center">
      <Logo src="/images/logo-yellow-bubble.png" className="bg-skyAqua w-20 990:w-40 h-auto absolute top-4 left-4" priority={false} />
      <div className="max-w-screen-lg w-full px-16 mx-auto flex flex-col 990:flex-row items-center gap-y-10 990:gap-x-10 pt-32 990:pt-0">
        <div className="order-2 990:order-1 flex flex-col gap-y-7">
          <h1 className="text-5xl font-bold text-zinc-800 text-center 990:text-left">Something&apos;s wrong here...</h1>
          <h1 className="text-lg text-zinc-800 text-center 990:text-left">
            This page has taken a cleaning break. Let&apos;s scrub up a better link for you! Head back home.
          </h1>
          <Link
            href="/"
            className="bg-skyAqua text-center px-12 py-3 text-white font-medium w-fit hover:text-zinc-800 hover:bg-sunny duration-300 hover:shadow-adminServiceCard flex self-center 990:self-start"
          >
            Home
          </Link>
        </div>
        <div className="order-1 990:order-2 flex justify-center w-full items-center">
          <Picture
            src="/images/tc-404-2.png"
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
