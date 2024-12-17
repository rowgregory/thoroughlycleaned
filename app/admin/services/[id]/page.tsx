import React, { FC } from 'react'
import { ServerWrapperProps } from '@/app/types/common.types'
import UpdateService from './UpdateService'

const UpdateServiceServerWrapper: FC<ServerWrapperProps> = async ({ params }) => {
  const { id } = await params

  return (
    <section className="grid grid-cols-12 gap-x-7">
      <div className="col-span-12 shadow-neu bg-iconShadow p-6 rounded-lg">
        <h1 className="text-lg mb-9 rubik-bold text-midnightPlum">Update Service</h1>
        <UpdateService id={id} />
      </div>
    </section>
  )
}

export default UpdateServiceServerWrapper
