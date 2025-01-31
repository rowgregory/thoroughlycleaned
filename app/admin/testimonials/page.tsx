'use client'

import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import { useFetchTestimonialsQuery } from '@/app/redux/services/testimonialApi'
import AdminTestimonialRow from '@/app/components/testimonials/AdminTestimonialRow'
import AdminTestimonialCreateModal from '@/app/modals/AdminTestimonialCreateModal'
import AdminTestimonialUpdateModal from '@/app/modals/AdminTestimonialUpdateModal'
import AdminCommandArea from '@/app/components/admin/AdminCommandArea'
import AdminErrorText from '@/app/components/admin/AdminErrorText'
import FullScreenAppleLoader from '@/app/components/common/FullScreenAppleLoader'

const Testimonials = () => {
  const { isLoading, error, data } = useFetchTestimonialsQuery()
  const { openModalTestimonialCreate, openModalTestimonialUpdate } = useAppSelector((state: RootState) => state.testimonial)

  return (
    <>
      {openModalTestimonialCreate && <AdminTestimonialCreateModal />}
      {openModalTestimonialUpdate && <AdminTestimonialUpdateModal />}
      <AdminCommandArea type="TESTIMONIALS" btnText="Create Testimonial" />
      {isLoading ? (
        <FullScreenAppleLoader />
      ) : error ? (
        <AdminErrorText error={error?.data?.message} />
      ) : (
        <div className="max-w-[690px] 1160:max-w-screen-990 w-full flex flex-col gap-y-12 760:gap-y-4 animate-fadeIn">
          {data?.testimonials?.map((testimonial: any) => (
            <AdminTestimonialRow key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </>
  )
}

export default Testimonials
