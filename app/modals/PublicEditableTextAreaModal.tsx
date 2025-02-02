import React, { FC, useEffect, useRef, useState } from 'react'
import PublicModal from '../components/common/PublicModal'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import useForm from '../hooks/useForm'
import { useUpdateTextBlockMutation } from '../redux/services/textBlockApi'
import { setCloseModalEditableTextAreaPublic } from '../redux/features/appSlice'
import useSoundEffect from '../hooks/useSoundEffect'
import EditableTextAreaIcon from '../icons/EditableTextAreaIcon'
import Spinner from '../components/common/Spinner'

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
  const [updateText, { error }] = useUpdateTextBlockMutation()
  const { profile } = useAppSelector((state: RootState) => state.profile)
  const { play } = useSoundEffect('/sound-effects/marimba-bloop-3.mp3', profile.isSoundEffectsOn)
  const [loading, setLoading] = useState(false)

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
    setLoading(true)

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
      .then(() => {
        play()
        dispatch(setCloseModalEditableTextAreaPublic())
      })
      .catch(() => {})
    setLoading(false)
  }

  const reset = (e: any) => {
    e.preventDefault()
    dispatch(setCloseModalEditableTextAreaPublic())
    setInputs({})
  }

  return (
    <PublicModal show={show} onClose={reset} reset={reset}>
      <div className="px-4 pt-12 480:py-20 480:mb-20 max-w-md mx-auto flex flex-col items-center justify-center w-full">
        <EditableTextAreaIcon className={`${loading ? 'animate-rotate360' : ''}`} />
        <h1 className="font-medium text-jetBlack text-xl mt-2 mb-4">Edit Text Area</h1>
        <form onSubmit={handleUpdate} className="w-full grid grid-cols-12 items-end relative">
          <textarea
            ref={inputRef}
            rows={8}
            name={textBlockKey}
            value={(inputs[textBlockKey] as string) || ''}
            onChange={handleInput}
            className={`col-span-12 p-3 border-1 border-gray-300 bg-transparent relative focus:outline-none w-full break-words`}
          />
          {(errors?.textBlock || error?.data?.message) && (
            <div className={`text-xs absolute -bottom-6 text-red-500 col-span-12`}>{errors?.textBlock || error?.data?.message}</div>
          )}
        </form>
      </div>
      <div
        className="bg-[#cfcfcf] mx-auto max-w-md 990:max-w-full p-3 480:py-6 480:px-5 fixed bottom-0 left-0 right-0 480:block w-full"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={reset}
            disabled={loading}
            type="button"
            className="bg-[#333336] hover:bg-[#38383c] py-1.5  w-36  text-white disabled:cursor-not-allowed"
          >
            Back
          </button>
          <div className="flex items-center gap-x-4">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="min-w-36 bg-skyAqua py-1.5 w-36 text-white disabled:cursor-not-allowed"
            >
              {loading ? <Spinner wAndH="w-4 h-4" fill="fill-sunny" /> : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </PublicModal>
  )
}

export default PublicEditableTextAreaModal
