'use client'

import React from 'react'
import SectionHeader from '../common/SectionHeader'
import ServiceCarousel from '../ServiceCarousel'

const services = [
  {
    name: 'Residential Cleaning',
    description:
      'Thorough cleaning of homes, including dusting, vacuuming, mopping, and sanitizing surfaces.'
  },
  {
    name: 'Commercial Cleaning',
    description:
      'Professional cleaning of office spaces, ensuring a clean and welcoming environment for employees and clients.'
  },
  {
    name: 'Deep Cleaning',
    description:
      'Intensive cleaning that covers hard-to-reach places, detailed scrubbing, and sanitizing of high-touch areas.'
  },
  {
    name: 'Move-In/Move-Out Cleaning',
    description:
      'Specialized cleaning for when you’re moving into or out of a home, ensuring it’s spotless for new residents.'
  },
  {
    name: 'Post-Construction Cleaning',
    description:
      'Cleaning after construction or renovation projects, including removal of dust, debris, and finishing touches.'
  },
  {
    name: 'Window Cleaning',
    description:
      'Exterior and interior window cleaning to ensure clear, streak-free glass that enhances your home or office’s look.'
  }
]

const Services = () => {
  return (
    <div className="bg-paleBlue px-4 py-32 group">
      <div className="max-w-2xl 990:max-w-screen-xl w-full mx-auto flex flex-col items-center">
        <SectionHeader
          icon="bg-brush"
          header="What We Do"
          title="Our Most Popular Cleaning Options"
        />
        <ServiceCarousel items={services} />
      </div>
    </div>
  )
}

export default Services
