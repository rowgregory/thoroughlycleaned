import { faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faClock,
  faMapLocation,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

const TopSection = () => {
  const { t } = useTranslation('common');

  return (
    <div className="bg-gray-50 h-12 flex items-center">
      <div className="max-w-screen-lg mx-auto w-full flex justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faMapLocation}
              className="text-[#58cae3] w-5"
            />
            <p className="text-gray-700 text-sm">Nahant, MA 01908</p>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="text-[#58cae3] w-5" />
            <p className="text-gray-700 text-sm">7:00am - 7:00pm Mon - Fri</p>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faPhone} className="text-[#58cae3] w-5" />
            <p className="text-gray-700 text-sm">978-764-4226</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <FontAwesomeIcon icon={faFacebook} className="text-gray-700 fa-lg" />
          <FontAwesomeIcon
            icon={faXTwitter}
            className="text-gray-700 fa-lg"
            onClick={() =>
              window.open('https://twitter.com/th0roughlyclean', '_blank')
            }
          />
          <Link
            href="/quote"
            className="py-2 px-5 text-sm font-bold rounded-full bg-[#58cae3] text-white uppercase shadow-lg whitespace-nowrap"
          >
            {t('header.getAQuote')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
