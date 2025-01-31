import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import PublicModal from '../components/common/PublicModal'
import { useUpdateTextBlockMutation } from '../redux/services/textBlockApi'
import useForm from '../hooks/useForm'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { arrowRightIcon, timesIcon } from '../icons'
import AppleLoader from '../components/common/AppleLoader'
import Picture from '../components/common/Picture'
import Link from 'next/link'
import uploadFileToFirebase from '../utils/uploadFileToFirebase'
import { useAppDispatch } from '../redux/store'
import { setCloseModalEditableVideoPublic } from '../redux/features/appSlice'
import ReactPlayer from 'react-player'

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

  if (!show) return

  return (
    <PublicModal show={show} onClose={reset}>
      <div className="py-20 max-w-md mx-auto flex flex-col items-center justify-center h-full w-full">
        <AwesomeIcon icon={timesIcon} onClick={() => reset()} className="w-5 h-5 text-jetBlack absolute top-5 left-5 z-10 cursor-pointer" />
        <Picture
          src="/images/upload-image-modal.png"
          alt="Upload an Image"
          className="w-14 h-14 text-skyAqua"
          priority={false}
          width={80}
          height={80}
        />
        <h1 className="font-poppins font-medium text-jetBlack text-xl mt-5 mb-2"> Upload video</h1>
        <p className="text-sm text-[#7e7e7e] text-center font-poppins">
          Please note that uploading a new video will automatically delete the previous one and immediately replace it with the new one.
        </p>
        <p>
          <Link
            className="flex items-center gap-x-2 mb-10 mt-1.5"
            href="https://console.firebase.google.com/u/0/project/thoroughly-cleaned-66710/storage/thoroughly-cleaned-66710.firebasestorage.app/files/~2Fimages"
            target="_blank"
          >
            <span className="text-skyAqua font-poppins text-left w-fit">View All Media Stored on Firebase</span>
            <AwesomeIcon icon={arrowRightIcon} className="w-4 h-4 text-skyAqua -rotate-45" />
          </Link>
        </p>
        <div className="border-1 border-dashed border-zinc-700 w-full p-5 h-44 flex flex-col items-center justify-center cursor-pointer hover:border-skyAqua bg-zinc-50">
          {!loading ? (
            <div onClick={() => mediaInputRef?.current?.click()} className="max-w-40">
              <ReactPlayer
                // onReady={() => dispatch(setIsMediaReady())}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: 'auto',
                  zIndex: 10,
                  maxWidth: '160px'
                }}
                playing={false}
                url={inputs.src}
                muted={true}
                loop={true}
                controls={true}
                width={300}
                height={170}
                config={{
                  file: {
                    attributes: {
                      preload: 'auto',
                      playsInline: true
                    }
                  }
                }}
              />
              <input ref={mediaInputRef} type="file" className="hidden" onChange={handleFileUpload} accept="video/*" />
            </div>
          ) : (
            <>
              Upload Progress: {uploadProgress >= 0 && uploadProgress < 101 ? uploadProgress.toFixed(2) : '100'}% <AppleLoader />
            </>
          )}
        </div>
      </div>
      <div className="bg-[#cfcfcf] py-6 px-5 flex items-center justify-between w-full">
        <button
          onClick={() => reset()}
          type="button"
          className="bg-[#333336] hover:bg-[#38383c] py-1.5  w-36  font-poppins text-white disabled:cursor-not-allowed disabled:bg-zinc-800"
        >
          Back
        </button>
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => reset()}
            type="button"
            className="hover:bg-neonSkyAqua bg-skyAqua py-1.5 w-36 font-poppins text-white disabled:cursor-not-allowed disabled:bg-sky-700"
          >
            Done
          </button>
        </div>
      </div>
    </PublicModal>
  )
}

export default PublicVideoUploaderModal
