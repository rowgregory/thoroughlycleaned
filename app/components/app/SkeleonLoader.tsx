import { FC } from 'react'

interface SkeletonLoaderProps {
  className?: string
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({ className }) => {
  return <div className={`skeleton-loader ${className}`} />
}

export default SkeletonLoader
