import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import PublicModal from '../components/common/PublicModal'
import { useUpdateTextBlockMutation } from '../redux/services/textBlockApi'
import { setCloseModalImageUploaderPublic } from '../redux/features/appSlice'
import uploadFileToFirebase from '../utils/uploadFileToFirebase'
import useSoundEffect from '../hooks/useSoundEffect'
import useForm from '../hooks/useForm'
import EditableTextAreaIcon from '../icons/EditableTextAreaIcon'
import AppleLoader from '../components/common/AppleLoader'
import Picture from '../components/common/Picture'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { arrowRightIcon } from '../icons'
import { fetchTextBlocks } from '../actions/fetch-text-blocks'
import { setTextBlocks } from '../redux/features/textBlockSlice'

interface PublicImageUploaderModalProps {
  show: boolean
  src: string
  type: string
  textBlockKey: string
}

const PublicImageUploaderModal: FC<PublicImageUploaderModalProps> = ({ show, src, type, textBlockKey }) => {
  const mediaInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const [updateText] = useUpdateTextBlockMutation()
  const { inputs, setInputs, handleUploadProgress, uploadProgress } = useForm({ src, mimeType: 'image' })
  const [loading, setLoading] = useState(false)
  const { profile } = useAppSelector((state: RootState) => state.profile)
  const { play } = useSoundEffect('/sound-effects/marimba-bloop-1.mp3', profile.isSoundEffectsOn)

  useEffect(() => {
    setInputs({ src, mimeType: 'image' })
  }, [src, setInputs])

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const file = e.target.files?.[0]
    if (!file) return

    const url = await uploadFileToFirebase(file, handleUploadProgress, 'image')

    await updateText({
      [textBlockKey]: url,
      type,
      mimeType: 'image',
      fileName: file.name
    })
      .unwrap()
      .then(async () => {
        play()
        const data = await fetchTextBlocks([type])
        dispatch(setTextBlocks(data?.transformedTextBlocks))
        setInputs({ src: url, mimeType: 'image' })
        if (mediaInputRef.current) {
          mediaInputRef.current.value = ''
        }
      })
      .catch(() => {})
    setLoading(false)
  }

  const reset = () => {
    dispatch(setCloseModalImageUploaderPublic())
    setInputs({})
    setLoading(false)
  }

  if (!show) return

  return (
    <PublicModal show={show} onClose={reset} reset={reset}>
      <div className="px-4 pt-12 480:py-20 480:mb-20 max-w-md mx-auto flex flex-col items-center justify-center w-full">
        <EditableTextAreaIcon className={`${loading ? 'animate-rotate360' : ''}`} />
        <h1 className="font-bold text-stealthGray text-xl mt-2 mb-4">Upload image</h1>
        <p className="hidden 480:block text-sm text-coolGray font-medium text-center">
          Please note that uploading a new image will automatically delete the previous one and immediately replace it with the new one.
        </p>
        <Link
          className="flex items-center gap-x-2 mb-10 mt-1.5"
          href="https://console.firebase.google.com/u/0/project/thoroughly-cleaned-66710/storage/thoroughly-cleaned-66710.firebasestorage.app/files/~2Fimages"
          target="_blank"
        >
          <span className="text-neonIce font-medium w-fit text-sm">View All Media Stored on Firebase</span>
          <AwesomeIcon icon={arrowRightIcon} className="w-4 h-4 text-neonIce -rotate-45" />
        </Link>
        <div className="border-1 border-dashed border-zinc-700 w-full p-5 h-44 flex flex-col items-center justify-center cursor-pointer hover:border-neonIce bg-zinc-50">
          {!loading ? (
            <>
              <Picture
                onClick={() => mediaInputRef?.current?.click()}
                src={inputs.src || '/images/logo.png'}
                alt="Upload Image"
                className="w-full h-full max-w-60 object-contain"
                priority={true}
                width={100}
                height={100}
              />
              <input ref={mediaInputRef} type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
            </>
          ) : (
            <>
              Upload Progress: {uploadProgress >= 0 && uploadProgress < 101 ? uploadProgress.toFixed(2) : '100'}% <AppleLoader />
            </>
          )}
        </div>
      </div>
      <div className="bg-silver mx-auto max-w-md 990:max-w-full p-3 480:py-6 480:px-5 fixed bottom-0 left-0 right-0 480:block w-full">
        <div className="flex items-center justify-between">
          <button
            onClick={() => reset()}
            type="button"
            className="bg-stealthGray hover:bg-[#38383c] py-1.5 w-36 text-white disabled:cursor-not-allowed"
          >
            Back
          </button>
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => reset()}
              type="button"
              className="min-w-36 bg-neonIce py-1.5 w-36 text-white disabled:cursor-not-allowed"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </PublicModal>
  )
}

export default PublicImageUploaderModal
