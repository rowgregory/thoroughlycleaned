import { FC } from 'react'
import { FileInputProps } from '@/app/types/form.types'

const FileInput: FC<FileInputProps> = ({ id, label, onChange, multiple }) => {
  return (
    <div className="flex flex-col">
      <input
        multiple={multiple ?? false}
        type="file"
        id={id}
        onChange={onChange}
        className="hidden"
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  )
}

export default FileInput
