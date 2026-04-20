import { groupBy, sortBy } from 'es-toolkit'
import { type ComponentType, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MaterialDetail } from '@/components/game/material/material-detail'
import { getMaterialCategoryTheme } from '@/components/game/material-category'
import { MaterialTileBase } from '@/components/game/material-tile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useGameData } from '@/lib/store'
import { cn } from '@/lib/utils'
import CbiMealie from '~icons/cbi/mealie'
import Fa7SolidAtom from '~icons/fa7-solid/atom'
import Fa7SolidBox from '~icons/fa7-solid/box'
import Fa7SolidCloud from '~icons/fa7-solid/cloud'
import Fa7SolidDesktop from '~icons/fa7-solid/desktop'
import Fa7SolidDiamond from '~icons/fa7-solid/diamond'
import Fa7SolidFloppyDisk from '~icons/fa7-solid/floppy-disk'
import Fa7SolidGears from '~icons/fa7-solid/gears'
import Fa7SolidGem from '~icons/fa7-solid/gem'
import Fa7SolidHillRockslide from '~icons/fa7-solid/hill-rockslide'
import Fa7SolidRobot from '~icons/fa7-solid/robot'
import Fa7SolidScroll from '~icons/fa7-solid/scroll'
import Fa7SolidSeedling from '~icons/fa7-solid/seedling'
import Fa7SolidShield from '~icons/fa7-solid/shield'
import Fa7SolidSquare from '~icons/fa7-solid/square'
import Fa7SolidVial from '~icons/fa7-solid/vial'
import MaterialSymbolsBrickRounded from '~icons/material-symbols/brick-rounded'
import MaterialSymbolsCoffeeRounded from '~icons/material-symbols/coffee-rounded'
import MaterialSymbolsMedication from '~icons/material-symbols/medication'
import MdiClose from '~icons/mdi/close'
import MdiMagnify from '~icons/mdi/magnify'
import MdiWater from '~icons/mdi/water'
import PhGasCanFill from '~icons/ph/gas-can-fill'

const categoriesIconMap: Record<string, ComponentType | null> = {
  'agricultural products': Fa7SolidSeedling,
  alloys: Fa7SolidDiamond,
  chemicals: Fa7SolidVial,
  'consumable bundles': Fa7SolidBox,
  'construction materials': MaterialSymbolsBrickRounded,
  'construction parts': MaterialSymbolsBrickRounded,
  'construction prefabs': MaterialSymbolsBrickRounded,
  'consumables (basic)': CbiMealie,
  'consumables (luxury)': MaterialSymbolsCoffeeRounded,
  drones: Fa7SolidRobot,
  'electronic devices': null,
  'electronic parts': null,
  'electronic pieces': null,
  'electronic systems': Fa7SolidDesktop,
  elements: Fa7SolidAtom,
  'energy systems': null,
  fuels: PhGasCanFill,
  gases: Fa7SolidCloud,
  infrastructure: Fa7SolidGears,
  liquids: MdiWater,
  'medical equipment': MaterialSymbolsMedication,
  metals: Fa7SolidSquare,
  minerals: Fa7SolidGem,
  ores: Fa7SolidHillRockslide,
  plastics: null,
  'ship engines': null,
  'ship kits': null,
  'ship parts': null,
  'ship shields': Fa7SolidShield,
  'software components': Fa7SolidFloppyDisk,
  'software systems': Fa7SolidFloppyDisk,
  'software tools': Fa7SolidFloppyDisk,
  textiles: Fa7SolidScroll,
  'unit prefabs': null,
  utility: null,
}

type SortMode =
  | 'category'
  | 'ticker'
  | 'weight-asc'
  | 'weight-desc'
  | 'volume-asc'
  | 'volume-desc'
  | 'density-asc'
  | 'density-desc'

type SourceFilter = 'all' | 'raw' | 'produced'

export const CatalogPage = () => {
  const { t } = useTranslation(['translation', 'game'])
  const { data } = useGameData()

  const [search, setSearch] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>('category')
  const [source, setSource] = useState<SourceFilter>('all')
  const [activeMat, setActiveMat] = useState<string>()

  const translateCategory = (cat: string) =>
    t(`game:MaterialCategory.${cat.toLowerCase().replaceAll(' ', '')}`)

  // Tickers that have at least one recipe producing them
  const producedTickers = useMemo(() => {
    const set = new Set<string>()
    for (const recipe of data?.recipes ?? []) {
      for (const out of recipe.Outputs) {
        set.add(out.Ticker)
      }
    }
    return set
  }, [data])

  const filtered = useMemo(() => {
    if (!data) return []
    const all = Object.values(data.materialsByTicker)
    const searchLower = search.trim().toLowerCase()

    return all.filter(mat => {
      if (
        searchLower &&
        !mat.Ticker.toLowerCase().includes(searchLower) &&
        !mat.Name.toLowerCase().includes(searchLower)
      ) {
        return false
      }
      if (source === 'raw' && producedTickers.has(mat.Ticker)) return false
      if (source === 'produced' && !producedTickers.has(mat.Ticker)) return false
      return true
    })
  }, [data, search, source, producedTickers])

  const view = useMemo(() => {
    if (sortMode === 'category') {
      const map = groupBy(filtered, m => m.CategoryName)
      return {
        grouped: true as const,
        categories: sortBy(Object.entries(map), ['0']),
      }
    }
    const sorted = [...filtered]
    const density = (m: (typeof sorted)[number]) =>
      m.Volume > 0 ? m.Weight / m.Volume : 0
    switch (sortMode) {
      case 'ticker':
        sorted.sort((a, b) => a.Ticker.localeCompare(b.Ticker))
        break
      case 'weight-asc':
        sorted.sort((a, b) => a.Weight - b.Weight)
        break
      case 'weight-desc':
        sorted.sort((a, b) => b.Weight - a.Weight)
        break
      case 'volume-asc':
        sorted.sort((a, b) => a.Volume - b.Volume)
        break
      case 'volume-desc':
        sorted.sort((a, b) => b.Volume - a.Volume)
        break
      case 'density-asc':
        sorted.sort((a, b) => density(a) - density(b))
        break
      case 'density-desc':
        sorted.sort((a, b) => density(b) - density(a))
        break
    }
    return { grouped: false as const, materials: sorted }
  }, [filtered, sortMode])

  const renderTile = (mat: { Ticker: string; CategoryName: string }) => {
    const active = activeMat === mat.Ticker
    return (
      <div
        key={mat.Ticker}
        className={cn(
          'transition-all overflow-hidden relative',
          `rounded-md material-tile shadow-xl hover:outline-2`,
          { 'outline-4': active },
          getMaterialCategoryTheme(mat.CategoryName),
        )}
      >
        <MaterialTileBase
          ticker={mat.Ticker}
          onClick={() => setActiveMat(mat.Ticker)}
        />
      </div>
    )
  }

  const hasActiveFilters =
    search.trim() !== '' || source !== 'all' || sortMode !== 'category'

  const clearFilters = () => {
    setSearch('')
    setSource('all')
    setSortMode('category')
  }

  return (
    <div className="relative w-full h-full flex overflow-hidden">
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="relative z-20 shrink-0 bg-background/95 backdrop-blur px-4 py-3 border-b flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-48 max-w-64">
            <MdiMagnify className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('catalog.searchPlaceholder')}
              className="pl-8"
            />
          </div>

          <ToggleGroup
            type="single"
            value={source}
            onValueChange={v => v && setSource(v as SourceFilter)}
            variant="outline"
            size="sm"
          >
            <ToggleGroupItem value="all">
              {t('catalog.sourceAll')}
            </ToggleGroupItem>
            <ToggleGroupItem value="raw">
              {t('catalog.sourceRaw')}
            </ToggleGroupItem>
            <ToggleGroupItem value="produced">
              {t('catalog.sourceProduced')}
            </ToggleGroupItem>
          </ToggleGroup>

          <Select
            value={sortMode}
            onValueChange={v => setSortMode(v as SortMode)}
          >
            <SelectTrigger className="min-w-40" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category">
                {t('catalog.sortCategory')}
              </SelectItem>
              <SelectItem value="ticker">{t('catalog.sortTicker')}</SelectItem>
              <SelectItem value="weight-asc">
                {t('catalog.sortWeightAsc')}
              </SelectItem>
              <SelectItem value="weight-desc">
                {t('catalog.sortWeightDesc')}
              </SelectItem>
              <SelectItem value="volume-asc">
                {t('catalog.sortVolumeAsc')}
              </SelectItem>
              <SelectItem value="volume-desc">
                {t('catalog.sortVolumeDesc')}
              </SelectItem>
              <SelectItem value="density-asc">
                {t('catalog.sortDensityAsc')}
              </SelectItem>
              <SelectItem value="density-desc">
                {t('catalog.sortDensityDesc')}
              </SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              {t('catalog.clearFilters')}
            </Button>
          )}

          <div className="text-xs text-muted-foreground ml-auto whitespace-nowrap">
            {t('catalog.resultCount', { count: filtered.length })}
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 grid gap-4 content-start"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(3rem, 1fr))',
            gridAutoRows: '3rem',
          }}
        >
          {view.grouped
            ? view.categories.flatMap(([category, mats]) => {
                const Icon = categoriesIconMap[category]
                return [
                  <div
                    key={`cate-${category}`}
                    className="col-span-2 text-xs capitalize flex items-center px-2 rounded-md transition-all bg-secondary/50 text-muted-foreground h-12"
                  >
                    {Icon && (
                      <span className="mr-2 text-lg">
                        <Icon />
                      </span>
                    )}
                    {translateCategory(category)}
                  </div>,
                  ...mats.map(renderTile),
                ]
              })
            : view.materials.map(renderTile)}
        </div>
      </div>

      <div
        className={cn(
          'border-l h-full overflow-y-auto transition-all shrink-0',
          activeMat ? 'w-100' : 'w-0',
        )}
      >
        <MaterialDetail
          className="m-4"
          ticker={activeMat}
          decorator={
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveMat(undefined)}
            >
              <MdiClose className="h-4 w-4" />
            </Button>
          }
        />
      </div>
    </div>
  )
}
