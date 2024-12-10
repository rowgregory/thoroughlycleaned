'use client'

import React from 'react'
import SectionHeader from '../common/SectionHeader'
import Slider from 'react-slick'

const galleryImages = ['/images/g1.png', '/images/g2.png', '/images/g3.png']

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  adaptiveHeight: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true
      }
    },
    {
      breakpoint: 684,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      }
    }
  ]
}

const CompletedProjects = () => {
  return (
    <section className="bg-paleBlue px-4 py-32 group">
      <div className="max-w-2xl 990:max-w-screen-xl w-full mx-auto flex flex-col items-center">
        <SectionHeader icon="bg-brush" header="Gallery" title="Our Work In Action" />
        <div className="slider-container w-full relative">
          <Slider {...settings}>
            {galleryImages.map((item, i) => (
              <div data-aos="fade-up" data-aos-delay={i * 100} key={i} className="h-96 flex-1">
                <div
                  className="bg-cover bg-center bg-no-repeat w-full h-full"
                  style={{ backgroundImage: `url(${item})` }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default CompletedProjects
