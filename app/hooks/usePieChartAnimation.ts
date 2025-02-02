import { useEffect, useState } from "react";

export function usePieChartAnimation(
  percentageStr: string,
  radius: number = 50,
  duration: number = 700
) {
  // Convert percentage string (e.g. "75%") to a number (75)
  const targetPercentage = parseFloat(percentageStr);
  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * radius;

  // State to track the stroke-dashoffset value (start at full circumference, meaning 0 progress)
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    // Calculate progress (e.g. 75% => 0.75)
    const progress = targetPercentage / 100;
    // Calculate the target offset so that the visible stroke equals the progress
    const targetOffset = circumference * (1 - progress);

    // Use a timeout (or requestAnimationFrame) to animate the value if needed.
    // For a simple solution, we just update the state.
    setOffset(targetOffset);
  }, [targetPercentage, circumference]);

  return {
    circumference,
    offset,
    // A style string you can apply to the SVG circle for animation
    transition: `stroke-dashoffset ${duration}ms ease-out`,
  };
}
