import Link from 'next/link'
import React from 'react'
import Logo from '../common/Logo'
import { FaEnvelope, FaFacebook, FaPhone, FaTwitter } from 'react-icons/fa'

const TopSection = () => {
  return (
    <div className="bg-royal h-12 flex items-center">
      <div className="max-w-screen-xl mx-auto w-full flex justify-between">
        <div className="flex items-center">
          <div className="w-52 h-32 px-6 py-3 flex items-center justify-center mr-0 sm:mr-12 bg-sunny mt-20 relative z-40">
            <Logo className="h-full w-full object-fit" />
          </div>
          <div className="flex items-center gap-2 text-white group hover:text-sunny duration-200 cursor-pointer">
            <FaEnvelope className="w-5 h-5" />
            <p className="text-sm poppins-medium">admin@thoroughlycleanedma.com</p>
          </div>
          <span className="w-[1px] bg-sunny h-5 mx-6" />
          <div className="flex items-center gap-2 text-white group hover:text-sunny duration-200 cursor-pointer whitespace-nowrap">
            <FaPhone className="w-5 h-5" />
            <p className="text-sm poppins-medium white">(978) 884-3392</p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-white">
          <FaFacebook className="w-4 h-4" />
          <FaTwitter className="w-4 h-4" />
          <Link
            href="/quote"
            className="h-12 text-zinc-800 flex items-center px-5 text-sm poppins-bold bg-sunny whitespace-nowrap"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopSection
