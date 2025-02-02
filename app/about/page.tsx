'use client'

import React from 'react'
import PageBanner from '../components/common/PageBanner'
import AboutBlock from '../components/_blocks/AboutBlock'
import { useFetchPageSpecificTextBlocksQuery } from '../redux/services/textBlockApi'
import ServicesBlock from '../components/_blocks/ServicesBlock'

const About = () => {
  let { isLoading, data } = useFetchPageSpecificTextBlocksQuery(['ABOUT_PAGE', 'ABOUT_BLOCK', 'SERVICES_BLOCK'])

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
      <ServicesBlock textBlockMap={data?.transformedTextBlocks?.SERVICES_BLOCK} />
    </>
  )
}

export default About
