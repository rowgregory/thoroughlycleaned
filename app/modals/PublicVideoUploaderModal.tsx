import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useAppDispatch } from '../redux/store'
import { useUpdateTextBlockMutation } from '../redux/services/textBlockApi'
import uploadFileToFirebase from '../utils/uploadFileToFirebase'
import { setCloseModalEditableVideoPublic } from '../redux/features/appSlice'
import useForm from '../hooks/useForm'
import PublicModal from '../components/common/PublicModal'
import EditableTextAreaIcon from '../icons/EditableTextAreaIcon'
import Spinner from '../components/common/Spinner'
import AppleLoader from '../components/common/AppleLoader'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { arrowRightIcon } from '../icons'

interface PublicVideoUploaderModalProps {
  show: boolean
  src: string
  type: string
  textBlockKey: string
}

const PublicVideoUploaderModal: FC<PublicVideoUploaderModalProps> = ({ show, src, type, textBlockKey }) => {
  const mediaInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const [updateText] = useUpdateTextBlockMutation()
  const { inputs, setInputs, handleUploadProgress, uploadProgress } = useForm({ src, mimeType: 'image' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setInputs({ src, mimeType: 'video' })
  }, [src, setInputs])

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const file = e.target.files?.[0]
    if (!file) return

    const url = await uploadFileToFirebase(file, handleUploadProgress, 'video')

    await updateText({
      [textBlockKey]: url,
      type,
      mimeType: 'video',
      fileName: file.name
    })
      .unwrap()
      .then(() => {
        setInputs({ src: url, mimeType: 'video' })
        if (mediaInputRef.current) {
          mediaInputRef.current.value = ''
        }
        setLoading(false)
      })
      .catch(() => {})
  }

  const reset = () => {
    dispatch(setCloseModalEditableVideoPublic())
    setInputs({})
    setLoading(false)
  }
  const [videoLoaded, setVideoLoaded] = useState(false)

  const handleVideoLoad = () => {
    setVideoLoaded(true)
  }

  if (!show) return

  return (
    <PublicModal show={show} onClose={reset} reset={reset}>
      <div className="px-4 pt-12 480:py-20 480:mb-20 max-w-md mx-auto flex flex-col items-center justify-center w-full">
        <EditableTextAreaIcon className={`${loading ? 'animate-rotate360' : ''}`} />
        <h1 className="font-medium text-jetBlack text-xl mt-2 mb-4">Upload video</h1>
        <p className="hidden 480:block text-sm text-[#7e7e7e] text-center">
          Please note that uploading a new video will automatically delete the previous one and immediately replace it with the new one.
        </p>
        <Link
          className="flex items-center gap-x-2 mb-10 mt-1.5"
          href="https://console.firebase.google.com/u/0/project/thoroughly-cleaned-66710/storage/thoroughly-cleaned-66710.firebasestorage.app/files/~2Fimages"
          target="_blank"
        >
          <span className="text-skyAqua w-fit text-sm">View All Media Stored on Firebase</span>
          <AwesomeIcon icon={arrowRightIcon} className="w-4 h-4 text-skyAqua -rotate-45" />
        </Link>
        <div className="border-1 border-dashed border-zinc-700 w-full p-5 h-44 flex flex-col items-center justify-center cursor-pointer hover:border-skyAqua bg-zinc-50">
          {!loading ? (
            <div onClick={() => mediaInputRef?.current?.click()} className="max-w-60 relative">
              <video
                src={inputs.src}
                className="object-cover w-full h-auto z-10 max-w-60 relative"
                controls={false}
                autoPlay={false}
                loop={false}
                muted
                preload="metadata"
                onCanPlay={handleVideoLoad}
              >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {!videoLoaded && (
                <Spinner
                  fill="fill-skyAqua"
                  wAndH="w-5 h-5"
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              )}

              <input ref={mediaInputRef} type="file" className="hidden" onChange={handleFileUpload} accept="video/*" />
            </div>
          ) : (
            <>
              Upload Progress: {uploadProgress >= 0 && uploadProgress < 101 ? uploadProgress.toFixed(2) : '100'}% <AppleLoader />
            </>
          )}
        </div>
      </div>
      <div className="bg-[#cfcfcf] mx-auto max-w-md 990:max-w-full p-3 480:py-6 480:px-5 fixed bottom-0 left-0 right-0 480:block w-full">
        <div className="flex items-center justify-between">
          <button
            onClick={() => reset()}
            type="button"
            className="bg-[#333336] hover:bg-[#38383c] py-1.5 w-36 text-white disabled:cursor-not-allowed"
          >
            Back
          </button>
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => reset()}
              type="button"
              className="min-w-36 bg-skyAqua py-1.5 w-36 text-white disabled:cursor-not-allowed"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </PublicModal>
  )
}

export default PublicVideoUploaderModal
