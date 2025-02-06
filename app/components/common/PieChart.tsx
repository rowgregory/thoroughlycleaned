import { usePieChartAnimation } from '@/app/hooks/usePieChartAnimation'
import React from 'react'

type PieChartProps = {
  percentage: string // e.g. "75%"
  onClick: any
}

const PieChart: React.FC<PieChartProps> = ({ percentage, onClick }) => {
  // Define the new smaller radius of your circle.
  const radius = 35 // Slightly larger than the previous 25
  const svgSize = 84 // Half of the original 120
  const center = svgSize / 2

  // Get the animation values from the hook.
  const { circumference, offset, transition } = usePieChartAnimation(percentage, radius, 1500)

  return (
    <svg onClick={onClick} width={svgSize} height={svgSize}>
      {/* Background circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="transparent"
        stroke="#eee"
        strokeWidth="5" // Half of the original 10
      />
      {/* Animated circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="transparent"
        stroke="#00b8d9"
        strokeWidth="5" // Half of the original 10
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition }}
        transform={`rotate(-90 ${center} ${center})`} // Rotate so that progress starts at the top
      />
      {/* Optional: Display the percentage as text */}
      <text
        x={center}
        y={center + 5} // Adjust to center the text vertically
        textAnchor="middle"
        fill="#fff"
        fontSize="20" // Half of the original 20
        fontWeight="bold"
      >
        {percentage}
      </text>
    </svg>
  )
}

export default PieChart
