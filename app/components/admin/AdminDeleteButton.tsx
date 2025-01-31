import React from 'react'
import AppleLoader from '../common/AppleLoader'
import AwesomeIcon from '../common/AwesomeIcon'
import { trashIcon } from '@/app/icons'

const AdminDeleteButton = ({ handleDelete, item, loading, className }: any) => {
  return (
    <button
      disabled={loading}
      onClick={(e: any) => handleDelete(e, item)}
      className={`${className} bg-[#401C1C] rounded-md w-8 h-8 flex items-center justify-center aspect-square group hover:bg-[#471e1e] duration-200`}
    >
      {loading ? <AppleLoader /> : <AwesomeIcon icon={trashIcon} className="text-red-700 text-xs group-hover:text-red-600 duration-200" />}
    </button>
  )
}

export default AdminDeleteButton
