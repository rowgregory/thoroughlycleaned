'use client'

import { useState, useEffect, useRef } from 'react'

const Counter = ({
  targetNumber,
  duration = 2000,
  className
}: {
  targetNumber: number
  duration: number
  className?: string
}) => {
  const [displayedNumber, setDisplayedNumber] = useState(0)
  const [inView, setInView] = useState(false)
  const [scrollingDown, setScrollingDown] = useState(true)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        } else {
          setInView(false)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollingDown(true) // User is scrolling down
      } else {
        setScrollingDown(false) // User is scrolling up
      }
      lastScrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!inView || !scrollingDown) return

    const stepTime = Math.max(duration / targetNumber, 20)
    let currentNumber = 0

    const interval = setInterval(() => {
      currentNumber += Math.ceil(targetNumber / 50)
      if (currentNumber >= targetNumber) {
        setDisplayedNumber(targetNumber)
        clearInterval(interval)
      } else {
        setDisplayedNumber(currentNumber)
      }
    }, stepTime)

    return () => clearInterval(interval)
  }, [inView, scrollingDown, targetNumber, duration])

  return (
    <div ref={ref} className={`${className} text-4xl sm:text-5xl font-bold`}>
      {displayedNumber}
    </div>
  )
}

export default Counter
