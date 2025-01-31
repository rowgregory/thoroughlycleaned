import React, { FC, useRef } from 'react'
import Picture from './Picture'
import AwesomeIcon from './AwesomeIcon'
import { uploadIcon } from '@/app/icons'
import { DragAndDropUploaderProps } from '@/app/types/form.types'

const DragAndDropUploader: FC<DragAndDropUploaderProps> = ({ inputs, handleDrop, handleFileChange }) => {
  const inputRef = useRef(null) as any
  return (
    <>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef?.current?.click()}
        className="w-44 h-auto aspect-video rounded-md border-dashed border-2 border-gray-200 bg-white flex flex-col items-center justify-center p-4 cursor-pointer"
      >
        {inputs?.image ? (
          <Picture src={inputs?.image} alt="Uploaded" className="w-full h-full object-contain" priority={true} />
        ) : (
          <>
            <AwesomeIcon icon={uploadIcon} className="w-3.5 h-3.5 mb-1.5 text-[#333]" />
            <p className="text-sm rubik-regular text-[#333]">Drag & Drop or Click</p>
          </>
        )}
      </div>
      <input ref={inputRef} type="file" id="file-input" className="hidden" accept="image/*" onChange={handleFileChange} />
    </>
  )
}

export default DragAndDropUploader
