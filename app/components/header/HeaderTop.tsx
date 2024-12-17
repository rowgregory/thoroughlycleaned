import React from 'react'
import Link from 'next/link'
import Logo from '../common/Logo'
import { FaFacebook, FaPhone, FaInstagram } from 'react-icons/fa'
import AwesomeIcon from '../common/AwesomeIcon'
import { barsIcon, envelopeIcon } from '@/app/icons'

const HeaderTop = () => {
  return (
    <section className="flex items-center px-4 lg:px-12 xl:px-4 h-16 990:h-12">
      <div className="max-w-screen-md 990:max-w-screen-xl mx-auto w-full flex justify-between items-center">
        <div className="flex items-center">
          <Logo
            className="bg-contain 990:mr-12 aspect-[3/2.5] bg-skyAqua 990:bg-sunny
            w-20 990:w-40 relative z-10
            mt-0 990:mt-[74px]"
            src="bg-logoText 990:bg-logoYellow"
          />
          <div className="hidden 990:flex items-center gap-2 text-white group hover:text-sunny duration-200 cursor-pointer">
            <AwesomeIcon icon={envelopeIcon} className="w-5 h-5" />
            <p className="text-sm poppins-medium">admin@thoroughlycleanedma.com</p>
          </div>
          <span className="hidden 990:block w-[1px] bg-sunny h-5 mx-6" />
          <div className="hidden 990:flex items-center gap-2 text-white group hover:text-sunny duration-200 cursor-pointer whitespace-nowrap">
            <FaPhone className="w-5 h-5" />
            <p className="text-sm poppins-medium white">(978) 884-3392</p>
          </div>
        </div>
        <AwesomeIcon icon={barsIcon} className="block 990:hidden w-6 h-6 text-zinc-800" />
        <nav className="hidden 990:flex items-center gap-5 text-white">
          <a
            href="https://www.facebook.com"
            target="_blank"
            className="w-4 h-4"
            aria-label="Facebook"
          >
            <FaFacebook className="w-4 h-4" />
          </a>
          <a href="https://www.instagram.com" className="w-4 h-4" aria-label="Instagram">
            <FaInstagram className="w-4 h-4" />
          </a>
          <Link
            href="/quote"
            className="h-12 text-zinc-800 hidden sm:flex items-center px-5 text-sm poppins-bold bg-sunny whitespace-nowrap"
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </section>
  )
}

export default HeaderTop
