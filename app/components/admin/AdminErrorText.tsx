import React, { FC } from 'react'

const AdminErrorText: FC<{ error: string }> = ({ error }) => {
  return <div className="text-xs text-red-500 font-rubik">{error}</div>
}

export default AdminErrorText
