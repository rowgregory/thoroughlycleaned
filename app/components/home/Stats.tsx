import React from 'react'
import Counter from '../common/Counter'
import EditableTextArea from '../common/EditableTextArea'
import { stats } from '@/public/data/home.data'

const Stats = ({ textBlockMap }: any) => {
  return (
    <section
      className="px-4 py-32 bg-neonIce relative overflow-hidden bg-repeat bg-center"
      style={{ backgroundImage: `url('/images/pattern3.png')` }}
    >
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] w-full mx-auto grid grid-cols-12 gap-y-20 990:gap-x-20">
        {stats(textBlockMap).map((stat, i) => (
          <div key={i} className="col-span-12 990:col-span-4 relative z-10">
            <div className="mb-3.5">{stat.icon}</div>
            <div className="flex items-center gap-x-2">
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
