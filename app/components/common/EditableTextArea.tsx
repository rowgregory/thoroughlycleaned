import React, { FC } from 'react'
import { setOpenModalEditableTextAreaPublic } from '@/app/redux/features/appSlice'
import { RootState, useAppSelector } from '@/app/redux/store'
import { formatPhoneNumber } from '@/app/utils/string.functions'
import { useDispatch } from 'react-redux'

type EditableTextAreaProps = {
  tag: keyof JSX.IntrinsicElements // This will allow any HTML tag like h1, h2, etc.
  initialValue: string | number
  type: string
  textBlockKey: string
  className?: string
}

const EditableTextArea: FC<EditableTextAreaProps> = ({ tag: Tag, initialValue, type, textBlockKey, className }) => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const { openModalEditableTextAreaPublic } = useAppSelector((state: RootState) => state.app)

  const handleClick = () => {
    if (isAuthenticated) {
      dispatch(
        setOpenModalEditableTextAreaPublic({
          mediaData: {
            show: openModalEditableTextAreaPublic,
            initialValue,
            type,
            textBlockKey
          }
        })
      )
    }
  }

  return (
    <Tag onClick={handleClick} className={`${className} ${isAuthenticated ? 'cursor-pointer' : 'cursor-default'} pointer-events-auto`}>
      {textBlockKey?.includes?.('PhoneNumber') ? formatPhoneNumber(String(initialValue)) : initialValue}
    </Tag>
  )
}

export default EditableTextArea
