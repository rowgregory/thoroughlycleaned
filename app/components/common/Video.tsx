import React, { FC } from 'react'
import { VideoProps } from '@/app/types/common-types'

const Video: FC<VideoProps> = ({ videoRef, src, className }) => {
  return (
    <video
      ref={videoRef}
      className={`fade-in ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default Video
