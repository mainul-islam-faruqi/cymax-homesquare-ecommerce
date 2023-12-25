import { useEffect, useState } from 'react'

const HEADER_MENU_THRESHOLD = 100

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(true)

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset < HEADER_MENU_THRESHOLD)
    }
    window.addEventListener('scroll', updatePosition)
    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}
