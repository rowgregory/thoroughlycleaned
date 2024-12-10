import React from 'react'
import SectionHeader from '../common/SectionHeader'

const whyChooseUs = [
  {
    img: '/images/wc-1.png',
    num: '01',
    text: 'Expert cleaning for every space'
  },
  {
    img: '/images/wc-2.png',
    num: '02',
    text: 'Eco-friendly solutions, no compromise'
  },
  {
    img: '/images/wc-3.png',
    num: '03',
    text: 'Highly trained and trusted staff'
  },
  {
    img: '/images/wc-4.png',
    num: '04',
    text: 'Guaranteed satisfaction, every time'
  }
]

const WhyChooseUs = () => {
  return (
    <section>
      <div className="max-w-2xl 990:max-w-screen-xl w-full mx-auto flex flex-col 1200:flex-row">
        <div className="flex-1 px-4 1200:pl-0 1200:pr-20 py-44">
          <SectionHeader
            icon="bg-brush"
            header="Why Choose Us"
            title="Reasons to Hire Thoroughly Cleaned"
          />
          <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
            {whyChooseUs.map((why, i) => (
              <div
                data-aos="fade-up"
                data-aos-delay={i * 100}
                key={i}
                className="col-span-12 md:col-span-6 px-5 py-10 border-1 border-gray-200 min-w-60"
              >
                <div className="flex items-center justify-between mb-8">
                  <div
                    style={{ backgroundImage: `url(${why.img})` }}
                    className="bg-cover bg-center bg-no-repeat w-12 h-12 aspect-square"
                  />
                  <span className="text-yellow-100 modern-antiqua-regular text-5xl">{why.num}</span>
                </div>
                <span className="text-17 poppins-semibold">{why.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 h-auto min-h-[600px]">
          <div className="bg-whyChooseUs bg-cover bg-center bg-no-repeat h-full w-full min-h-[600px] max-w-[-webkit-fill-available] max-h-[600px] 1200:max-h-[1010px] absolute left-0 1200:left-auto" />
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
