import PCTPreview from '@/assets/images/pct-preview.webp'
import ProductionLinePreviewImg from '@/assets/images/production-line-preview.webp'
import PrunPlannerPreviewImg from '@/assets/images/prunplanner-preview.webp'
import ShipmentPreviewImg from '@/assets/images/shipment-preview.webp'
import HugeiconsCargoShip from '~icons/hugeicons/cargo-ship'
import MdiCompassOutline from '~icons/mdi/compass-outline'
import MdiInternet from '~icons/mdi/internet'
import RiPlanetLine from '~icons/ri/planet-line'
import StashPlan from '~icons/stash/plan'

export const tools = [
  {
    title: 'Shipment',
    url: '/shipment',
    icon: HugeiconsCargoShip,
    preview: ShipmentPreviewImg,
    description:
      'Calculation of optimal transportation plans for commodities between exchanges.',
    category: 'Explorer Tools',
    i18nKey: 'tools.shipment',
  },
  {
    title: 'Production Line',
    url: '/production-line/',
    icon: MdiCompassOutline,
    preview: ProductionLinePreviewImg,
    description: 'Visualization of production lines and their dependencies.',
    category: 'Explorer Tools',
    i18nKey: 'tools.productionLine',
  },
]
export const externalTools = [
  {
    title: 'PRUNPlanner',
    url: 'https://prunplanner.org/',
    icon: StashPlan,
    preview: PrunPlannerPreviewImg,
    description:
      'PRUNplanner helps you design bases, organize empires, and calculate profits — without wasting in-game resources. It mirrors nearly every aspect of Prosperous Universe so you can plan smarter and play more confidently.',
    category: 'External Tools',
    featured: true,
    i18nKey: 'tools.prunPlanner',
  },
  {
    title: 'FIO',
    url: 'https://fio.fnar.net/',
    icon: RiPlanetLine,
    preview: 'https://fio.fnar.net/img/main-burnratepage.png',
    description:
      'Search planets, find shipping ads, see your consumable burn, and much much more. Most importantly, empower you to control your game through browser extensions.',
    category: 'External Tools',
    i18nKey: 'tools.fio',
  },
  {
    title: 'PCT Wiki',
    url: 'https://pct.fnar.net/',
    icon: MdiInternet,
    preview: PCTPreview,
    description: 'PCT Wiki is a community derived mechanics wiki.',
    category: 'External Tools',
    i18nKey: 'tools.pctWiki',
  },
]
