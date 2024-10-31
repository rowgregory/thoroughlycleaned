import {
  faBuilding,
  faHome,
  faPersonThroughWindow,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import LinesWithCircleDivider from '../common/LinesWithCircleDivider';

const ourCleaningServicesData = [
  {
    icon: faPersonThroughWindow,
    title: 'Window Cleaning',
    text1: 'Carpet Cleaning',
    text2: 'Dust all furniture',
    text3: 'Hard surface floor cleaning',
  },
  {
    icon: faBuilding,
    title: 'Commercial Cleaning',
    text1: 'Tile & grout cleaning',
    text2: 'Carpet cleaning',
    text3: 'Hard surface cleaning',
  },
  {
    icon: faHome,
    title: 'Residential Cleaning',
    text1: 'Hard surface cleaning',
    text2: 'Carpet cleaning',
    text3: 'Upholstry cleaning',
  },
];

const OurCleaningServices = () => {
  return (
    <div className="my-20 mx-auto max-w-screen-lg">
      <h1 className="text-center text-4xl text-[#4b5a67] font-bold">
        Our Cleaning Services
      </h1>
      <LinesWithCircleDivider />
      <p className="text-center text-[#657a8c] max-w-screen-sm w-full mx-auto">
        Let us use our years of experience, skilled employees, and advanced
        procedures to ensure a clean and healthy environment for your employees,
        customers and guests.
      </p>
      <div className="grid grid-cols-12">
        {ourCleaningServicesData.map((obj: any, i: number) => (
          <div
            key={i}
            className="col-span-12 md:col-span-4 h-[375px] p-6 shadow-lg rounded-md flex flex-col items-center"
          >
            <FontAwesomeIcon
              icon={obj.icon}
              className="w-16 h-16 text-[#58cae3] mb-8"
            />
            <p className="font-bold text-lg mb-3">{obj.title}</p>
            <p className="font-light mb-1 text-sm">{obj.text1}</p>
            <p className="font-light mb-1 text-sm">{obj.text2}</p>
            <p className="font-light mb-1 text-sm">{obj.text3}</p>
            <Link
              href="/"
              className="border-2  rounded-full border-[#58cae3] text-[#58cae3] px-6 py-2 mt-4"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurCleaningServices;
