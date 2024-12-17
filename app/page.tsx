'use client'

import dynamic from 'next/dynamic'

const Banner = dynamic(() => import('./components/home/Banner'), { ssr: false })
const RequestEstimate = dynamic(() => import('./components/home/RequestEstimate'), { ssr: false })
const About = dynamic(() => import('./components/home/About'), { ssr: false })
const Services = dynamic(() => import('./components/home/Services'), { ssr: false })
const WhyChooseUs = dynamic(() => import('./components/home/WhyChooseUs'), { ssr: false })
const Stats = dynamic(() => import('./components/home/Stats'), { ssr: false })
const WorkingProcess = dynamic(() => import('./components/home/WorkingProcess'), { ssr: false })
const Testimonials = dynamic(() => import('./components/home/Testimonials'), { ssr: false })
const CompletedProjects = dynamic(() => import('./components/home/CompletedProjects'), {
  ssr: false
})

const Home = () => {
  return (
    <>
      <Banner />
      <RequestEstimate />
      <About />
      <Services />
      <WhyChooseUs />
      <Stats />
      <WorkingProcess />
      <Testimonials />
      <CompletedProjects />
    </>
  )
}

export default Home
