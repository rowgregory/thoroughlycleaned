import React from 'react'
import Link from 'next/link'

const NavLinkWithDot = ({ link, i }: { link: any; i: number }) => {
  return (
    <Link
      href={link.linkKey}
      className={`flex items-center text-15 duration-300 hover:text-white ${link.active ? 'text-skyAqua' : 'text-dimgray'}`}
    >
      <p className="font-semibold text-15 hover:text-skyAqua">{link.linkText}</p>
      <span className={`${i === 6 ? 'hidden' : 'block'} bg-zinc-800 w-1 h-1 rounded-full mx-6`}></span>
    </Link>
  )
}

export default NavLinkWithDot
