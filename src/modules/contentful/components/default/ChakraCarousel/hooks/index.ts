import { useState, useCallback, useEffect } from 'react'
import { debounce } from '../utils'

const getDimensionObject = (node: any) => {
  const rect = node.getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    x: rect.x,
    y: rect.y,
    right: rect.right,
    bottom: rect.bottom
  }
}

export const useBoundingRect = (limit?: any) => {
  const [dimensions, setDimensions] = useState<any>({})
  const [node, setNode] = useState(null)

  const ref: any = useCallback((node: any) => {
    setNode(node)
  }, [])

  useEffect(() => {
    if ("undefined" !== typeof window && node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node))
        )

      measure()

      const listener = debounce(limit ? limit : 100, measure)

      window.addEventListener("resize", listener)
      window.addEventListener("scroll", listener)
      return () => {
        window.removeEventListener("resize", listener)
        window.removeEventListener("scroll", listener)
      };
    }
  }, [node, limit])

  return [ref, dimensions, node]
}
