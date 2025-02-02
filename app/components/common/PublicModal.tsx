import useRemoveScroll from '@/app/hooks/useRemoveScroll'
import React, { FC, ReactNode } from 'react'
import AwesomeIcon from './AwesomeIcon'
import { timesIcon } from '@/app/icons'

const PublicModal: FC<{ show: boolean; children: ReactNode; onClose: any; zIndex?: string; reset?: any }> = ({
  show,
  children,
  onClose,
  zIndex,
  reset
}) => {
  useRemoveScroll(true)

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/80 flex ${zIndex || 'z-[90]'} items-center justify-center transition-opacity ease-out ${
        show ? 'block' : 'hidden'
      }`}
    >
      <div
        className="public-modal bg-white transform transition-all duration-300 ease-out overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <AwesomeIcon icon={timesIcon} onClick={reset} className="w-5 h-5 text-jetBlack absolute top-5 left-5 z-10 cursor-pointer" />
        {children}
      </div>
    </div>
  )
}

export default PublicModal
