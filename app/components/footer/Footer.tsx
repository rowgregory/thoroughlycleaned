import React from 'react'
import FooterTop from './FooterTop'
import FooterBottom from './FooterBottom'
import dynamic from 'next/dynamic'
import { RootState, useAppSelector } from '@/app/redux/store'
const ConnectWithUsBlock = dynamic(() => import('../../components/_blocks/ConnectWithUsBlock'))

const Footer = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  return (
    <footer className="h-full w-full relative z-0">
      <ConnectWithUsBlock textBlockMap={textBlockMap} />
      <div className="px-4 lg:px-12 xl:px-4 pb-3 pt-20 relative bg-neonIce xl:bg-footer bg-cover bg-center bg-no-repeat">
        <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] w-full mx-auto">
          <FooterTop textBlockMap={textBlockMap} />
          <div className="hidden xl:block">
            <FooterBottom />
          </div>
        </div>
      </div>
      <div className="px-4 lg:px-12 xl:px-4 py-4 bg-stealthGray xl:bg-none block xl:hidden">
        <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] w-full mx-auto">
          <FooterBottom />
        </div>
      </div>
    </footer>
  )
}

export default Footer
