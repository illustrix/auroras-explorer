import { configureSingle, fs as zenFs } from '@zenfs/core'
import { WebAccess } from '@zenfs/dom'

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

export const getDataWithCache = async <T>(
  getData: () => Promise<T>,
  cacheName: string,
): Promise<T> => {
  await ensureFs()
  const cachePath = `/data/${cacheName}.json`
  const isCached = await fs.exists(cachePath)
  if (isCached) {
    const cachedData = await fs.readFile(cachePath, { encoding: 'utf8' })

    return JSON.parse(cachedData) as T
  }

  const data = await getData()
  await fs.mkdir('/data').catch(() => {})
  await fs.writeFile(cachePath, JSON.stringify(data), { encoding: 'utf8' })
  return data
}
