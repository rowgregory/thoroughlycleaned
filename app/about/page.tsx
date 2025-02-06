'use client'

import React from 'react'
import PageBanner from '../components/common/PageBanner'
import AboutBlock from '../components/_blocks/AboutBlock'
import ServicesBlock from '../components/_blocks/ServicesBlock'
import TeamMemberBlock from '../components/_blocks/TeamMemberBlock'
import { RootState, useAppSelector } from '../redux/store'

const About = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  return (
    <>
      <PageBanner
        type="ABOUT_PAGE"
        fileNameKey="aboutPageFile"
        titleNameKey="aboutPageTitle"
        subtitleNameKey="aboutPageSubtitle"
        textBlockMap={textBlockMap}
      />
      <AboutBlock textBlockMap={textBlockMap?.ABOUT_BLOCK} />
      <TeamMemberBlock textBlockMap={textBlockMap?.TEAM_MEMBER_BLOCK} />
      <ServicesBlock textBlockMap={textBlockMap?.SERVICES_BLOCK} />
    </>
  )
}

export default About
