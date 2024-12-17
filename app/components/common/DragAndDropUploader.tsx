import React, { FC } from 'react'
import AwesomeIcon from './AwesomeIcon'
import { uploadIcon } from '@/app/icons'
import Picture from './Picture'
import { DragAndDropUploaderProps } from '@/app/types/form.types'

const DragAndDropUploader: FC<DragAndDropUploaderProps> = ({ inputs, setInputs }) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const files = event.dataTransfer.files

    if (
      files &&
      files[0] &&
      files[0].type.startsWith('image/') &&
      !files[0].type.startsWith('image/heic')
    ) {
      const reader = new FileReader()
      reader.onload = () => {
        setInputs((prev: any) => ({ ...prev, image: reader.result, file: files[0] }))
      }
      reader.readAsDataURL(files[0])
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (
      files &&
      files[0] &&
      files[0].type.startsWith('image/') &&
      !files[0].type.startsWith('image/heic')
    ) {
      const reader = new FileReader()
      reader.onload = () => {
        setInputs((prev: any) => ({ ...prev, image: reader.result, file: files[0] }))
      }
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
        className="w-64 h-auto aspect-video rounded-md mb-9 border-dashed border-2 border-gray-200 bg-white flex flex-col items-center justify-center p-4 cursor-pointer"
      >
        {inputs?.image ? (
          <Picture
            src={inputs?.image as string}
            alt="Uploaded"
            className="max-w-full max-h-full"
            priority={false}
          />
        ) : (
          <>
            <AwesomeIcon icon={uploadIcon} className="w-3.5 h-3.5 mb-1.5 text-[#333]" />
            <p className="text-sm rubik-regular text-[#333]">Click</p>
          </>
        )}
      </div>
      <input
        type="file"
        id="file-input"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default DragAndDropUploader
