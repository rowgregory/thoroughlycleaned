import React from 'react'

const BubbleBtn = ({ bubbleColor, text }: { bubbleColor: string; text: string }) => {
  return (
    <div className="overflow-hidden flex items-center justify-center bg-skyAqua text-white px-8 py-4 group relative z-10">
      <p className="poppins-medium uppercase group-hover:text-zinc-800 duration-500 relative z-10">
        {text}
      </p>
      <span
        className={`${bubbleColor} w-10 h-10 bottom-0 absolute z-0 rounded-full translate-x-1/2 translate-y-1/2 right-0 
        group-hover:scale-[35] duration-500 group-hover:ease-out`}
      ></span>
    </div>
  )
}

export default BubbleBtn
