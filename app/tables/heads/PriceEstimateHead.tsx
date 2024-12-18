import React from 'react'
import { useAppDispatch } from '@/app/redux/store'
import { sortTable } from '@/app/redux/features/dashboardSlice'
import { tableStyles } from '@/public/data/table.styles'

const PriceEstimateHead = () => {
  const dispatch = useAppDispatch()
  const handleSort = (key: string) => dispatch(sortTable({ key }))

  return (
    <thead className="whitespace-nowrap px-4 pb-4 pt-2">
      <tr className="border-b">
        <th className="px-4 py-3" onClick={() => handleSort('name')}>
          <div className={tableStyles.div}>Name</div>
        </th>
        <th className="px-4 py-3">
          <div className={tableStyles.div}>Phone Number</div>
        </th>
        <th className="px-4 py-3" onClick={() => handleSort('serviceType')}>
          <div className={tableStyles.div}>Service Type</div>
        </th>
        <th className="px-4 py-3" onClick={() => handleSort('createdAt')}>
          <div className={tableStyles.div}>Date Added</div>
        </th>
      </tr>
    </thead>
  )
}

export default PriceEstimateHead
