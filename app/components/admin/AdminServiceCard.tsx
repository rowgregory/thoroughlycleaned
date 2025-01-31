import React, { FC, useState } from 'react'
import { useAppDispatch } from '@/app/redux/store'
import { setModalOpenServiceUpdate } from '@/app/redux/features/serviceSlice'
import { useDeleteServiceMutation } from '@/app/redux/services/serviceApi'
import Picture from '../common/Picture'
import { truncateString } from '@/app/utils/string.functions'
import AdminDeleteButton from './AdminDeleteButton'
import AdminErrorText from './AdminErrorText'

const AdminServiceCard: FC<{ service: any }> = ({ service }) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [deleteService, { error }] = useDeleteServiceMutation()

  const handleDelete = async (e: any, service: any) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [service?.id]: true }))

    await deleteService({ id: service?.id, fileName: service?.fileName, mimeType: 'image' })
      .unwrap()
      .catch(() => {})

    setLoading((prev) => ({ ...prev, [service?.id]: false }))
  }

  const handleEdit = (e: any) => {
    e.preventDefault()
    dispatch(setModalOpenServiceUpdate(service))
  }

  return (
    <div
      onClick={handleEdit}
      className="shadow-adminServiceCard hover:shadow-adminServiceCardHover col-span-12 md:col-span-6 1160:col-span-4 1690:col-span-3 rounded-2xl relative cursor-pointer"
    >
      <div className="grid grid-cols-12 bg-[#323235] rounded-tl-2xl rounded-tr-2xl p-5">
        <div className={`col-span-12 480:col-span-3 w-12 h-12 mb-2 480:mb-0 aspect-square rounded-xl flex items-center justify-center`}>
          {service?.url && (
            <Picture
              src={service?.url}
              alt={service?.name}
              className="w-full h-auto rounded-xl aspect-square object-cover"
              priority={false}
            />
          )}
        </div>
        <div className="flex flex-col col-span-12 480:col-span-9">
          <h1 className="text-white font-rubik text-[22px] max-w-52 w-full truncate">{service?.name}</h1>
          <h1 className="text-[#6d6d70] text-sm rubik-thin">{service?.serviceType}</h1>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-y-3">
        <p className="text-zinc-400">{truncateString(service?.description, 75)}</p>
        <div className="flex items-center justify-end gap-x-2">
          {error && <AdminErrorText error={error?.data?.message} />}
          <AdminDeleteButton handleDelete={handleDelete} item={service} loading={loading[service?.id]} />
        </div>
      </div>
    </div>
  )
}

export default AdminServiceCard
