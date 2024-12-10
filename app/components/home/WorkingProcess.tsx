import React from 'react'
import SectionHeader from '../common/SectionHeader'

const workingProcesses = [
  {
    step: '1',
    title: 'Submit Your Request',
    text: 'Enter your name, number, and preferred service online.'
  },
  {
    step: '2',
    title: 'Admin Notification',
    text: 'Your details are sent to our team, and we promptly get in touch.'
  },
  {
    step: '3',
    title: 'Personalized Follow-Up',
    text: 'We discuss your needs and schedule your cleaning service.'
  }
]

const WorkingProcess = () => {
  return (
    <section>
      <div className="max-w-2xl 990:max-w-screen-xl w-full mx-auto flex flex-col 1200:flex-row">
        <div className="h-auto min-h-[600px] w-full 1200:w-1/2">
          <div className="bg-workingProcess bg-cover bg-center bg-no-repeat h-full w-full 1200:w-1/2 min-h-[600px] max-h-[600px] 1200:max-h-[860px] absolute left-0" />
        </div>
        <div className="flex-1 px-4 1200:pr-0 1200:pl-20 py-44">
          <SectionHeader
            icon="bg-brush"
            header="Scheduling Made Simple"
            title="Easy Steps to Book Your Appointment"
          />
          <div className="flex flex-col relative gap-y-14">
            <div className="hidden sm:block bg-curvyDottedYellowLine bg-cover bg-center bg-no-repeat absolute -left-20 rotate-12 top-10 h-60 w-60 aspect-square" />
            {workingProcesses.map((process, i) => (
              <div
                data-aos="fade-up"
                data-aos-delay={i * 100}
                key={i}
                className="grid grid-cols-12 gap-x-4 relative z-10"
              >
                <span className="col-span-2 xl:col-span-3 shadow-lg bg-sunny text-skyAqua w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center modern-antiqua-regular justify-center text-2xl sm:text-4xl">
                  {process.step}
                </span>
                <div className="flex flex-col col-span-10 xl:col-span-9">
                  <span className="text-xl poppins-semibold mb-3">{process.title}</span>
                  <span className="text-sm poppins-regular">{process.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkingProcess
