import { useState, useCallback, useEffect, ReactNode } from 'react'
import { FC } from 'react'

const Modal: FC<{ show: boolean; onClose: () => void; children: ReactNode }> = ({ show, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/50 flex z-50 items-center justify-center transition-opacity ease-out ${show ? 'block' : 'hidden'}`}
      onClick={onClose}
    >
      <div
        className="bg-white transform transition-all duration-300 ease-out w-full min-w-64 sm:min-w-96 max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export const useModal = () => {
  const [show, setShow] = useState(false)

  const toggle = useCallback(() => {
    setShow((prev) => !prev)
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShow(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return { show, toggle, Modal }
}
