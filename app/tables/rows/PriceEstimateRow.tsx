import { PriceEstimateRowProps } from '@/app/types/common.types'
import React, { FC } from 'react'

const PriceEstimateRow: FC<PriceEstimateRowProps> = ({ data, filteredArray, i }) => (
  <tr className={`${i === filteredArray.length - 1 ? '' : 'border-b'} group h-12`}>
    <td>
      <span className="text-onyx text-13 rubik-regular px-4">{data?.name}</span>
    </td>
    <td>
      <span className="text-onyx text-13 rubik-regular px-4">{data?.phoneNumber}</span>
    </td>
    <td>
      <span className="text-onyx text-13 rubik-regular px-4">{data?.serviceType}</span>
    </td>
    <td>
      <span className="text-onyx text-13 rubik-regular px-4">{data?.createdAt}</span>
    </td>
  </tr>
)

export default PriceEstimateRow
