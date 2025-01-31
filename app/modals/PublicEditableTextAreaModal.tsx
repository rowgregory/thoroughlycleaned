import React, { FC, useEffect, useRef } from 'react'
import AwesomeIcon from '../components/common/AwesomeIcon'
import Picture from '../components/common/Picture'
import { paperPlaneIcon, timesIcon } from '../icons'
import PublicModal from '../components/common/PublicModal'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import useForm from '../hooks/useForm'
import { useUpdateTextBlockMutation } from '../redux/services/textBlockApi'
import { setCloseModalEditableTextAreaPublic } from '../redux/features/appSlice'
import AppleLoader from '../components/common/AppleLoader'
import useSoundEffect from '../hooks/useSoundEffect'

interface PublicEditableTextAreaModalProps {
  show: boolean
  initialValue: string | undefined
  type: string
  textBlockKey: string
}

const PublicEditableTextAreaModal: FC<PublicEditableTextAreaModalProps> = ({ show, initialValue, type, textBlockKey }) => {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { inputs, handleInput, setInputs, setErrors, errors } = useForm({ [textBlockKey]: initialValue })
  const [updateText, { isLoading, error }] = useUpdateTextBlockMutation()
  const { profile } = useAppSelector((state: RootState) => state.profile)
  const { play } = useSoundEffect('/sound-effects/marimba-bloop-3.mp3', profile.isSoundEffectsOn)

  useEffect(() => {
    if (initialValue) {
      setInputs({ [textBlockKey]: initialValue })
    }

    if (inputRef.current instanceof HTMLInputElement) {
      inputRef.current.focus()
    }
  }, [initialValue, textBlockKey, setInputs])

  const handleUpdate = async (e: any) => {
    e.preventDefault()

    // Function to get only the changed values
    const getChangedValues = () => {
      const changedValues: Record<string, string | number | boolean> = {}
      Object.keys(inputs).forEach((key: any) => {
        if (inputs[key] !== initialValue?.[key]) {
          changedValues[key] = inputs[key]
        }
      })
      return changedValues
    }

    const changedValues = getChangedValues()

    const hasEmptyValues = Object.values(changedValues).some((value) => value === '')
    if (hasEmptyValues) {
      setErrors({ textBlock: 'Can not leave blank' })
      return
    }

    await updateText({ ...changedValues, type })
      .unwrap()
      .then(() => play())
      .catch(() => {})
  }

  const reset = (e: any) => {
    e.preventDefault()
    dispatch(setCloseModalEditableTextAreaPublic())
    setInputs({})
  }

  return (
    <PublicModal show={show} onClose={() => {}} zIndex="z-[70]">
      <div className="py-20 max-w-md mx-auto flex flex-col items-center justify-center w-full">
        <AwesomeIcon icon={timesIcon} onClick={reset} className="w-5 h-5 text-jetBlack absolute top-5 left-5 z-10 cursor-pointer" />
        <Picture
          src="/images/edit-text-modal-icon.png"
          alt="Edit Text"
          className="w-14 h-14 text-skyAqua"
          priority={false}
          width={80}
          height={80}
        />
        <h1 className="font-poppins font-medium text-jetBlack text-xl mt-5 mb-2">Edit Text Area</h1>
        <p className="text-sm text-[#7e7e7e] text-center font-poppins mb-7">
          To update the text area, simply make your changes. Click the paper icon to submit your changes. You can also click
          &quot;Back&quot; to return without saving or &quot;Done&quot; to exit the modal without saving.
        </p>
        <form onSubmit={handleUpdate} className={`grid grid-cols-12 items-end relative`}>
          <textarea
            ref={inputRef}
            rows={10}
            name={textBlockKey}
            value={(inputs[textBlockKey] as string) || ''}
            onChange={handleInput}
            className={`col-span-11 p-3 border-1 border-gray-300 bg-transparent relative focus:outline-none w-full break-words`}
          />
          <button
            disabled={isLoading}
            type="submit"
            className="col-span-1 bg-[#959595] cursor-pointer  w-10 h-10 flex items-center justify-center"
          >
            {isLoading ? <AppleLoader width="w-3" /> : <AwesomeIcon icon={paperPlaneIcon} className="w-3 h-3 text-sunny" />}
          </button>
          {(errors?.textBlock || error?.data?.message) && (
            <div className={`text-xs absolute -bottom-6 text-red-500 col-span-12`}>{errors?.textBlock || error?.data?.message}</div>
          )}
        </form>
      </div>
      <div className="bg-[#cfcfcf] mx-auto max-w-md 990:max-w-full py-6 px-5 flex items-center justify-between w-full">
        <button
          onClick={reset}
          type="button"
          className="bg-[#333336] hover:bg-[#38383c] py-1.5  w-36  font-poppins text-white disabled:cursor-not-allowed disabled:bg-zinc-800"
        >
          Back
        </button>
        <div className="flex items-center gap-x-4">
          <button
            onClick={reset}
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

export default PublicEditableTextAreaModal
