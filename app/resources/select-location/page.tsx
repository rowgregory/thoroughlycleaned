'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import i18n from '@/i18next'
import { selectLanguage } from '@/app/redux/features/languageSlice'
import { useAppDispatch } from '@/app/redux/store'

const countryData = [
  {
    flag: '/images/us.webp',
    lng: 'en',
    textKey: 'United States'
  },
  {
    flag: '/images/mexico.webp',
    lng: 'es',
    textKey: 'Mexico'
  },
  {
    flag: '/images/brazil.webp',
    lng: 'pt',
    textKey: 'Brazil'
  }
]

const SelectLocationPage = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation('common')

  const handleChangeLanguage = (country: any) => {
    i18n.changeLanguage(country.lng)
    dispatch(selectLanguage(country))
  }

  return (
    <div className="py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-[#15264c] text-4xl font-arial-narrow font-bold tracking-[-2px]">
          {t('resources.select-location.selectYourLocation')}
        </div>
        <div className="mt-24 border-b border-[#15264c] text-[#15264c] tracking-[2px]">
          {t('resources.select-location.americas')}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-5 md:grid-cols-4  mt-4">
          {countryData.map((country: any, i: number) => (
            <div
              onClick={() => handleChangeLanguage(country)}
              className="mb-4 md:mb-0 flex items-center cursor-pointer"
              key={i}
            >
              <Image
                src={country.flag}
                className="mr-3 w-9 h-auto"
                alt={`${i}`}
                width="0"
                height="0"
                sizes="100vw"
              />
              <div className="text-[#2e3b5d] font-light">{country.textKey}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SelectLocationPage
