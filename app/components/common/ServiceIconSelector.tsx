import React, { FC } from 'react'
import BiohazardServiceIcon from '@/app/icons/BiohazardServiceIcon'
import CommercialServiceIcon from '@/app/icons/CommercialServiceIcon'
import ResidentialServiceIcon from '@/app/icons/ResidentialServiceIcon'

const ServiceIconSelector: FC<{ serviceType: string }> = ({ serviceType }) => {
  return (
    <div>
      {serviceType === 'Residential' ? (
        <ResidentialServiceIcon />
      ) : serviceType === 'Commercial' ? (
        <CommercialServiceIcon />
      ) : (
        <BiohazardServiceIcon />
      )}
    </div>
  )
}

export default ServiceIconSelector
