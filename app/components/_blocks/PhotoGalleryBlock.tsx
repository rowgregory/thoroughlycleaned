import React from 'react'
import Slider from 'react-slick'
import SectionHeader from '../common/SectionHeader'
import { photoGalleryCarouselSettings } from '@/public/data/slider.settings'
import Link from 'next/link'

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
        <div className="slider-container w-full relative">
          <Slider {...photoGalleryCarouselSettings}>
            {photoGalleryImages?.map((item: any, i: number) => (
              <div data-aos="fade-up" data-aos-delay={i * 100} key={i} className="h-96 flex-1">
                <div className="bg-cover bg-center bg-no-repeat w-full h-full" style={{ backgroundImage: `url(${item?.url})` }} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex items-center justify-center gap-x-2 mt-16">
          <h5 className="text-gray-600 text-15">Explore our Cleaning Projects.</h5>
          <Link href="/services" className="text-skyAqua font-semibold hover:underline">
            Browse All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PhotoGalleryBlock
