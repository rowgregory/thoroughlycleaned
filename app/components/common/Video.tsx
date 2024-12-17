import React, { FC } from 'react'
import ReactPlayer from 'react-player/lazy'
import { setIsVideoLoaded } from '@/app/redux/features/appSlice'
import { useAppDispatch } from '@/app/redux/store'

interface VideoProps {
  src: string
  className?: string
}

const Video: FC<VideoProps> = ({ src, className }) => {
  const dispatch = useAppDispatch()

  return (
    <div className={`${className}`}>
      <ReactPlayer
        onReady={() => dispatch(setIsVideoLoaded())}
        url={src}
        playing={true}
        muted={true}
        loop={true}
        controls={false}
        width="100%"
        height="100%"
        config={{
          file: {
            attributes: {
              preload: 'auto',
              playsInline: true
            }
          }
        }}
      />
    </div>
  )
}

export default Video
