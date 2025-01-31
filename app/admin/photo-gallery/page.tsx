'use client'

import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import { useFetchPhotoGalleryProjectsQuery } from '@/app/redux/services/photoGalleryImageApi'
import AdminGalleryPhotosModal from '@/app/modals/AdminGalleryPhotosModal'
import PhotoAlbum from '@/app/components/admin/PhotoAlbum'
import AdminGalleryDetailsCreateModal from '@/app/modals/AdminGalleryDetailsCreateModal'
import AdminGalleryDetailsUpdateModal from '@/app/modals/AdminGalleryDetailsUpdateModal'
import { ProjectProps } from '@/app/types/photo-gallery.types'
import AdminErrorText from '@/app/components/admin/AdminErrorText'
import AdminCommandArea from '@/app/components/admin/AdminCommandArea'
import FullScreenAppleLoader from '@/app/components/common/FullScreenAppleLoader'

const PhotoGallery = () => {
  const { isLoading, data, error } = useFetchPhotoGalleryProjectsQuery()
  const { openModalGalleryCreateDetails, openModalGalleryPhotos, openModalGalleryUpdateDetails } = useAppSelector(
    (state: RootState) => state.photoGallery
  )

  return (
    <>
      {openModalGalleryCreateDetails && <AdminGalleryDetailsCreateModal />}
      {openModalGalleryUpdateDetails && <AdminGalleryDetailsUpdateModal />}
      {openModalGalleryPhotos && <AdminGalleryPhotosModal />}
      <AdminCommandArea type="PHOTO_GALLERY" btnText="Create Album" />
      {isLoading ? (
        <FullScreenAppleLoader />
      ) : error ? (
        <AdminErrorText error={error?.data?.message} />
      ) : (
        <div className="grid grid-cols-12 gap-y-8 480:gap-8 animate-fadeIn">
          {data?.projects?.map((project: ProjectProps) => (
            <PhotoAlbum key={project?.id} {...project} />
          ))}
        </div>
      )}
    </>
  )
}

export default PhotoGallery
