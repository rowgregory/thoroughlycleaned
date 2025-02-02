import React, { FC } from 'react'
import Link from 'next/link'
import { FooterNavLinkItemProps } from '@/app/types/footer.types'

const FooterNavLinkItem: FC<FooterNavLinkItemProps> = ({ linkKey, active, linkText }) => {
  return (
    <Link
      href={linkKey}
      className={`${
        active ? 'text-sunny xl:text-skyAqua' : 'text-white xl:text-jetBlack'
      } hover:text-sunny xl:hover:text-skyAqua text-sm 480:text-base`}
    >
      {linkText}
    </Link>
  )
}

export default FooterNavLinkItem
