export const useSessionStorage = () => ({
  getItem: (key: string) => {
    const item = window.sessionStorage.getItem(key)
    return item && JSON.parse(item)
  },
  setItem: <T>(key: string, payload: T) => {
    window.sessionStorage.setItem(key, JSON.stringify(payload))
  },
})
