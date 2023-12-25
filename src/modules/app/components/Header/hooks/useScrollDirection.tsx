import { useEffect, useState, useCallback } from 'react'

export const useScrollDirection = () => {
  const [y, setY] = useState(typeof window !== 'undefined' && window.scrollY)
  const [scrollDirection, setScrollDirection] = useState('')

  const handleNavigation = useCallback(
    (e: any) => {
      const window = e.currentTarget
      if (y > window.scrollY) {
        setScrollDirection('up')
      } else if (y < window.scrollY) {
        setScrollDirection('down')
      }
      setY(window.scrollY)
    },
    [y]
  )

  useEffect(() => {
    setY(window.scrollY)
    window.addEventListener('scroll', handleNavigation)

    return () => {
      window.removeEventListener('scroll', handleNavigation)
    }
  }, [handleNavigation])

  return scrollDirection
}
