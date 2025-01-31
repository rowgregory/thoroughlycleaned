import React, { FC } from 'react'
import AwesomeIcon from '../common/AwesomeIcon'
import { barsIcon, envelopeIcon, phoneIcon } from '@/app/icons'
import { setOpenModalClientLeadPublic, setOpenNavigationDrawer } from '@/app/redux/features/appSlice'
import EditableTextArea from '../common/EditableTextArea'
import { useAppDispatch } from '@/app/redux/store'

interface HeaderTopProps {
  text: any
}

const HeaderTop: FC<HeaderTopProps> = ({ text }) => {
  const dispatch = useAppDispatch()
  return (
    <div className="flex items-center justify-end 990:justify-between">
      <div className="hidden 990:flex items-center">
        <div className="flex items-center gap-2 text-white group hover:text-sunny duration-100">
          <AwesomeIcon icon={envelopeIcon} className="w-5 h-5" />
          <EditableTextArea tag="span" initialValue={text?.headerEmail} type="HEADER" textBlockKey="headerEmail" />
        </div>
        <span className="block w-[1px] bg-sunny h-5 mx-6" />
        <div className="flex items-center gap-2 text-white group hover:text-sunny duration-100">
          <AwesomeIcon icon={phoneIcon} className="w-5 h-5" />
          <EditableTextArea tag="span" initialValue={text?.headerPhoneNumber} type="HEADER" textBlockKey="headerPhoneNumber" />
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <button
          type="button"
          onClick={() => dispatch(setOpenModalClientLeadPublic())}
          className="h-12 text-zinc-800 hidden sm:flex items-center px-5 text-sm font-poppins font-semibold bg-sunny whitespace-nowrap"
        >
          Connect With Us
        </button>
        <div onClick={() => dispatch(setOpenNavigationDrawer())} className="block 990:hidden h-6 w-6 cursor-pointer">
          <AwesomeIcon icon={barsIcon} className="w-6 h-6 text-zinc-800" />
        </div>
      </div>
    </div>
  )
}

export default HeaderTop
