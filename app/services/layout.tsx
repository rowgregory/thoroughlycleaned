'use client'

import React from 'react'
import PublicServiceDetailsModal from '../modals/PublicServiceDetailsModal'
import { RootState, useAppSelector } from '../redux/store'

const ServiceLayout = ({ children }: any) => {
  const { openModalServiceDetails } = useAppSelector((state: RootState) => state.service)
  return (
    <>
      {openModalServiceDetails && <PublicServiceDetailsModal show={openModalServiceDetails} />}
      {children}
    </>
  )
}

export default ServiceLayout
