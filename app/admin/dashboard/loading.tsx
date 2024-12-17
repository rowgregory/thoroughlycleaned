'use client'

import useRemoveScroll from '@/app/hooks/useRemoveScroll'
import React from 'react'

const Loading = () => {
  useRemoveScroll(true)
  return (
    <div>
      <div className="fixed w-full inset-0 flex items-center justify-center z-50">
        <div className="the-shape" />
      </div>
    </div>
  )
}

export default Loading
