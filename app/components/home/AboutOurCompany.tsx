'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Picture from '../common/Picture';
import { aboutSectionPickerData } from '@/app/data/homePageData';
import { TFunction } from 'i18next';
import HowItWorksSection from './HowItWorksSection';
import WeProvideSection from './WeProvideSection';

const AboutOurCompany = () => {
  const { t }: { t: TFunction } = useTranslation('common');
  const [about, setAbout] = useState('provide');

  return (
    <div
      className="w-full h-[1200px] md:h-[700px] bg-cover no-repeat relative my-40"
      style={{ backgroundImage: `url('/images/about-our-company.jpg')` }}
    >
      <div className="absolute z-10 top-0 w-full h-[1200px] md:h-[700px] bg-white/90 flex flex-col">
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-[1200px] mx-auto px-8">
          <div className="w-full max-w-screen-sm xl:max-w-screen-md">
            <h2 className="slide-down text-[#4d5a65] text-4xl font-bold mb-5">
              {t('home.about.title')}
            </h2>
            <div className="flex items-center gap-5 mb-9">
              {aboutSectionPickerData(t).map((obj: any, i: number) => (
                <p
                  className={`${
                    about === obj.textKey ? 'text-[#4e9dea]' : 'text-[#485c6a]'
                  } text-lg font-black cursor-pointer ${
                    i === 1
                      ? 'border-l-[1px] border-r-[1px] border-[#3f4b59] px-5'
                      : ''
                  }`}
                  onClick={() => setAbout(obj.textKey)}
                  key={i}
                >
                  {obj.section}
                </p>
              ))}
            </div>
            {about === t('home.about.provide.provide') && (
              <WeProvideSection t={t} />
            )}
            {about === t('home.about.works.works') && (
              <HowItWorksSection t={t} />
            )}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 flex justify-center w-full sm:w-auto">
          <Picture
            src="/images/index-right-img.png"
            alt="Thoroughly Cleaned"
            className="w-[550px] md:w-[530px] lg:w-[700px] h-auto z-0"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutOurCompany;
