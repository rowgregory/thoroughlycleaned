import React from 'react'
import RequestEstimateForm from '@/app/forms/RequestEstimateForm'
import { sqyshUrl } from '@/public/data/paths'
import navigationLinkData from '@/public/data/navigation-link.data'
import { contactInfo } from '@/public/data/footer-contact.data'
import ContactInfoItem from './ContactInfoItem'
import FooterNavLinkItem from './FooterNavLinkItem'
import useCustomPathname from '@/app/hooks/useCustomPathname'

const Footer = () => {
  const pathname = useCustomPathname()

  return (
    <footer className="h-full 990:h-[600px] w-full bg-skyAqua xl:bg-footer bg-cover bg-center bg-no-repeat px-4 relative">
      <div className="max-w-2xl 990:max-w-screen-xl w-full mx-auto relative z-10 pt-20">
        <div className="grid grid-cols-12 gap-y-12 990:gap-x-16 pb-[162px]">
          <div className="col-span-12 990:col-span-4">
            <div
              data-aos="fade-up"
              className="bg-logo w-36 h-28 bg-cover bg-center bg-no-repeat mb-3.5 opacity-0"
            />
            <div data-aos="fade-right" className="text-white poppins-regular">
              Exceptional Cleaning Services You Can Trust
            </div>
          </div>
          <div className="col-span-12 990:col-span-4">
            <h1 data-aos="fade-up" className="uppercase text-white poppins-semibold text-xl mb-6">
              Contact Info
            </h1>
            <div className="flex flex-col gap-y-5">
              {contactInfo.map((info, i) => (
                <ContactInfoItem key={i} info={info} i={i} />
              ))}
            </div>
          </div>
          <div className="col-span-12 990:col-span-4 xl:col-span-3 xl:col-start-10">
            <span
              data-aos="fade-up"
              className="poppins-semibold text-xl uppercase text-white xl:text-jetBlack"
            >
              Request An Estimate
            </span>
            <RequestEstimateForm
              formStyles="flex flex-col gap-y-3.5 mt-6"
              inputStyles="bg-white px-5 py-3.5 border-2 border-sunny focus:outline-none"
              selectStyles="bg-white px-5 py-3.5 text-[#adadb7] border-2 border-sunny focus:outline-none"
              buttonStyles="border-2 border-sunny xl:border-0"
            />
          </div>
        </div>
        <div className="flex py-5 990:py-0 gap-y-3 items-center justify-center flex-col 990:flex-row 990:justify-between">
          <div data-aos="fade-right" className="flex items-center order-2 990:order-1">
            <span className="poppins-regular text-jetBlack">
              Copyright &copy; {new Date().getFullYear()}
            </span>
            <span className="h-5 w-[1px] bg-jetBlack mx-3" />
            <span className="text-jetBlack" onClick={() => window.open(sqyshUrl, '_blank')}>
              SQYSH
            </span>
          </div>
          <div className="flex items-center justify-center flex-wrap gap-4 990:gap-x-12 order-1 990:order-2">
            {navigationLinkData(pathname).map((link, i) => (
              <FooterNavLinkItem key={i} link={link} i={i} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
