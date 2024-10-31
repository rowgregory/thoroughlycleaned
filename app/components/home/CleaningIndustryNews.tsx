'use client';

import { cleaningIndustryNewsData } from '@/app/data/homePageData';
import { TFunction } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LinesWithCircleDivider from '../common/LinesWithCircleDivider';

const CleaningIndustryNews = () => {
  const { t }: { t: TFunction } = useTranslation('common');

  const firstCard = t('home.cleaningIndustryNews.cards')[0];
  const secondCard = t('home.cleaningIndustryNews.cards')[1];
  const thirdCard = t('home.cleaningIndustryNews.cards')[2];

  return (
    <div className="max-w-[1200px] w-full mx-auto px-8 my-40 flex flex-col items-center">
      <h1 className="text-center text-[#4d5a67] text-4xl">
        {t('home.cleaningIndustryNews.title')}
      </h1>
      <LinesWithCircleDivider />
      <p className="text-lg w-full max-w-screen-md text-center font-extralight text-[#8b9199] leading-8">
        {t('home.cleaningIndustryNews.description')}
      </p>
      <div className="grid grid-cols-12 gap-10">
        {cleaningIndustryNewsData(firstCard, secondCard, thirdCard).map(
          (obj: any, i: number) => (
            <div key={i} className="col-span-4"></div>
          )
        )}
      </div>
    </div>
  );
};

export default CleaningIndustryNews;
