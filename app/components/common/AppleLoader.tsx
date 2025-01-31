import React from 'react'

const AppleLoader = ({ width }: { width?: string }) => {
  return <div className={`${width || 'w-5'} apple-loader`}></div>
}

export default AppleLoader
