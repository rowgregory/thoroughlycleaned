import React, { MouseEventHandler } from 'react'
import Picture from './Picture'
import Link from 'next/link'

const Logo = ({
  className,
  src,
  onClick
}: {
  className: string
  src?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}) => {
  return (
    <Link href="/" onClick={onClick}>
      <Picture
        src={`${src ? src : '/images/logo.webp'}`}
        alt="Story Construction"
        className={`${className}`}
        priority={true}
      />
    </Link>
  )
}

export default Logo
