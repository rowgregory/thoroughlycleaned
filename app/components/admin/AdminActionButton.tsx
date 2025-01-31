'use client'

import { arrowRightIcon } from '@/app/icons'
import { FC } from 'react'
import AwesomeIcon from '../common/AwesomeIcon'

interface ActionButtonProps {
  text: string
  onClick: () => void
  profile: any
}

const ActionButton: FC<ActionButtonProps> = ({ text, onClick, profile }) => {
  return (
    <div className="flex items-center gap-x-2 group">
      <button onClick={onClick} style={{ color: profile?.colorCode || '#00c5d9' }} className="rubik-regular text-left w-fit">
        {text}
      </button>
      <AwesomeIcon
        icon={arrowRightIcon}
        className={`w-4 h-4 -rotate-45 duration-200 ease-in-out group-hover:-rotate-90`}
        style={{ color: profile?.colorCode || '#00c5d9' }}
      />
    </div>
  )
}

export default ActionButton
