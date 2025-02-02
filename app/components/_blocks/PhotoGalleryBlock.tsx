import React from 'react'
import Slider from 'react-slick'
import SectionHeader from '../common/SectionHeader'
import { photoGalleryCarouselSettings } from '@/public/data/slider.settings'
import Link from 'next/link'
import EditableTextArea from '../common/EditableTextArea'

const PhotoGalleryBlock = ({ textBlockMap, photoGalleryImages }: any) => {
  return (
    <section className="bg-paleBlue px-4 pt-44 pb-52 group relative">
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] w-full mx-auto flex flex-col items-center">
        <SectionHeader
          subtitle={textBlockMap?.PHOTO_GALLERY_BLOCK?.photoGalleryBlockSubtitle}
          subtitleName="photoGalleryBlockSubtitle"
          title={textBlockMap?.PHOTO_GALLERY_BLOCK?.photoGalleryBlockTitle}
          titleName="photoGalleryBlockTitle"
          type="PHOTO_GALLERY_BLOCK"
          subtitleStyles="text-center"
          titleStyles="text-center"
          sectionStyles="flex flex-col justify-center items-center"
        />
        <div className="w-full relative">
          <Slider {...photoGalleryCarouselSettings}>
            {photoGalleryImages?.map((item: any, i: number) => (
              <div key={i} className="h-96 flex-1">
                <div className="bg-cover bg-center bg-no-repeat w-full h-full" style={{ backgroundImage: `url(${item?.url})` }} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex flex-col 480:flex-row items-center justify-center gap-y-2 480:gap-y-0 480:gap-x-2 mt-16">
          <EditableTextArea
            tag="h5"
            initialValue={textBlockMap?.PHOTO_GALLERY_BLOCK?.photoGalleryBlockText}
            type="PHOTO_GALLERY_BLOCK"
            textBlockKey="photoGalleryBlockText"
            className="text-gray-600 text-15"
          />
          <Link href="/services" className="text-skyAqua font-semibold hover:underline">
            Browse All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PhotoGalleryBlock
