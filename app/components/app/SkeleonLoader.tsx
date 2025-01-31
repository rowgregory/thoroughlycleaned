import { FC } from 'react'

interface SkeletonLoaderProps {
  h?: string
  w?: string
  mw?: string
  borderRadius?: string
  mr?: string
  maxw?: string
  mt?: string
  ar?: string
  className?: string
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({
  h = '',
  w = '100%',
  mw = '',
  borderRadius = '',
  mr = '',
  maxw = '',
  mt = '',
  ar = '1/1',
  className
}) => {
  return (
    <div
      className={`skeleton-loader ${className}`}
      style={{
        height: h,
        width: w,
        minWidth: mw,
        borderRadius: borderRadius,
        maxWidth: maxw,
        marginRight: mr,
        marginTop: mt,
        aspectRatio: ar
      }}
    />
  )
}

export default SkeletonLoader
