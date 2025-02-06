import { adminModalInputStyles } from '@/public/data/form.styles'
import React, { FC, KeyboardEvent, useState } from 'react'
import AppleLoader from './AppleLoader'
import AwesomeIcon from './AwesomeIcon'
import { circleRightIcon, eyeIcon, eyeSlashIcon } from '@/app/icons'

interface PublicAuthInputProps {
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputValue: any
  loading: boolean
  onClick: (e: any) => void
  submitted: boolean
  error: string
  name: string
  label: string
}

const PublicAuthInput: FC<PublicAuthInputProps> = ({ handleInput, inputValue, loading, onClick, submitted, error, name, label }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onClick(e)
    }
  }
  return (
    <div className="flex flex-col mb-7 w-full relative">
      <input
        type={name === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
        name={name}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        value={inputValue || ''}
        className={`${adminModalInputStyles} dark-input bg-[#202020] border-1 border-[#424245] text-white`}
        aria-label={`Enter ${label}`}
        placeholder={`Enter ${label}`}
      />
      {loading ? (
        <div className="absolute right-2 top-[18px] w-6 h-6 z-20">
          <AppleLoader width="w-6" />
        </div>
      ) : (
        <AwesomeIcon
          onClick={onClick}
          icon={circleRightIcon}
          className="absolute right-2 top-[18px] w-6 h-6 text-[#424245] z-20 cursor-pointer duration-100 hover:text-iceberg"
        />
      )}
      {name === 'password' && (
        <AwesomeIcon
          onClick={() => setShowPassword(!showPassword)}
          icon={!showPassword ? eyeSlashIcon : eyeIcon}
          className="w-4 h-4 absolute -right-6 top-[22px] text-[#424245] cursor-pointer"
        />
      )}
      {submitted && error && <span className="text-red-500 flex self-end mt-1 text-11 absolute -bottom-5 animate-fadeIn">{error}</span>}
    </div>
  )
}

export default PublicAuthInput
