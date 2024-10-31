import { howItWorksData } from '@/app/data/homePageData';
import React, { Fragment } from 'react';

const HowItWorksSection = ({ t }: any) => (
  <div className="grid grid-cols-12 gap-3 w-full max-w-screen-sm">
    <div className="col-span-12 2xl:col-span-6">
      <h1 className="mb-5 font-black text-lg text-[#485c6a]">
        {t('home.about.works.title')}
      </h1>
      <p className="mb-5 text-[#727e8d] leading-7">
        {t('home.about.works.paragraph1')}
      </p>
      <p className="mb-5 text-[#727e8d] leading-7">
        {t('home.about.works.paragraph2')}
      </p>
    </div>
    <div className="col-span-12 sm:col-span-6 md:col-span-8 2xl:col-span-6">
      {howItWorksData(t).map((obj: any, i: number) => (
        <Fragment key={i}>
          <h1 className="mb-5 font-black text-lg text-[#485c6a]">
            {obj.title}
          </h1>
          <p className="mb-5 text-[#727e8d] leading-7">{obj.text}</p>
        </Fragment>
      ))}
    </div>
  </div>
);

export default HowItWorksSection;
