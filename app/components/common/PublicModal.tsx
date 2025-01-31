import useRemoveScroll from '@/app/hooks/useRemoveScroll'
import React, { FC, ReactNode } from 'react'

const PublicModal: FC<{ show: boolean; children: ReactNode; onClose: any; zIndex?: string }> = ({ show, children, onClose, zIndex }) => {
  useRemoveScroll(true)

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/80 flex ${zIndex || 'z-40'} items-center justify-center transition-opacity ease-out ${
        show ? 'block' : 'hidden'
      }`}
    >
      <div
        className="bg-white transform transition-all duration-300 ease-out h-screen 990:h-auto w-screen 990:w-[690px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default PublicModal
