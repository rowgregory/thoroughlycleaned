'use client'

import dynamic from 'next/dynamic'
import { RootState, useAppSelector } from './redux/store'
const ConnectWithUsBlock = dynamic(() => import('./components/_blocks/ConnectWithUsBlock'))
const AboutBlock = dynamic(() => import('./components/_blocks/AboutBlock'))
const ServicesBlock = dynamic(() => import('./components/_blocks/ServicesBlock'))
const WhyChooseUsBlock = dynamic(() => import('./components/_blocks/WhyChooseUsBlock'))
const Stats = dynamic(() => import('./components/home/Stats'))
const WorkingProcess = dynamic(() => import('./components/home/WorkingProcess'))
const TeamMemberBlock = dynamic(() => import('./components/_blocks/TeamMemberBlock'))
const PhotoGalleryBlock = dynamic(() => import('./components/_blocks/PhotoGalleryBlock'))
const TestimonialsBlock = dynamic(() => import('./components/_blocks/TestimonialsBlock'))

const Home = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  return (
    <>
      <ConnectWithUsBlock textBlockMap={textBlockMap} />
      <AboutBlock textBlockMap={textBlockMap?.ABOUT_BLOCK} />
      <ServicesBlock textBlockMap={textBlockMap?.SERVICES_BLOCK} />
      <WhyChooseUsBlock textBlockMap={textBlockMap} />
      <Stats textBlockMap={textBlockMap} />
      <WorkingProcess textBlockMap={textBlockMap} />
      <TeamMemberBlock textBlockMap={textBlockMap?.TEAM_MEMBER_BLOCK} />
      <PhotoGalleryBlock textBlockMap={textBlockMap} />
      <TestimonialsBlock textBlockMap={textBlockMap.TESTIMONIALS_BLOCK} />
    </>
  )
}

export default Home
