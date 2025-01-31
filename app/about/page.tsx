'use client'

import React from 'react'
import PageBanner from '../components/common/PageBanner'
import AboutBlock from '../components/_blocks/AboutBlock'
import { useFetchPageSpecificTextBlocksQuery } from '../redux/services/textBlockApi'

const About = () => {
  const { isLoading, data } = useFetchPageSpecificTextBlocksQuery(['ABOUT_PAGE', 'ABOUT_BLOCK'])

  return (
    <>
      <PageBanner
        type="ABOUT_PAGE"
        fileNameKey="aboutPageFile"
        titleNameKey="aboutPageTitle"
        subtitleNameKey="aboutPageSubtitle"
        textBlockMap={data?.transformedTextBlocks}
        isLoading={isLoading}
      />
      <AboutBlock textBlockMap={data?.transformedTextBlocks?.ABOUT_BLOCK} isLoading={isLoading} />
    </>
  )
}

export default About
