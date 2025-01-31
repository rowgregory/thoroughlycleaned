import React from 'react'
import Counter from '../common/Counter'
import { stats } from '@/public/data/home.data'
import Picture from '../common/Picture'
import EditableTextArea from '../common/EditableTextArea'

const Stats = ({ textBlockMap }: any) => {
  return (
    <section className="px-4 py-32 bg-skyAqua relative overflow-hidden">
      <Picture
        src="/images/clear-bubbles.png"
        alt="Thoroughly Cleaned, LLC"
        className="animate-translateYBackForth w-auto h-auto object-cover absolute top-20 left-20 z-0"
        priority={false}
        width={40}
        height={40}
      />
      <Picture
        src="/images/clear-bubbles.png"
        alt="Thoroughly Cleaned, LLC"
        className="animate-translateYBackForth w-auto h-auto object-cover absolute top-0 left-1/2 z-0"
        priority={false}
        width={96}
        height={96}
      />
      <Picture
        src="/images/clear-bubbles.png"
        alt="Thoroughly Cleaned, LLC"
        className="animate-translateYBackForth w-auto h-auto object-cover absolute top-0 right-20 z-0"
        priority={false}
        width={32}
        height={32}
      />
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] w-full mx-auto grid grid-cols-12 gap-y-20 990:gap-x-20">
        {stats(textBlockMap).map((stat, i) => (
          <div key={i} className="col-span-12 990:col-span-4 relative z-10">
            <div
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="bg-cover by-center bg-no-repeat w-16 h-16 mb-4"
              style={{ backgroundImage: `url(${stat?.img})` }}
            />
            <div data-aos="fade-up" data-aos-delay={i * 100} className="flex items-center gap-x-2">
              <Counter targetNumber={stat?.value} duration={2000} className="text-white text-5xl font-bold mb-2" name={stat?.nameValue} />

              <EditableTextArea
                tag="span"
                initialValue={stat?.symbol}
                type="STATS_BLOCK"
                textBlockKey={stat?.nameSymbol}
                className="text-white text-5xl font-bold mb-2"
              />
            </div>
            <EditableTextArea
              tag="span"
              initialValue={stat?.text}
              type="STATS_BLOCK"
              textBlockKey={stat?.nameText}
              className="text-white text-2xl font-bold"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
