'use client'

import React from 'react'
import PageBanner from '../components/common/PageBanner'
import { RootState, useAppSelector } from '../redux/store'
import PublicAlbum from '../components/photo-gallery/PublicAlbum'
import PublicPhotoGalleryLightBox from '../components/photo-gallery/PublicPhotoGalleryLightBox'
import { ProjectProps } from '../types/photo-gallery.types'

const Projects = () => {
  const { isLightboxOpen } = useAppSelector((state: RootState) => state.lightbox)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { projects } = useAppSelector((state: RootState) => state.photoGallery)

  return (
    <div className="relative">
      <PageBanner
        type="PHOTO_GALLERY_PAGE"
        fileNameKey="photoGalleryPageFile"
        titleNameKey="photoGalleryPageBannerTitle"
        subtitleNameKey="photoGalleryPageBannerSubtitle"
        textBlockMap={textBlockMap}
      />
      <div className="px-4 lg:px-12 xl:px-4 py-32">
        <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full">
          <div className="grid grid-cols-12 gap-y-6 400:gap-3 990:gap-6">
            {projects?.map((project: ProjectProps) => (
              <PublicAlbum key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>
      {isLightboxOpen && <PublicPhotoGalleryLightBox />}
    </div>
  )
}

export default Projects
