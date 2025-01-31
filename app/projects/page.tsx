'use client'

import React from 'react'
import PageBanner from '../components/common/PageBanner'
import { useFetchPhotoGalleryProjectsQuery } from '../redux/services/photoGalleryImageApi'
import { RootState, useAppSelector } from '../redux/store'
import PublicAlbum from '../components/photo-gallery/PublicAlbum'
import PublicPhotoGalleryLightBox from '../components/photo-gallery/PublicPhotoGalleryLightBox'
import { ProjectProps } from '../types/photo-gallery.types'
import { useFetchPageSpecificTextBlocksQuery } from '../redux/services/textBlockApi'
import SkeletonLoader from '../components/app/SkeleonLoader'

const Projects = () => {
  const { isLoading: loadingPhotoGalleryProjects, data: photoGallery } = useFetchPhotoGalleryProjectsQuery()
  const { isLightboxOpen } = useAppSelector((state: RootState) => state.lightbox)
  const { isLoading: loadingTextBlocks, data: textBlock } = useFetchPageSpecificTextBlocksQuery([
    'PHOTO_GALLERY_PAGE',
    'PHOTO_GALLERY_BLOCK'
  ])

  return (
    <>
      <PageBanner
        type="PHOTO_GALLERY_PAGE"
        fileNameKey="photoGalleryPageFile"
        titleNameKey="photoGalleryPageBannerTitle"
        subtitleNameKey="photoGalleryPageBannerSubtitle"
        textBlockMap={textBlock?.transformedTextBlocks}
        isLoading={loadingTextBlocks}
      />
      <div className="px-4 lg:px-12 xl:px-4 py-32">
        <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full">
          <div className="grid grid-cols-12 gap-y-6 400:gap-3 990:gap-6">
            {loadingPhotoGalleryProjects
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonLoader key={i} className="col-span-12 760:col-span-6 1160:col-span-4 1690:col-span-4" />
                ))
              : photoGallery?.projects?.map((project: ProjectProps) => <PublicAlbum key={project.id} {...project} />)}
          </div>
        </div>
      </div>
      {isLightboxOpen && <PublicPhotoGalleryLightBox />}
    </>
  )
}

export default Projects
