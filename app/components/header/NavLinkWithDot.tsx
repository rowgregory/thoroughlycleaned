import React from 'react'
import Link from 'next/link'

const NavLinkWithDot = ({ link, i }: { link: any; i: number }) => {
  return (
    <Link
      href={link.linkKey}
      className={`flex items-center text-15 duration-300 hover:text-iceberg ${link.active ? 'text-iceberg' : 'text-stealthGray'}`}
    >
      <p className="font-semibold">{link.linkText}</p>
      <span className={`${i === 6 ? 'hidden' : 'block'} bg-frostbite w-1 h-1 mx-6`}></span>
    </Link>
  )
}

export default NavLinkWithDot
