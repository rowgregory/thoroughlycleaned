import { PhotoDropZoneProps } from '@/app/types/photo-gallery.types'
import React, { FC } from 'react'
import AwesomeIcon from '../common/AwesomeIcon'
import { trashIcon, uploadIcon } from '@/app/icons'
import Picture from '../common/Picture'

const PhotoDropZone: FC<PhotoDropZoneProps> = ({ setInputs, inputRef, url, name, role }) => {
  const imageRole = role?.toLowerCase()

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files

    if (files && files[0] && files[0].type.startsWith('image/') && !files[0].type.startsWith('image/heic')) {
      const reader = new FileReader()
      reader.onload = () => {
        setInputs((prev: any) => ({ ...prev, [imageRole]: { url: reader.result, file: files[0] } }))
      }
      reader.readAsDataURL(files[0])
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const files = event.target.files

    if (files && files[0] && files[0].type.startsWith('image/') && !files[0].type.startsWith('image/heic')) {
      const reader = new FileReader()
      reader.onload = () => {
        setInputs((prev: any) => ({ ...prev, [imageRole]: { url: reader.result, file: files[0] } }))
      }
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef?.current?.click()}
        className="w-full h-auto border-2 border-dotted border-[#7e7e7e] aspect-video rounded-md flex flex-col items-center justify-center p-4 cursor-pointer relative"
      >
        {url ? (
          <>
            <AwesomeIcon
              onClick={(e: any) => {
                e.stopPropagation()
                setInputs((prev: any) => ({ ...prev, [imageRole]: {} }))
              }}
              icon={trashIcon}
              className="text-red-700 text-xs absolute top-1 right-1"
            />
            <Picture src={url} alt={`Project ${name} - ${imageRole}`} className="w-full h-full object-contain max-h-16" priority={false} />
          </>
        ) : (
          <>
            <AwesomeIcon icon={uploadIcon} className="w-3.5 h-3.5 mb-1.5 text-[#7e7e7e]" />
            <p className="text-sm rubik-regular text-[#7e7e7e]">Drag & Drop or Click</p>
            <span className="text-skyAqua rubik-regular text-11">{role}</span>
          </>
        )}
      </div>
      <input ref={inputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
    </>
  )
}

export default PhotoDropZone
