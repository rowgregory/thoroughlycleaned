import React, { FC } from 'react'
import AwesomeIcon from '../common/AwesomeIcon'
import { ContactInfoItemProps } from '@/app/types/footer.types'
import EditableTextArea from '../common/EditableTextArea'

const ContactInfoItem: FC<ContactInfoItemProps> = ({ icon, value, name }) => {
  return (
    <div className="grid grid-cols-12 gap-x-4 items-center w-full">
      <AwesomeIcon icon={icon} className="col-span-1 w-4 h-4 text-sunny pr-3" />
      <div className="col-span-11 w-full">
        <EditableTextArea
          tag="h4"
          initialValue={value}
          type={name === 'headerPhoneNumber' || name === 'headerEmail' ? 'HEADER' : 'FOOTER'}
          textBlockKey={name}
          className="text-white"
        />
      </div>
    </div>
  )
}

export default ContactInfoItem
