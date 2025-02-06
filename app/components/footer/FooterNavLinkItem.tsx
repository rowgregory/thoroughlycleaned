import React, { FC } from 'react'
import Link from 'next/link'
import { FooterNavLinkItemProps } from '@/app/types/footer.types'

const FooterNavLinkItem: FC<FooterNavLinkItemProps> = ({ linkKey, active, linkText }) => {
  return (
    <Link
      href={linkKey}
      className={`${
        active ? 'text-frostbite white xl:text-iceberg' : 'text-white xl:text-stealthGray'
      } hover:text-stealthGray xl:hover:text-white font-medium text-sm 480:text-base`}
    >
      {linkText}
    </Link>
  )
}

export default FooterNavLinkItem
