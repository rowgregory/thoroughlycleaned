'use client';

import React from 'react';
import Picture from '../common/Picture';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { reasonsToChooseUsData } from '@/app/data/homePageData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

interface ReasonsToChooseUsProps {
  text: string;
  title: string;
}

const Reason = ({ obj }: { obj: ReasonsToChooseUsProps }) => (
  <div className="grid grid-cols-12 gap-7">
    <div className="col-span-1">
      <FontAwesomeIcon icon={faLeaf} className="text-lime-600" />
    </div>
    <div className="col-span-11">
      <h1 className="mb-5 font-black text-lg text-[#485c6a]">{obj.title}</h1>
      <p className="mb-5 text-[#727e8d] leading-7">{obj.text}</p>
    </div>
  </div>
);

const ReasonsToChooseUs = () => {
  const { t }: { t: TFunction } = useTranslation('common');

  return (
    <div className="grid grid-cols-12 gap-10 max-w-[1200px] w-full mx-auto px-8 my-40">
      <Picture
        src="/images/reasons-1.jpg"
        alt="Thoroughly Cleaned"
        className="w-full h-full col-span-12 lg:col-span-6"
        priority={false}
      />
      <div className="col-span-12 lg:col-span-6">
        <h2 className="text-[#4d5a65] text-4xl font-bold mb-5">
          {t('home.reasonsToChooseUs.title')}
        </h2>
        <p className="mb-5 text-[#727e8d] leading-7">
          {t('home.reasonsToChooseUs.commitmentDescription')}
        </p>
        {reasonsToChooseUsData(t).map(
          (obj: ReasonsToChooseUsProps, i: number) => (
            <Reason key={i} obj={obj} />
          )
        )}
      </div>
    </div>
  );
};

export default ReasonsToChooseUs;
