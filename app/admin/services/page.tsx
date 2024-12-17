'use client'

import React from 'react'
import Link from 'next/link'
import ServicesTable from '@/app/tables/ServicesTable'
import { useAppDispatch } from '@/app/redux/store'
import { resetService } from '@/app/redux/features/serviceSlice'

const Services = () => {
  const dispatch = useAppDispatch()
  return (
    <div className="p-6 shadow-neu bg-iconShadow">
      <div className="mb-5 w-full flex items-center flex-col 990:flex-row 990:justify-between">
        <h1 className="text-lg rubik-bold text-midnightPlum">Services Table</h1>
        <Link
          onClick={() => dispatch(resetService())}
          href="/admin/services/create"
          className="py-3 px-4 rounded-[4px] bg-neonSkyAqua text-white shadow-submit text-sm rubik-thin tracking-wide"
        >
          Create Service
        </Link>
      </div>
      <ServicesTable />
    </div>
  )
}

export default Services
