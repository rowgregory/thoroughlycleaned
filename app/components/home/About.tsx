import { about } from '@/public/data/home.data'
import React from 'react'
import SectionHeader from '../common/SectionHeader'

const About = () => {
  return (
    <section className="px-4 990:px-12 xl:px-4">
      <div className="max-w-2xl 990:max-w-screen-xl mx-auto w-full py-32 flex flex-col 990:flex-row 990:items-center gap-y-8 md:gap-x-12">
        <div
          className={`flex-1 relative before:animate-translateXBackForth 
            before:absolute before:content-[''] before:bg-sunny before:w-40 
            before:h-40 before:-bottom-7 before:-left-7 before:z-[-1]`}
        >
          <div
            className="animate-translateYBackForth bg-yellowDots bg-contain
                bg-no-repeat w-full h-full max-w-40 absolute z-[-1] top-10 -right-2"
          ></div>
          <div
            className="animate-scaleBackForth bg-cleaningBucket 
              bg-contain bg-no-repeat bg-center w-44 h-44 hidden 990:block
              aspect-square rounded-full absolute -top-12 -left-12 border-4
              border-white"
          ></div>
          <div className="bg-vaccuum bg-cover bg-no-repeat bg-center aspect-square max-w-xl w-full h-full" />
        </div>
        <div className="flex-1">
          <SectionHeader
            icon="bg-brush"
            header="About Thoroughly Cleaned"
            title="Thoroughly Cleaned &#8208; North Shore's Leading Cleaning Agency"
          />
          <p data-aos="fade-up" className="poppins-regular text-espresso mb-10">
            Expert cleaning solutions for homes and businesses across Boston&apos;s North Shore,
            trusted for over 10 years. Our commitment to quality and customer satisfaction sets us
            apart in every cleaning we perform.
          </p>
          {about.map((about, i) => (
            <div
              data-aos="fade-up"
              data-aos-delay={i * 100}
              key={i}
              className="flex items-start gap-5 mb-9"
            >
              <div
                className={`flex-shrink-0 w-20 h-20 bg-contain bg-no-repeat bg-center ${about.img}`}
                style={{ backgroundImage: `url(${about.img})` }}
              />

              <div className="flex flex-col">
                <h3 className="poppins-bold text-xl mb-4 text-charcoalBlack">{about.titleKey}</h3>
                <h3 className="poppins-regular text-charcoalBlack">{about.textKey}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
