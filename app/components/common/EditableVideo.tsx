import { setIsMediaReady, setOpenModalEditableVideoPublic } from '@/app/redux/features/appSlice'
import { RootState, useAppSelector } from '@/app/redux/store'
import React from 'react'
import { useDispatch } from 'react-redux'
import ReactPlayer from 'react-player'

type EditableVideoProps = {
  show: boolean
  src: string
  type: string
  textBlockKey: string
  play: boolean
}

const EditableVideo: React.FC<EditableVideoProps> = ({ show, src, type, textBlockKey, play }) => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)

  const handleClick = () => {
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

  return (
    <div onClick={handleClick} className="relative z-20">
      <ReactPlayer
        onReady={() => dispatch(setIsMediaReady())}
        style={{ objectFit: 'cover', width: '100%', height: '100%', aspectRatio: '1/1' }}
        playing={play}
        url={src}
        muted={true}
        loop={true}
        controls={true}
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

export default EditableVideo
