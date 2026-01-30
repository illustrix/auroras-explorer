import { configureSingle, fs as zenFs } from '@zenfs/core'
import { WebAccess } from '@zenfs/dom'
import { getItem, setItem } from '@/hooks/use-storage'

const fs = zenFs.promises
let initFsPromise: Promise<void> | null = null

const initFs = async () => {
  const root = await navigator.storage.getDirectory()
  await configureSingle({ backend: WebAccess, handle: root })
}

const ensureFs = () => {
  if (initFsPromise) return initFsPromise
  initFsPromise = initFs()
  return initFsPromise
}

interface GetDataOptions {
  expiryMs?: number
}

export const getDataWithCache = async <T>(
  getData: () => Promise<T>,
  cacheName: string,
  opt: GetDataOptions = {},
): Promise<T> => {
  await ensureFs()
  const cachePath = `/data/${cacheName}.json`
  const cacheTimeKey = `ct-${cacheName}`

  if (opt.expiryMs) {
    const cachedAt = getItem<number>(cacheTimeKey)
    if (!cachedAt || Date.now() - cachedAt > opt.expiryMs) {
      await fs.unlink(cachePath).catch(() => {})
    }
  }

  const isCached = await fs.exists(cachePath)
  if (isCached) {
    const cachedData = await fs.readFile(cachePath, { encoding: 'utf8' })

    return JSON.parse(cachedData) as T
  }

  const data = await getData()
  setItem(cacheTimeKey, Date.now())
  await fs.mkdir('/data').catch(() => {})
  await fs.writeFile(cachePath, JSON.stringify(data), { encoding: 'utf8' })
  return data
}
