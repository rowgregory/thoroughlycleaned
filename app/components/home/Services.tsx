import React from 'react'
import SectionHeader from '../common/SectionHeader'
import ServiceCarousel from '../services/ServiceCarousel'

const Services = () => {
  return (
    <section className="bg-paleBlue px-4 py-32 group">
      <div className="max-w-2xl 990:max-w-screen-xl w-full mx-auto flex flex-col items-center">
        <SectionHeader
          icon="bg-brush"
          header="What We Do"
          title="Comprehensive Cleaning Solutions Tailored to Your Needs"
          titleStyles="text-center"
        />
        <ServiceCarousel />
      </div>
    </section>
  )
}

export default Services
