import React, { FC } from 'react'

interface SkeletonProps {
  className?: string
  shape?: 'rectangle' | 'circle' // Support for different shapes
}

const Skeleton: FC<SkeletonProps> = ({ className = '', shape = 'rectangle' }) => {
  const baseClasses = 'animate-shimmer bg-gray-300 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300'
  const shapeClasses = shape === 'circle' ? 'rounded-full' : 'rounded-md'

  return <div className={`${baseClasses} ${shapeClasses} ${className}`} role="status" aria-label="Loading content"></div>
}

export default Skeleton
