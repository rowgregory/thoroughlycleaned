import React, { FC } from 'react'
import AwesomeIcon from '../common/AwesomeIcon'
import { IconDefinition } from '@fortawesome/free-brands-svg-icons'

interface ContactInfoItemProps {
  info: {
    icon: IconDefinition
    value: string
  }
  i: number
}

const ContactInfoItem: FC<ContactInfoItemProps> = ({ info, i }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={i * 100}
      className="grid grid-cols-12 gap-x-4 items-center"
    >
      <AwesomeIcon icon={info.icon} className="col-span-1 w-4 h-4 text-sunny" />
      <h4 className="col-span-11 text-white poppins-regular">{info.value}</h4>
    </div>
  )
}

export default ContactInfoItem
