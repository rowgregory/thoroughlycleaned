'use client'

import React from 'react'
import PublicServiceDetailsModal from '../modals/PublicServiceDetailsModal'
import { RootState, useAppSelector } from '../redux/store'

const ServiceLayout = ({ children }: any) => {
  const { openModalServiceDetails } = useAppSelector((state: RootState) => state.service)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  return (
    <>
      {openModalServiceDetails && <PublicServiceDetailsModal show={openModalServiceDetails} textBlockMap={textBlockMap} />}
      {children}
    </>
  )
}

export default ServiceLayout
