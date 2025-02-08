import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { setIsMediaReady, setOpenModalEditableVideoPublic } from '@/app/redux/features/appSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import PlayButtonSVG from '@/app/icons/PlayButtonSVG'

type EditableVideoProps = {
  show: boolean
  src: string
  type: string
  textBlockKey: string
}

const EditableVideo = forwardRef<HTMLVideoElement, EditableVideoProps>(({ src, show, type, textBlockKey }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const { isMediaReady } = useAppSelector((state: RootState) => state.app)

  // Expose the videoRef if a forwarded ref is provided.
  useImperativeHandle(ref, () => videoRef.current!)

  // Handle resizing to keep the video square
  const [size, setSize] = useState(0)

  useEffect(() => {
    const updateSize = () => {
      if (videoRef.current) {
        const parent = videoRef.current.parentElement
        if (parent) {
          const newSize = Math.min(parent.clientWidth, parent.clientHeight)
          setSize(newSize)
        }
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const [isPlaying, setIsPlaying] = useState(false)

  const handleUpdateVideo = () => {
    if (isAuthenticated) {
      dispatch(
        setOpenModalEditableVideoPublic({
          mediaData: {
            show,
            src,
            type,
            textBlockKey
          }
        })
      )
    }
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }
  const [isHovered, setIsHovered] = useState(false)
  const handlePlay = () => {
    setIsPlaying(true) // Set to true when the video starts playing
  }

  const handlePause = () => {
    setIsPlaying(false) // Set to false when the video is paused
  }
  const handleMouseEnter = () => {
    setIsHovered(true) // Show pause button on hover
  }

  const handleMouseLeave = () => {
    setIsHovered(false) // Hide pause button when mouse leaves
  }

  return (
    <div className="w-full h-full z-20 relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <video
        onLoadedData={() => dispatch(setIsMediaReady())}
        onClick={handleUpdateVideo}
        ref={videoRef}
        src={src}
        style={{ width: size, height: size }}
        className="object-cover w-full h-full"
        controls={false}
        autoPlay={false}
        loop
        muted
        playsInline
        preload="metadata"
        onPlay={handlePlay}
        onPause={handlePause}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {(isHovered || !isPlaying) && isMediaReady && (
        <div
          className={`absolute bg-silver bg-opacity-70 w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center animate-fadeIn`}
        >
          <PlayButtonSVG onClick={handlePlayPause} />
        </div>
      )}
    </div>
  )
})

EditableVideo.displayName = 'EditableVideo'

export default EditableVideo
