import React from 'react'
import PriceEstimatesTable from '@/app/tables/PriceEstimatesTable'

const PriceEstimates = () => {
  return (
    <div className="p-6 shadow-neu bg-iconShadow">
      <div className="mb-5 w-full flex items-center flex-col 990:flex-row 990:justify-between">
        <h1 className="text-lg rubik-bold text-midnightPlum">Price Estimates Table</h1>
      </div>
      <PriceEstimatesTable />
    </div>
  )
}

export default PriceEstimates
