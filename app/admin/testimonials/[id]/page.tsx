import React, { FC } from 'react'
import UpdateTestimonial from './UpdateTestimonial'
import { ServerWrapperProps } from '@/app/types/common.types'

const UpdateTestimonialServerWrapper: FC<ServerWrapperProps> = async ({ params }) => {
  const { id } = await params

  return (
    <section className="grid grid-cols-12 gap-x-7">
      <div className="col-span-12 shadow-neu bg-iconShadow p-6 rounded-lg">
        <h1 className="text-lg mb-9 rubik-bold text-midnightPlum">Update Testimonial</h1>
        <UpdateTestimonial id={id} />
      </div>
    </section>
  )
}

export default UpdateTestimonialServerWrapper
