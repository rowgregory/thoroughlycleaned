import { ProjectProps } from '@/app/types/photo-gallery.types'
import { useAppDispatch } from '@/app/redux/store'
import { openLightbox } from '@/app/redux/features/lightboxSlice'
import Picture from '../common/Picture'
import CircleWithPlusSVG from '@/app/icons/CircleWithPlusSVG'
import AbstractCircles1 from '@/app/icons/AbstractCircles1'

const PublicAlbum = ({ id, name, galleryItems, serviceType }: ProjectProps) => {
  const dispatch = useAppDispatch()

  const handleOpenLightbox = (galleryItems: any) => {
    const images = galleryItems.map((item: any) => ({
      before: item?.before?.url,
      after: item?.after?.url
    }))
    dispatch(openLightbox(images))
  }

  const galleryItemsLength = galleryItems?.length

  return (
    <div
      onClick={() => (galleryItemsLength > 0 ? handleOpenLightbox(galleryItems) : {})}
      key={id}
      className="col-span-12 760:col-span-6 1160:col-span-4 1690:col-span-4 flex flex-col justify-between aspect-square relative group overflow-hidden cursor-pointer"
    >
      <Picture src={galleryItems[0]?.after?.url} className="w-full h-full object-cover" priority={true} />
      <div
        className="group-hover:translate-y-0 transform translate-y-full transition-all duration-300 w-full bg-neonIce h-0 group-hover:h-full absolute bottom-0 left-0"
        style={{
          clipPath: 'polygon(0% 70%, 100% 50%, 100% 100%, 0% 100%)'
        }}
      >
        <div className="absolute right-10 -bottom-6">
          <AbstractCircles1 />
        </div>
      </div>
      <CircleWithPlusSVG className="absolute right-4 top-[44%] opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 transform translate-x-4 transition-all duration-300 hover:rotate-45" />

      <h1 className="text-2xl text-white font-bold absolute bottom-10 left-8 opacity-0 transform transition-all duration-300 translate-y-4 group-hover:opacity-100 group-hover:-translate-y-4 hover:text-iceberg">
        {name}
      </h1>
      <h1 className="text-white font-medium absolute bottom-3 left-8 opacity-0 transform transition-all duration-300 translate-y-4 group-hover:opacity-100 group-hover:-translate-y-4">
        {serviceType}
      </h1>
    </div>
  )
}

export default PublicAlbum
