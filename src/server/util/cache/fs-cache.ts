import { promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import type { Cache } from '@/lib/cache'

const getCachePath = (key: string) =>
  path.resolve(process.cwd(), `./tmp/data/${key}.json`)

const get = async <T>(key: string) => {
  try {
    const content = await fs.readFile(getCachePath(key), 'utf-8')
    return JSON.parse(content) as T
  } catch (_) {
    return
  }
}

const del = async (key: string) => {
  await fs.unlink(getCachePath(key)).catch(() => {})
}

const set = async <T>(key: string, value: T) => {
  const cachePath = getCachePath(key)
  await fs.mkdir(path.dirname(cachePath), {
    recursive: true,
  })
  await fs.writeFile(getCachePath(key), JSON.stringify(value), 'utf-8')
}

export const localFsCache: Cache = {
  async has(key: string) {
    return await fs.exists(getCachePath(key))
  },
  async get<T>(key: string) {
    const expireTime = await get<number>(getCachePath(`${key}:expire-time`))
    if (expireTime && Date.now() > expireTime) {
      await del(key)
      await del(`${key}:expire-time`)
      return
    }

    return await get<T>(key)
  },
  async set<T>(key: string, value: T, ttl?: number) {
    if (ttl) {
      await set(`${key}:expire-time`, Date.now() + ttl)
    }
    await set(key, value)
  },
  async delete(key: string) {
    await del(key)
  },
}
