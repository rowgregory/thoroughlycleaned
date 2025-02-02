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
    <div className="bg-skyAqua px-5 760:px-10 py-5 760:py-7 rounded-tl-[50px] rounded-br-[50px] absolute -bottom-20 480:-bottom-6 -translate-x-1/2 760:translate-x-0 left-1/2 760:left-auto 760:-right-6 z-40 text-white items-center gap-x-4 grid 760:flex grid-cols-12 w-full 480:w-[80%] 760:w-auto">
      <div className="col-span-6">
        <PieChart onClick={handlePieChart} percentage={textBlockMap?.aboutBlockLeafValue} />
      </div>
      <EditableTextArea
        tag="h5"
        initialValue={textBlockMap?.aboutBlockLeafText}
        type="ABOUT_BLOCK"
        textBlockKey="aboutBlockLeafText"
        className="text-xl font-semibold col-span-6"
      />
    </div>
  )
}

export default Leaf
