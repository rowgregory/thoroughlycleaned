import Link from 'next/link'
import React, { FC } from 'react'

interface FooterNavLinkItemProps {
  link: {
    linkKey: string
    active: boolean
    linkText: string
  }
  i: number
}

const FooterNavLinkItem: FC<FooterNavLinkItemProps> = ({ link, i }) => {
  return (
    <Link
      data-aos="fade-left"
      data-aos-delay={i * 100}
      href={link.linkKey}
      className={`${
        link.active ? 'text-white' : 'text-jetBlack'
      } poppins-regular hover:text-sunny duration-200 opacity-0`}
    >
      {link.linkText}
    </Link>
  )
}

export default FooterNavLinkItem
