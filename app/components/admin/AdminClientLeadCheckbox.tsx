import { FC } from 'react'

interface AdminClientLeadCheckboxProps {
  haveContacted: boolean
  serviceType: string
  id: string
  handleUpdateContacted: () => void
}

const AdminClientLeadCheckbox: FC<AdminClientLeadCheckboxProps> = ({ haveContacted, serviceType, id, handleUpdateContacted }: any) => {
  return (
    <div
      className={`${
        haveContacted
          ? serviceType === 'Biohazard'
            ? 'bg-lime-600'
            : serviceType === 'Commercial'
            ? 'bg-[#5a3a9e]'
            : 'bg-pink-600'
          : 'bg-none'
      } ${
        serviceType === 'Biohazard' ? 'border-lime-500' : serviceType === 'Commercial' ? 'border-[#845ADE]' : 'border-pink-500'
      } cursor-pointer w-4 h-4 border-[2.5px]`}
      onClick={() => handleUpdateContacted(id, !haveContacted)}
    />
  )
}

export default AdminClientLeadCheckbox
