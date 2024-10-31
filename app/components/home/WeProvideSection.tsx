import { weProvideData } from '@/app/data/homePageData';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';

const WeProvideSection = ({ t }: any) => (
  <Fragment>
    <p className="mb-5 text-[#727e8d] leading-7 md:max-w-[400px] lg:max-w-max w-full">
      {t('home.about.provide.paragraph')}
    </p>
    <h1 className="mb-5 font-black text-lg text-[#485c6a]">
      {t('home.about.subtitles.one')}
    </h1>
    <div className="grid grid-cols-12 gap-3">
      {weProvideData(t).map((text: string, i: number) => (
        <div
          key={i}
          className="col-span-12 xl:col-span-5 flex items-center gap-3 text-wrap"
        >
          <FontAwesomeIcon icon={faCheck} className="text-lime-600" />
          <p className="text-[#727e8d]">{text}</p>
        </div>
      ))}
    </div>
  </Fragment>
);

export default WeProvideSection;
