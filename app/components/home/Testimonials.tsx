'use client';

import { TFunction } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LinesWithCircleDivider from '../common/LinesWithCircleDivider';
import Picture from '../common/Picture';

const Testimonials = () => {
  const { t }: { t: TFunction } = useTranslation('common');
  return (
    <div
      className="w-full h-[1200px] md:h-[800px] bg-cover no-repeat relative my-40"
      style={{ backgroundImage: `url('/images/testimonial-bg.jpg')` }}
    >
      <div className="absolute z-10 top-0 w-full h-[1200px] md:h-[800px] bg-white/90 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-4 mt-8 w-full max-w-[1200px] h-full mx-auto px-8">
          <h1 className="text-center text-[#4d5a67] text-4xl">
            {t('home.testimonials.title')}
          </h1>
          <LinesWithCircleDivider />
          <p className="text-lg italic w-full max-w-screen-md text-center font-extralight text-[#8b9199] leading-8">
            {t('home.testimonials.quote')}
          </p>
          <Picture
            src="https://smartdata.tonytemplates.com/cleaning-service-v3/ele-demo2/wp-content/uploads/sites/6/2021/08/testimonial-author-1.png"
            alt="Thoroughly Cleaned"
            className="rounded-full w-32 h-auto mb-4"
            priority={false}
          />
          <p className="text-center text-[#8b9199] leading-8">
            - {t('home.testimonials.author')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
