import React, { FC } from 'react'
import Link from 'next/link'
import { Edit, Trash } from '@/app/icons'
import { RowProps } from '@/app/types/common.types'

const ServiceRow: FC<RowProps> = ({ data, onDelete, filteredArray, i }) => (
  <tr
    className={`${
      i === filteredArray.length - 1 ? '' : 'border-b'
    } group h-12 [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100`}
  >
    <td>
      <span className="text-onyx text-13 rubik-regular px-4">{data?.name}</span>
    </td>
    <td>
      <span className="text-onyx text-13 rubik-regular px-4">{data?.createdAt}</span>
    </td>
    <td>
      <Link href={`/admin/services/${data?.id}`} className="text-onyx text-13 rubik-regular px-4">
        <Edit />
      </Link>
    </td>
    <td>
      <span onClick={(e) => onDelete(e, data.id)} className="text-onyx text-13 rubik-regular px-4">
        <Trash />
      </span>
    </td>
  </tr>
)

export default ServiceRow
