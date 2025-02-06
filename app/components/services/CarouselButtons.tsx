import { arrowLeftIcon, arrowRightIcon } from '@/app/icons'
import AwesomeIcon from '../common/AwesomeIcon'

export const ServicePrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="hidden 2xl:flex items-center justify-center absolute z-10 left-[-80px] top-1/2 bg-neonIce rounded-full w-12 h-12
    transform -translate-y-1/2  opacity-0 translate-x-20 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
  >
    <AwesomeIcon icon={arrowLeftIcon} className="text-stealthGray w-4 h-4" />
  </button>
)

export const ServiceNextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="hidden 2xl:flex items-center justify-center absolute z-10 right-[-80px] top-1/2 bg-neonIce rounded-full w-12 h-12
    transform -translate-y-1/2  opacity-0 -translate-x-20 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
  >
    <AwesomeIcon icon={arrowRightIcon} className="text-stealthGray w-4 h-4" />
  </button>
)
