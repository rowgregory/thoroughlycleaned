'use client'

import React from 'react'
import { RootState, useAppSelector } from '../redux/store'
import Loading from '../admin/loading'
import PriceEstimateRow from './rows/PriceEstimateRow'
import PriceEstimateHead from './heads/PriceEstimateHead'
import { useFetchPriceEstimatesQuery } from '../redux/services/priceEstimateApi'

const PriceEstimatesTable = () => {
  const { filteredArray } = useAppSelector((state: RootState) => state.dashboard)
  let { isLoading } = useFetchPriceEstimatesQuery()

  if (isLoading) return <Loading />

  return (
    <table className="w-full">
      <PriceEstimateHead />
      <tbody>
        {filteredArray?.map((priceEstimate: any, i) => (
          <PriceEstimateRow key={i} data={priceEstimate} filteredArray={filteredArray} i={i} />
        ))}
      </tbody>
    </table>
  )
}

export default PriceEstimatesTable
