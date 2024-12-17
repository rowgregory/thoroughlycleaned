'use client'

import React, { MouseEvent } from 'react'
import { RootState, useAppSelector } from '../redux/store'
import { useDeleteServiceMutation, useFetchServicesQuery } from '../redux/services/serviceApi'
import ServiceRow from './rows/ServiceRow'
import ServiceHead from './heads/ServiceHead'
import Loading from '../admin/loading'

const ServicesTable = () => {
  const { filteredArray } = useAppSelector((state: RootState) => state.dashboard)
  let { isLoading } = useFetchServicesQuery()
  const [deleteService] = useDeleteServiceMutation()

  const handleDelete = async (e: MouseEvent<HTMLSpanElement>, id: number) => {
    e.preventDefault()
    await deleteService(id).unwrap()
  }

  if (isLoading) return <Loading />

  return (
    <table className="w-full">
      <ServiceHead />
      <tbody>
        {filteredArray?.map((service, i) => (
          <ServiceRow
            key={i}
            data={service}
            onDelete={handleDelete}
            filteredArray={filteredArray}
            i={i}
          />
        ))}
      </tbody>
    </table>
  )
}

export default ServicesTable
