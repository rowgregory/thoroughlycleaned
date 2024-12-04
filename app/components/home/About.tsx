import React from 'react'
import Picture from '../common/Picture'

const about = [
  {
    img: '/images/residential.png',
    titleKey: 'Residential',
    textKey:
      'Professional and thorough cleaning services tailored for your home, ensuring every room sparkles and feels fresh.'
  },
  {
    img: '/images/commercial.png',
    titleKey: 'Commercial',
    textKey:
      'Expert cleaning for offices and commercial spaces, providing a pristine environment for your employees and clients.'
  },
  {
    img: '/images/biohazard.png',
    titleKey: 'Biohazard',
    textKey:
      'Specialized biohazard cleaning services with strict safety protocols to handle hazardous materials and ensure a safe environment.'
  }
]

const About = () => {
  return (
    <section className="px-4 lg:px-12 xl:px-4">
      <div className="max-w-screen-xl mx-auto w-full py-32 flex flex-col 990:flex-row items-center gap-y-8 md:gap-x-12">
        <div
          className={`flex-1 relative before:animate-translate-element before:absolute before:content-[''] before:bg-sunny before:w-40 before:h-40 before:-bottom-7 before:-left-7 before:z-[-1]`}
        >
          <div className="translate-y-element bg-[url('/images/yellow-circles.png')] bg-contain bg-no-repeat w-full h-full max-w-40 absolute z-[-1] top-10 -right-2"></div>

          <Picture
            src="/images/about-scaling-img.png"
            alt="About Thoroughly Cleaned"
            className="hidden 990:block scaling-element aspect-square w-44 h-44 rounded-full object-cover absolute -top-12 -left-12 border-4 border-white"
            priority={true}
          />
          <Picture
            src="/images/about.jpg"
            alt="About Thoroughly Cleaned"
            className={`max-w-xl w-full aspect-square 990:h-[575px] object-cover `}
            priority={true}
          />
          <div className="bg-skyAqua"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-x-3 mb-5 mt-20 990:mt-0">
            <Picture
              src="/images/banner-brush.png"
              alt="Brush Icon"
              className="w-12 h-12"
              priority={false}
            />
            <h1 className="uppercase text-skyAqua poppins-semibold">About Thoroughly Cleaned</h1>
          </div>
          <h2 className="poppins-bold text-[40px] text-[#111111] leading-[50px] mb-9">
            Thoroughly Cleaned &#8208; North Shore&apos;s Leading Cleaning Agency
          </h2>
          <p className="poppins-regular text-[#332] mb-10">
            Expert cleaning solutions for homes and businesses across Boston’s North Shore, trusted
            for over 10 years. Our commitment to quality and customer satisfaction sets us apart in
            every cleaning we perform.
          </p>
          <div className="">
            {about.map((service, i) => (
              <div key={i} className="flex gap-5 mb-9">
                <Picture
                  src={service.img}
                  alt={service.titleKey}
                  className="w-20 h-full"
                  priority={false}
                />
                <div className="flex flex-col">
                  <h3 className="poppins-bold text-xl mb-4">{service.titleKey}</h3>
                  <h3 className="poppins-regular">{service.textKey}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
