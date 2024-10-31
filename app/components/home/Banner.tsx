'use client';

import React, { FormEvent, Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Banner = () => {
  const { t } = useTranslation('common');
  // State for managing edit mode and the text
  const [isEditing, setIsEditing] = useState(false);
  const [bannerText, setBannerText] = useState(t('banner.text2'));

  // Handle text click to enter edit mode
  const handleTextClick = () => {
    setIsEditing(true);
  };

  // Handle input change
  const handleInputChange = (e: any) => {
    setBannerText(e.target.value);
  };

  // Handle pressing Enter to exit edit mode
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <Fragment>
      <Image
        src="/images/banner.webp"
        alt="Thoroughly Cleaned LLC"
        className="lg:h-[500px] xl:h-[750px] w-full object-cover"
        width="0"
        height="0"
        sizes="100vw"
        priority
      />
      <div className="absolute z-10 top-[144px] left-1/2 -translate-x-1/2 text-center flex-col w-full lg:h-[500px] xl:h-[750px] flex items-center justify-center bg-black/40">
        <p className="slide-down text-white text-xl tracking-wider mb-5 px-16">
          Professional Cleaning Services
        </p>
        <div className="flex items-center mb-10">
          <h1 className="scale-in text-3xl sm:text-4xl md:text-6xl text-white whitespace-nowrap font-bold uppercase">
            {isEditing ? (
              <input
                type="text"
                value={bannerText}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="bg-transparent text-white border-b-2 focus:outline-none text-center"
                autoFocus
              />
            ) : (
              <span onClick={handleTextClick}>{bannerText}...</span>
            )}
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/contact"
            className="slide-up px-10 py-2.5 text-white border-2 border-white font-bold duration-200 rounded-full"
          >
            {t('banner.text3')}
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Banner;
