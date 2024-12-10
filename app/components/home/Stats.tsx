import React from 'react'
import Counter from '../common/Counter'

const stats = [
  {
    img: '/images/s1.png',
    value: 500,
    text: 'Happy Customers Served',
    icon: '+'
  },
  {
    img: '/images/s2.png',
    value: 100,
    text: 'STrusted by Local Businesses',
    icon: '%'
  },
  {
    img: '/images/s3.png',
    value: 10,
    text: 'Years of Excellence',
    icon: '+'
  }
]

const Stats = () => {
  return (
    <section className="px-4 py-28 bg-skyAqua relative overflow-hidden">
      <div className="animate-translateYBackForth bg-clearBubbles bg-cover by-cover bg-no-repeat w-40 h-40 absolute top-20 left-20 z-0" />
      <div className="animate-translateYBackForth bg-clearBubbles bg-cover by-cover bg-no-repeat w-96 h-96 absolute top-0 left-1/2 z-0" />
      <div className="animate-translateYBackForth bg-clearBubbles bg-cover by-cover bg-no-repeat w-32 h-32 absolute top-0 right-20 z-0" />
      <div className="max-w-2xl 990:max-w-screen-xl w-full mx-auto grid grid-cols-12 gap-y-20 md:gap-x-20">
        {stats.map((stat, i) => (
          <div key={i} className="col-span-12 990:col-span-4">
            <div
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="bg-cover by-center bg-no-repeat w-16 h-16 mb-4"
              style={{ backgroundImage: `url(${stat.img})` }}
            />
            <div className="flex items-center gap-x-2">
              <Counter
                targetNumber={stat.value}
                duration={2000}
                className="text-white text-5xl poppins-bold mb-2"
              />
              <span className="text-white text-5xl poppins-bold mb-2">{stat.icon}</span>
            </div>
            <h1 className="text-white text-2xl poppins-bold">{stat.text}</h1>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
