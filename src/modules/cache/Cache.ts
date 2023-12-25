interface CacheEntry {
  retriever: () => any
  value: any
  updateAt: number
}

interface CacheObject {
  [key: string]: CacheEntry
}

const EXPIRATION_TIME = 86400000

export class Cache {
  cacheTime: number

  cache: CacheObject

  constructor(cacheTime = EXPIRATION_TIME) {
    this.cacheTime = cacheTime
    this.cache = {}
  }

  async getItem(key: string) {
    await this.refreshEntry(key)
    return this.cache[key]?.value || null
  }

  async addEntry(key: string, retriever: () => any) {
    console.info(`Populating cache with key ${key}...`)
    const data = await retriever()
    this.cache[key] = {
      retriever,
      value: data || null,
      updateAt: new Date().getTime(),
    }
    return this.cache[key]
  }

  hasExpired(key: string) {
    const entry = this.cache[key]
    const now = new Date().getTime()
    const expiration =
      entry && entry?.updateAt ? this.cacheTime + entry.updateAt : 0
    console.info(`Has cache with key ${key} expired? ${now} > ${expiration}`)
    return entry && now > expiration
  }

  async refreshEntry(key: string) {
    if (this.hasExpired(key)) {
      console.info(`Cache with key ${key} has expired, re-fetching data...`)
      const data = await this.cache[key].retriever()
      this.cache[key].updateAt = new Date().getTime()
      this.cache[key].value = data
    } else {
      console.info(`Cache with key ${key} is still valid`)
    }
  }
}
