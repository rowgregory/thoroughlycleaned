import React, { FC, MouseEventHandler } from 'react'
import Link from 'next/link'
import Picture from './Picture'

interface LogoProps {
  className: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  src?: string
  priority: boolean
}

const Logo: FC<LogoProps> = ({ className, onClick, src, priority = false }) => {
  return (
    <Link href="/" onClick={onClick}>
      <Picture src={`${src || '/images/logo-text.webp'}`} alt="Thoroughly Cleaned, LLC" priority={priority} className={className}></Picture>
    </Link>
  )
}

export default Logo
