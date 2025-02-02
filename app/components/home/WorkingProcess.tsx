import React from 'react'
import SectionHeader from '../common/SectionHeader'
import { workingProcesses } from '@/public/data/home.data'
import EditableImage from '../common/EditableImage'
import EditableTextArea from '../common/EditableTextArea'

const WorkingProcess = ({ textBlockMap }: any) => {
  return (
    <section className="relative flex flex-col 1200:flex-row justify-end">
      <div className="relative 1200:absolute z-20 top-0 left-0 h-full w-full 1200:w-1/2 1200:min-h-[870px] bg-white">
        <EditableImage
          src={textBlockMap?.WORKING_PROCESS_BLOCK?.workingProcessBlockFile?.value}
          type="WORKING_PROCESS_BLOCK"
          textBlockKey="workingProcessBlockFile"
          className="object-cover w-full h-[500px] 1200:h-full"
          priority={false}
        />
      </div>
      <div className="w-full 1200:w-1/2 px-4 990:px-4 1200:pl-20 1200:min-h-[870px] flex justify-center flex-col py-44 1200:py-0">
        <div className="max-w-screen-md w-full mr-auto flex flex-col relative z-10">
          <SectionHeader
            subtitle={textBlockMap?.WORKING_PROCESS_BLOCK?.workingProcessBlockSubtitle}
            subtitleName="workingProcessBlockSubtitle"
            title={textBlockMap?.WORKING_PROCESS_BLOCK?.workingProcessBlockTitle}
            titleName="workingProcessBlockTitle"
            type="WORKING_PROCESS_BLOCK"
            rows={1}
            titleStyles="text-center 480:text-left"
          />
          <div className="flex flex-col relative gap-y-14">
            <div className="hidden sm:block bg-curvyDottedYellowLine bg-cover bg-center bg-no-repeat absolute -left-20 rotate-12 top-10 h-60 w-60 aspect-square" />
            {workingProcesses(textBlockMap).map((process, i) => (
              <div key={i} className="grid grid-cols-12 gap-x-4 relative z-10">
                <span className="col-span-12 480:col-span-2 xl:col-span-3 shadow-lg bg-sunny text-skyAqua w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center modern-antiqua-regular justify-center text-2xl sm:text-4xl mb-2 480:mb-0">
                  {process.step}
                </span>
                <div className="flex flex-col col-span-12 480:col-span-10 xl:col-span-9">
                  <EditableTextArea
                    tag="h1"
                    initialValue={process?.title}
                    type="WORKING_PROCESS_BLOCK"
                    textBlockKey={process.nameTitle}
                    className="text-xl font-semibold"
                  />
                  <EditableTextArea
                    tag="h2"
                    initialValue={process?.desc}
                    type="WORKING_PROCESS_BLOCK"
                    textBlockKey={process.nameDesc}
                    className="text-sm"
                  />
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
