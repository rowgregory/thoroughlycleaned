import React, { useEffect, useState } from 'react'

const SystemsStatusBar = ({ isLoading, status }: { isLoading: boolean; status: string }) => {
  const [barWidth, setBarWidth] = useState<number>(0) // Bar width state
  const [barClass, setBarClass] = useState<string>('bg-zinc-700') // Initial gray color for the bar
  const [animationTriggered, setAnimationTriggered] = useState<boolean>(false) // Track if animation is triggered

  useEffect(() => {
    // When loading finishes, update bar width and color based on status
    if (!isLoading) {
      // Trigger the animation when loading is complete
      setAnimationTriggered(true)

      // Set the bar width to 100% for animation
      setBarWidth(100)
      // Set the appropriate color based on the status
      if (status === 'operational') {
        setBarClass('bg-lime-500') // Success color
      } else if (status === 'outage') {
        setBarClass('bg-red-500') // Error color
      }
    } else {
      // Reset bar to initial state when loading is true
      setBarWidth(0)
      setBarClass('bg-zinc-700') // Reset to gray color
      setAnimationTriggered(false)
    }
  }, [isLoading, status])

  return (
    <div className="relative w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
      {/* Animated bar */}
      <div
        className={`absolute left-0 top-0 h-full ${barClass} rounded-full`}
        style={{
          width: `${barWidth}%`, // Width of the bar (based on loading state)
          animationName: animationTriggered ? 'growBar' : 'none', // Apply animation only when triggered
          animationDuration: '500ms', // Duration for the animation
          animationTimingFunction: 'ease-in', // Timing function for the animation
          animationFillMode: 'forwards' // Keep the final state of the animation after completion
        }}
      />
    </div>
  )
}

export default SystemsStatusBar
