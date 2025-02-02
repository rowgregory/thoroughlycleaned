import React, { FC, useState } from 'react'
import { setOpenModalTestimonialUpdate } from '@/app/redux/features/testimonialSlice'
import { useDeleteTestimonialMutation } from '@/app/redux/services/testimonialApi'
import { useAppDispatch } from '@/app/redux/store'
import AdminDeleteButton from '../admin/AdminDeleteButton'
import AdminErrorText from '../admin/AdminErrorText'

const AdminTestimonialRow: FC<{ testimonial: any }> = ({ testimonial }) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [deleteTestimonial, { error }] = useDeleteTestimonialMutation()

  const handleDelete = async (e: MouseEvent, testimonial: any) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [testimonial?.id]: true }))
    await deleteTestimonial({ id: testimonial.id })
      .unwrap()
      .catch(() => {})
    setLoading((prev) => ({ ...prev, [testimonial?.id]: false }))
  }

  const openModal = (e: any) => {
    e.stopPropagation()
    dispatch(setOpenModalTestimonialUpdate(testimonial))
  }

  return (
    <div
      onClick={openModal}
      className="grid grid-cols-12 w-full gap-x-4 items-center hover:bg-[#2C2C2E] px-2 py-1 -ml-2 rounded-md cursor-pointer relative after:absolute after:content-[''] after:w-full after:z-10 after:h-[0.5px] after:bg-[#2c2c2e] after:-bottom-6 after:left-0 760:after:hidden"
    >
      <h1 className="col-span-11 760:col-span-2 1160:col-span-3 font-rubik font-light text-white text-17 truncate">{testimonial?.name}</h1>
      <div className="col-span-12 760:col-span-8 1160:col-span-7 font-rubik font-thin text-17 text-[#737376] 760:truncate">
        {error?.data?.message ? <AdminErrorText error={error?.data?.message} /> : testimonial?.reviewTitle}
      </div>
      <div className="col-start-12 col-span-2 760:col-span-1 flex justify-end">
        <AdminDeleteButton handleDelete={handleDelete} item={testimonial} loading={loading[testimonial?.id]} />
      </div>
    </div>
  )
}

export default AdminTestimonialRow
