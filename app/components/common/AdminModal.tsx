import useRemoveScroll from '@/app/hooks/useRemoveScroll'
import React, { FC, ReactNode } from 'react'

const AdminModal: FC<{ show: boolean; children: ReactNode }> = ({ show, children }) => {
  useRemoveScroll(true)

  return (
    <div
      className={`fixed inset-0 bg-[#0d0d0d] 1200:bg-black/80 flex z-50 px-4 justify-center 1200:items-center duration-100 transition-opacity ease-out ${
        show ? 'block' : 'hidden'
      }`}
    >
      <div
        className="bg-[#0d0d0d] rounded-2xl transform transition-all duration-300 ease-out h-screen 1200:h-auto w-screen 1200:w-[690px] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default AdminModal
