'use client'

import dynamic from 'next/dynamic'
import { useFetchHomePageDataQuery } from './redux/services/textBlockApi'
const Banner = dynamic(() => import('./components/home/Banner'))
const ConnectWithUsBlock = dynamic(() => import('./components/_blocks/ConnectWithUsBlock'))
const AboutBlock = dynamic(() => import('./components/_blocks/AboutBlock'))
const ServicesBlock = dynamic(() => import('./components/_blocks/ServicesBlock'))
const WhyChooseUsBlock = dynamic(() => import('./components/_blocks/WhyChooseUsBlock'))
const Stats = dynamic(() => import('./components/home/Stats'))
const WorkingProcess = dynamic(() => import('./components/home/WorkingProcess'))
const TestimonialsBlock = dynamic(() => import('./components/_blocks/TestimonialsBlock'))
const PhotoGalleryBlock = dynamic(() => import('./components/_blocks/PhotoGalleryBlock'))
const TeamMemberBlock = dynamic(() => import('./components/_blocks/TeamMemberBlock'))

const Home = () => {
  const { data, isLoading } = useFetchHomePageDataQuery()

  return (
    <>
      <Banner textBlockMap={data?.transformedTextBlocks} />
      <ConnectWithUsBlock textBlockMap={data?.transformedTextBlocks} />
      <AboutBlock textBlockMap={data?.transformedTextBlocks?.ABOUT_BLOCK} />
      {data?.services?.length > 0 && <ServicesBlock textBlockMap={data?.transformedTextBlocks?.SERVICES_BLOCK} />}
      <WhyChooseUsBlock textBlockMap={data?.transformedTextBlocks} />
      <Stats textBlockMap={data?.transformedTextBlocks} />
      <WorkingProcess textBlockMap={data?.transformedTextBlocks} />
      {data?.teamMembers?.length > 0 && <TeamMemberBlock textBlockMap={data?.transformedTextBlocks} />}
      {data?.photoGalleryImages?.length > 0 && (
        <PhotoGalleryBlock textBlockMap={data?.transformedTextBlocks} photoGalleryImages={data?.photoGalleryImages} />
      )}
      {data?.testimonials?.length > 0 && (
        <TestimonialsBlock
          textBlockMap={data?.transformedTextBlocks.TESTIMONIALS_BLOCK}
          testimonials={data?.testimonials}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default Home
