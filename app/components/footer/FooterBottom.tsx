import { useEffect, useState } from 'react'

const FooterBottom = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <div className="flex items-center">
      <span className="text-11 text-jetBlack">Copyright &copy; {currentYear}</span>
    </div>
  )
}

export default FooterBottom
