import React, { FC, FormEvent } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { formatDate } from '@/app/utils/date.functions'
import AppleLoader from '../common/AppleLoader'
import { useDeletePhotoGalleryProjectMutation } from '@/app/redux/services/photoGalleryImageApi'
import AwesomeIcon from '../common/AwesomeIcon'
import { trashIcon } from '@/app/icons'
import { openGalleryPhotosModal } from '@/app/redux/features/photoGallerySlice'
import { ProjectProps } from '@/app/types/photo-gallery.types'
import AdminDeleteButton from './AdminDeleteButton'

const PhotoAlbum: FC<ProjectProps> = ({ id, galleryItems, serviceType, name, updatedAt }) => {
  const dispatch = useAppDispatch()
  const [deletePhotoGalleryProject, { isLoading, isFetching, error }] = useDeletePhotoGalleryProjectMutation()
  const { loading } = useAppSelector((state: RootState) => state.photoGallery)

  const handleEditAlbum = (e: FormEvent, project: any) => {
    e.preventDefault()
    dispatch(openGalleryPhotosModal(project))
  }

  return (
    <div
      key={id}
      className="col-span-12 760:col-span-6 1160:col-span-5 1690:col-span-4 flex flex-col justify-between shadow-adminServiceCard rounded-2xl py-4 px-5"
    >
      <div>
        <h1
          className={`relative font-rubik font-medium text-[#b0b0b2] text-15 after:absolute after:content-[''] after:-left-3 after:top-0 after:w-1 after:h-[22.5px] ${
            serviceType === 'Commercial' ? 'after:bg-[#845ADE]' : serviceType === 'Residential' ? 'after:bg-pink-600' : 'after:bg-lime-600'
          }`}
        >
          {name}
        </h1>
        <h2 className="font-rubik text-[#7e7e84] text-xs">
          {galleryItems?.length} pair, {galleryItems?.length * 2} images
        </h2>
        <h3 className="font-rubik text-[#68686f] text-[11px] pb-4 italic">Last updated: {formatDate(updatedAt)}</h3>
      </div>
      <div
        className={`flex flex-wrap gap-0.5 ${
          galleryItems?.length > 0 ? 'border-b-[0.5px] border-b-[#363636] border-t-[0.5px] border-t-[#363636] py-7' : ''
        }`}
      >
        {galleryItems?.map((item: any, i) => (
          <div key={i} className="flex flex-wrap gap-0.5 w-fit">
            <div
              style={{ backgroundImage: `url(${item?.before?.url})` }}
              className="bg-cover bg-no-repeat w-12 h-12 bg-center aspect-square"
            />
            <div
              style={{ backgroundImage: `url(${item?.after?.url})` }}
              className="bg-cover bg-no-repeat w-12 h-12 bg-center aspect-square"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={(e: FormEvent) => handleEditAlbum(e, { id, galleryItems, serviceType, name, updatedAt })}
          className={`${
            serviceType === 'Commercial'
              ? 'text-[#845ADE] bg-[#252230] hover:text-[#9d71fa] hover:bg-[#292634]'
              : serviceType === 'Residential'
              ? 'text-pink-600 bg-[#2a1d1f] hover:text-pink-500 hover:bg-[#321f21]'
              : 'bg-lime-950 hover:bg-[#204a1d] text-lime-600 hover:text-lime-500'
          } font-rubik text-17 duration-100 rounded-md px-5 py-1.5`}
        >
          Edit album
        </button>
        <div className="flex items-center gap-x-2.5">
          {error?.data?.message && <div className="text-xs text-red-500">{error?.data?.message}</div>}
          <AdminDeleteButton
            handleDelete={async () => await deletePhotoGalleryProject({ projectId: id }).unwrap()}
            item={{}}
            loading={isLoading || isFetching || loading}
          />
        </div>
      </div>
    </div>
  )
}

export default PhotoAlbum
