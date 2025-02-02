import React from 'react'
import PieChart from './PieChart'
import { setOpenModalEditableTextAreaPublic } from '@/app/redux/features/appSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import EditableTextArea from './EditableTextArea'

const Leaf = ({ textBlockMap }: any) => {
  const dispatch = useAppDispatch()
  const { openModalEditableTextAreaPublic } = useAppSelector((state: RootState) => state.app)
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)

  const handlePieChart = () => {
    if (isAuthenticated) {
      dispatch(
        setOpenModalEditableTextAreaPublic({
          mediaData: {
            show: openModalEditableTextAreaPublic,
            initialValue: textBlockMap?.aboutBlockLeafValue,
            type: 'ABOUT_BLOCK',
            textBlockKey: 'aboutBlockLeafValue'
          }
        })
      )
    }
  }

  return (
    <div className="bg-skyAqua px-10 py-7 rounded-tl-[50px] rounded-br-[50px] absolute -bottom-6 right-1/4 760:-right-6 z-40 text-white flex items-center gap-x-4">
      <PieChart onClick={handlePieChart} percentage={textBlockMap?.aboutBlockLeafValue || '0%'} />
      <EditableTextArea
        tag="h5"
        initialValue={textBlockMap?.aboutBlockLeafText}
        type="ABOUT_BLOCK"
        textBlockKey="aboutBlockLeafText"
        className="text-xl font-semibold max-w-28"
      />
    </div>
  )
}

export default Leaf
