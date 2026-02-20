export interface Cache {
  has(key: string): Promise<boolean>
  get<T>(key: string): Promise<T | undefined>
  set<T>(key: string, value: T, ttl?: number): Promise<void>
  delete?(key: string): Promise<void>
}

export const noCache: Cache = {
  async has() {
    return false
  },
  async get() {
    return
  },
  async set() {
    // do nothing
  },
}
