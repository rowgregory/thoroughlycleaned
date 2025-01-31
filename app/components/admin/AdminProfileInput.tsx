import { AdminProfileInputProps } from '@/app/types/admin.types'
import { adminModalInputStyles, adminProfileErrorStyles } from '@/public/data/form.styles'
import { FC } from 'react'

const AdminProfileInput: FC<AdminProfileInputProps> = ({ containerStyles, name, handleInput, label, submitted, value, error }) => {
  return (
    <div className={containerStyles}>
      <input
        name={name}
        onChange={handleInput}
        className="p-4 text-white rounded-xl bg-[#202020] border-1 border-[#6e6e73] dark-input focus:outline-none placeholder:text-[#6e6e70]"
        aria-label={label}
        placeholder={label}
        value={value || ''}
      />
      {submitted && error && <span className={adminProfileErrorStyles}>{error}</span>}
    </div>
  )
}

export default AdminProfileInput
