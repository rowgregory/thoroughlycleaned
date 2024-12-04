import React, { FC, MouseEventHandler } from 'react'
import Link from 'next/link'

interface LogoProps {
  className: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  src?: string
}

const Logo: FC<LogoProps> = ({ className, onClick, src }) => {
  return (
    <Link href="/" onClick={onClick}>
      <div className={`${src ? src : 'bg-logo'} bg-center bg-no-repeat ${className}`}></div>
    </Link>
  )
}

export default Logo
