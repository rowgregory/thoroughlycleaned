'use client'

import React, { useState } from 'react'
import Picture from '../common/Picture'
import AwesomeIcon from '../common/AwesomeIcon'
import { columnsIcon, timesIcon } from '@/app/icons'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { closeLightbox, nextImage, prevImage } from '@/app/redux/features/lightboxSlice'

const PublicPhotoGalleryLightBox = () => {
  const [toggleOrientation, setToggleOrientation] = useState(false)
  const { images, currentImageIndex } = useAppSelector((state: RootState) => state.lightbox)
  const dispatch = useAppDispatch()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40">
      <AwesomeIcon
        onClick={() => dispatch(closeLightbox())}
        icon={timesIcon}
        className="absolute top-4 right-4 text-white text-3xl font-bold z-50 cursor-pointer hover:text-neonIce duration-300"
      />
      <AwesomeIcon
        onClick={() => setToggleOrientation(!toggleOrientation)}
        icon={columnsIcon}
        className="absolute top-16 right-4 text-2xl text-white z-50 cursor-pointer hover:text-neonIce duration-300"
      />
      <div className={`relative w-full h-full flex ${toggleOrientation ? 'flex-col' : 'flex-row'}`}>
        <div className={`${toggleOrientation ? 'h-1/2' : 'h-full'}`}>
          <Picture src={images[currentImageIndex]?.before} alt="Before" className="h-full w-full  object-contain" priority={true} />
        </div>
        <div className={`${toggleOrientation ? 'h-1/2' : 'h-full'}`}>
          <Picture src={images[currentImageIndex]?.after} alt="After" className="h-full w-full object-contain" priority={true} />
        </div>
        <button
          type="button"
          onClick={() => dispatch(prevImage())}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl"
        >
          &#8592;
        </button>
        <button
          type="button"
          onClick={() => dispatch(nextImage())}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl"
        >
          &#8594;
        </button>
      </div>
    </div>
  )
}

export default PublicPhotoGalleryLightBox
