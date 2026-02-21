import type { AxiosRequestConfig } from 'axios'
import { assert } from '@/lib/assert'
import { type Cache, noCache } from '@/lib/cache'
import type * as fio from '@/lib/fio'
import { FioClient } from '@/lib/fio/client'
import { sleep } from '@/lib/sleep'

export class GameData {
  materials: fio.Material[] = []
  materialsByTicker: Record<string, fio.Material> = {}
  protected _orders: fio.TradingSummary[] = []
  protected _recipes: fio.Recipe[] = []
  exchanges: fio.CommodityExchange[] = []
  buildings: fio.Building[] = []
  buildingsByTicker: Record<string, fio.Building> = {}
  workforceNeedsByType: Record<string, fio.WorkforceNeed> = {}

  set orders(orders: fio.TradingSummary[]) {
    this._orders = orders
    this.ordersByCxTicker = new Map()
  }

  get orders() {
    return this._orders
  }

  set recipes(recipes: fio.Recipe[]) {
    this._recipes = recipes
    this.recipeByStandardRecipeName = new Map()
  }

  get recipes() {
    return this._recipes
  }

  // CX -> Ticker -> TradingSummary
  protected ordersByCxTicker: Map<string, Map<string, fio.TradingSummary>> =
    new Map()

  getTradingSummaryByCx(cx: string) {
    this.indexOrdersByCxTicker()
    return this.ordersByCxTicker.get(cx)
  }

  protected indexOrdersByCxTicker() {
    if (this.ordersByCxTicker.size > 0) return
    for (const order of this.orders) {
      if (!this.ordersByCxTicker.has(order.ExchangeCode)) {
        this.ordersByCxTicker.set(order.ExchangeCode, new Map())
      }
      const cx = this.ordersByCxTicker.get(order.ExchangeCode)
      assert(cx)
      cx.set(order.MaterialTicker, order)
    }
  }

  // StandardRecipeName -> Recipe
  //   StandardRecipeName looks like: "FRM:4xH2O=>4xGRN"
  protected recipeByStandardRecipeName: Map<string, fio.Recipe> = new Map()

  getRecipeByStandardRecipeName(name: string) {
    if (this.recipeByStandardRecipeName.size === 0) {
      for (const recipe of this.recipes) {
        this.recipeByStandardRecipeName.set(recipe.StandardRecipeName, recipe)
      }
    }
    return this.recipeByStandardRecipeName.get(name)
  }
}

interface LoaderConfig<T = unknown> {
  key: string
  fn: (opt?: AxiosRequestConfig) => Promise<T>
  ttl?: number
  apply: (g: GameData, data: T) => void
}

export class GameDataService extends GameData {
  protected loaders: Record<string, LoaderConfig> = {}
  protected fioClient = new FioClient()

  autoUpdateOn = false
  onUpdateError?: (key: string, error: unknown) => void
  requestOptions?: AxiosRequestConfig

  protected updatedAt: Record<string, number> = {}

  constructor(protected cache: Cache = noCache) {
    super()
    this.addLoaders()
  }

  protected addLoader<T>(config: LoaderConfig<T>) {
    this.loaders[config.key] = config as LoaderConfig
  }

  protected addLoaders() {
    this.addLoader({
      key: 'orders',
      fn: this.fioClient.getOrdersData,
      ttl: 1000 * 60 * 5, // 5 minutes
      apply: (g, data) => {
        g.orders = data
      },
    })
    this.addLoader({
      key: 'materials',
      fn: this.fioClient.getAllMaterials,
      apply: (g, data) => {
        g.materials = data.toSorted((a, b) => a.Ticker.localeCompare(b.Ticker))
        g.materialsByTicker = {}
        for (const material of data) {
          g.materialsByTicker[material.Ticker] = material
        }
      },
    })

    this.addLoader({
      key: 'recipes',
      fn: this.fioClient.getAllRecipes,
      apply: (g, data) => {
        g.recipes = data
      },
    })

    this.addLoader({
      key: 'exchanges',
      fn: this.fioClient.getAllExchanges,
      apply: (g, data) => {
        g.exchanges = data
      },
    })

    this.addLoader({
      key: 'buildings',
      fn: this.fioClient.getAllBuildings,
      apply: (g, data) => {
        g.buildings = data.toSorted((a, b) => a.Ticker.localeCompare(b.Ticker))
        g.buildingsByTicker = {}
        for (const building of data) {
          g.buildingsByTicker[building.Ticker] = building
        }
      },
    })

    this.addLoader({
      key: 'workforceNeeds',
      fn: this.fioClient.getAllWorkforceNeeds,
      apply: (g, data) => {
        g.workforceNeedsByType = {}
        for (const workforceNeed of data) {
          g.workforceNeedsByType[workforceNeed.WorkforceType] = workforceNeed
        }
      },
    })
  }

  async getDataWithCache<T>(
    getData: () => Promise<T>,
    cacheName: string,
    ttl?: number,
  ): Promise<T> {
    const cachedData = await this.cache.get<T>(cacheName)
    if (cachedData) return cachedData
    const data = await getData()
    await this.cache.set(cacheName, data, ttl)
    this.updatedAt[cacheName] = Date.now()
    return data
  }

  protected async load(key: string) {
    const loader = this.loaders[key]
    if (!loader) throw new Error(`Loader for ${key} not found`)
    const { fn, apply, ttl } = loader
    const data = await this.getDataWithCache(
      () => fn(this.requestOptions),
      key,
      ttl,
    )
    apply(this, data)
  }

  async loadAll() {
    await Promise.all(Object.keys(this.loaders).map(key => this.load(key)))
    return this
  }

  async autoUpdate() {
    if (this.autoUpdateOn) return
    this.autoUpdateOn = true
    while (this.autoUpdateOn) {
      for (const [key, opt] of Object.entries(this.loaders)) {
        if (!opt.ttl) continue
        const lastUpdated = this.updatedAt[key] || 0
        if (Date.now() - lastUpdated > opt.ttl) {
          try {
            await this.load(key)
          } catch (e) {
            this.onUpdateError?.(key, e)
          }
        }
      }
      await sleep(1000 * 60) // check every minute
    }
  }
}
