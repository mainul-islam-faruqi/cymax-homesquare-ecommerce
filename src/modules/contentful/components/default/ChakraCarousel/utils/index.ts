export function percentage(x: number, y: number) {
  return 100 / (y / x)
}

export function debounce(limit: number | undefined, callback: (args: any[]) => void) {
  let timeoutId: any
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(callback, limit, args)
  }
}

export function capsFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

