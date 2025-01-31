import { setOpenModalImageUploaderPublic } from '@/app/redux/features/appSlice'
import { RootState, useAppSelector } from '@/app/redux/store'
import React from 'react'
import { useDispatch } from 'react-redux'
import Picture from './Picture'

type EditableImageProps = {
  src: string
  type: string
  textBlockKey: string
  className: string
  priority: boolean
}

const EditableImage: React.FC<EditableImageProps> = ({ src, type, textBlockKey, className, priority }) => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const { openModalImageUploaderPublic } = useAppSelector((state: RootState) => state.app)

  const handleClick = () => {
    if (isAuthenticated) {
      dispatch(
        setOpenModalImageUploaderPublic({
          mediaData: {
            show: openModalImageUploaderPublic,
            src,
            type,
            textBlockKey
          }
        })
      )
    }
  }
  if (!src) return
  return (
    <Picture
      src={src}
      alt="Thoroughly Cleaned, LLC"
      className={className}
      priority={priority}
      onClick={handleClick}
      width={200}
      height={200}
    />
  )
}

export default EditableImage
