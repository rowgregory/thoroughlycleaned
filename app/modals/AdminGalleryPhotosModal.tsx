import React, { FormEvent, useRef, useState } from 'react'
import AdminModal from '../components/common/AdminModal'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { arrowRightIcon, timesIcon } from '../icons'
import {
  useCreateAndAttachPhotoGalleryImageMutation,
  useDeletePhotoGalleryProjectPairMutation
} from '../redux/services/photoGalleryImageApi'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { ADMIN_PHOTOS_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import validatePhotoGalleryProjectForm from '../validations/validatePhotoGalleryProjectForm'
import useForm from '../hooks/useForm'
import { closeGalleryPhotosModal, openGalleryDetailsUpdateModal, resetGallery } from '../redux/features/photoGallerySlice'
import uploadFileToFirebase from '../utils/uploadFileToFirebase'
import PhotoDropZone from '../components/photo-gallery/PhotoDropZone'
import AdminFormFooter from '../components/admin/AdminFormFooter'
import AdminDeleteButton from '../components/admin/AdminDeleteButton'

const AdminGalleryPhotosModal = () => {
  const dispatch = useAppDispatch()
  const inputRefOne = useRef(null) as any
  const inputRefTwo = useRef(null) as any
  const [deletePhotoGalleryProjectPair, { error: errorDeletingPhotoPair }] = useDeletePhotoGalleryProjectPairMutation()
  const [createAndAttachPhotoGalleryImage, { error: errorCreatingImagePair }] = useCreateAndAttachPhotoGalleryImageMutation()
  const [loadingPair, setLoadingPair] = useState<Record<string, boolean>>({})
  const { project, openModalGalleryPhotos } = useAppSelector((state: RootState) => state.photoGallery)
  const { inputs, setInputs, handleUploadProgress } = useForm(ADMIN_PHOTOS_INITIAL_FIELDS, validatePhotoGalleryProjectForm, project)
  const [galleryItemId, setGalleryItemId] = useState('')
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const handleDelete = async (e: any, item: any) => {
    e.preventDefault()
    setLoadingPair((prev) => ({ ...prev, [item.id]: true }))

    await deletePhotoGalleryProjectPair({
      projectId: project.id,
      galleryItemId: item.id,
      beforeFileName: item.before.fileName,
      afterFileName: item.after.fileName
    })
      .unwrap()
      .catch((err: any) => setGalleryItemId(err?.data?.galleryItemId))

    setLoadingPair((prev) => ({ ...prev, [item.id]: false }))
  }

  const reset = (e: FormEvent) => {
    e.preventDefault()
    dispatch(resetGallery())
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoadingSubmit(true)

    const images = [
      { file: inputs.before.file, role: 'before' },
      { file: inputs.after.file, role: 'after' }
    ]

    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const url = await uploadFileToFirebase(image.file, handleUploadProgress, 'image')
        return {
          url,
          fileName: image.file.name,
          imageRole: image.role
        }
      })
    )

    const combinedPhotos = uploadedImages.reduce(
      (acc: any, curr) => {
        if (curr.imageRole === 'before') {
          acc.before = curr
        } else if (curr.imageRole === 'after') {
          acc.after = curr
        }
        return acc
      },
      { before: null, after: null }
    )

    await createAndAttachPhotoGalleryImage({ combinedPhotos, projectId: project.id })
      .unwrap()
      .then(() => setInputs((prev: any) => ({ ...prev, before: {}, after: {} })))
      .catch(() => {})

    setLoadingSubmit(false)
  }

  return (
    <AdminModal show={openModalGalleryPhotos}>
      <AwesomeIcon icon={timesIcon} onClick={reset} className="w-5 h-5 text-white absolute top-5 left-5 z-10 cursor-pointer" />
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full pb-20 990:pb-0">
        <div className="py-20 max-w-md mx-auto flex flex-col h-full w-full">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <h1 className="rubik-regular text-white text-xl mt-5 mb-2">Manage Album Photo Pairs</h1>
            <p className="text-sm text-[#7e7e7e] text-center rubik-regular">
              Organize your cleaning project albums by adding or managing before-and-after photo pairs. You can upload new photos,
              categorize them as &apos;Before&apos; or &apos;After,&apos; and easily delete any photo pairs you no longer need.
            </p>
            <div className="flex items-center gap-x-2 mb-10 mt-1.5">
              <button
                type="button"
                onClick={() => {
                  setInputs({ id: project.id, name: project?.name, serviceType: project?.serviceType })
                  dispatch(openGalleryDetailsUpdateModal(project))
                  dispatch(closeGalleryPhotosModal())
                }}
                className="text-iceberg rubik-regular text-left w-fit"
              >
                Edit Album Title & Service Type
              </button>
              <AwesomeIcon icon={arrowRightIcon} className="w-4 h-4 text-iceberg -rotate-45" />
            </div>
          </div>
          <div className="flex flex-col 990:flex-row gap-y-7">
            <div className="w-full 990:w-1/2 990:pr-10">
              <div className="flex flex-row 990:flex-col gap-0.5 990:gap-6">
                <PhotoDropZone setInputs={setInputs} inputRef={inputRefOne} url={inputs?.before?.url} name={inputs?.name} role="Before" />
                <PhotoDropZone setInputs={setInputs} inputRef={inputRefTwo} url={inputs?.after?.url} name={inputs?.name} role="After" />
              </div>
            </div>
            <div className="w-full 990:w-1/2 990:pl-6 border-l-[0.5px] border-l-[#363636]">
              {project?.galleryItems?.map((item: any) => (
                <div key={item.id} className="grid grid-cols-12 gap-0.5 hover:bg-[#38383c] rounded-lg relative mb-2">
                  <AdminDeleteButton
                    handleDelete={handleDelete}
                    item={item}
                    loading={loadingPair[item.id]}
                    className="absolute right-4 990:-right-10 top-4 990:top-2"
                  />
                  <div
                    style={{ backgroundImage: `url(${item?.before?.url})` }}
                    className="col-span-6 bg-cover bg-no-repeat bg-center aspect-video"
                  />
                  <div
                    style={{ backgroundImage: `url(${item?.after?.url})` }}
                    className="col-span-6 bg-cover bg-no-repeat bg-center aspect-video"
                  />
                  {errorDeletingPhotoPair?.data?.message && item.id === galleryItemId && (
                    <div className="col-span-12 text-red-500 text-[10px]">{errorDeletingPhotoPair?.data?.message}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <AdminFormFooter
          reset={reset}
          isUpdating={true}
          type="Album"
          loading={loadingSubmit}
          error={errorCreatingImagePair?.data?.message}
        />
      </form>
    </AdminModal>
  )
}

export default AdminGalleryPhotosModal
