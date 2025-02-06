import React, { useEffect, useState } from 'react'

const BubbleOne = () => {
  const [leftPosition, setLeftPosition] = useState<string>('')

  useEffect(() => {
    const randomLeft = Math.random() * 100
    setLeftPosition(`${randomLeft}%`)
  }, [])
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/400/svg"
      className="absolute -bottom-10 animate-float-blob-1"
      style={{ left: leftPosition }}
    >
      <path
        fill="#00B8D9"
        d="M59.7,-22.2C66.9,2.5,54.8,30.7,33.2,46.6C11.6,62.6,-19.6,66.2,-40.4,52C-61.2,37.7,-71.6,5.5,-63.1,-21C-54.7,-47.5,-27.3,-68.4,-0.5,-68.3C26.3,-68.1,52.6,-46.9,59.7,-22.2Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}
const BubbleTwo = () => {
  const [leftPosition, setLeftPosition] = useState<string>('')

  useEffect(() => {
    const randomLeft = Math.random() * 100
    setLeftPosition(`${randomLeft}%`)
  }, [])

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -bottom-10 animate-float-blob-2"
      style={{ left: leftPosition }}
    >
      <path
        fill="#00B8D9"
        d="M64.8,-23.2C72.3,2,58.6,31.9,36.5,47.3C14.4,62.6,-16.1,63.4,-38.3,48.4C-60.4,33.3,-74.1,2.4,-66.3,-23.2C-58.6,-48.8,-29.3,-69.1,-0.3,-69C28.7,-68.9,57.3,-48.4,64.8,-23.2Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

const BubbleBtn = ({ bubbleColor, text }: { bubbleColor: string; text: string }) => {
  return (
    <div className="overflow-hidden flex items-center justify-center bg-neonIce text-white px-8 py-4 group relative z-10 w-full">
      <p className="font-medium duration-300 relative z-10">{text}</p>
      <BubbleOne />
      <BubbleTwo />
      <span
        className={`${bubbleColor} w-10 h-10 absolute z-0 rounded-full -bottom-5 left-1/2 -translate-x-1/2 
        group-hover:scale-[12] duration-300 linear`}
      ></span>
    </div>
  )
}

export default BubbleBtn
