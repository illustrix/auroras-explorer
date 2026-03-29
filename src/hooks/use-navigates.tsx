import { useTranslation } from 'react-i18next'
import ProductionLinePreviewImg from '@/assets/images/production-line-preview.webp'
import ShipmentPreviewImg from '@/assets/images/shipment-preview.webp'
import HugeiconsCargoShip from '~icons/hugeicons/cargo-ship'
import MdiAccountGroupOutline from '~icons/mdi/account-group-outline'
import MdiCompassOutline from '~icons/mdi/compass-outline'
import MdiDollar from '~icons/mdi/dollar'
import MdiFileDocumentOutline from '~icons/mdi/file-document-outline'
import MdiInvoiceListOutline from '~icons/mdi/invoice-list-outline'
import MdiListBoxOutline from '~icons/mdi/list-box-outline'
import MdiPlannerOutline from '~icons/mdi/planner-outline'

export const useGroupTools = () => {
  const { t } = useTranslation()
  return [
    {
      title: t('ui.sidebar.groupMembers'),
      url: '/group/{-$groupId}/members/',
      icon: MdiAccountGroupOutline,
      category: t('ui.sidebar.groupTools'),
    },
    {
      title: t('ui.sidebar.groupContracts'),
      url: '/group/{-$groupId}/contracts/',
      icon: MdiInvoiceListOutline,
      category: t('ui.sidebar.groupTools'),
    },
    {
      title: t('ui.sidebar.priceWatch'),
      url: '/group/{-$groupId}/price-watch/',
      icon: MdiDollar,
      category: t('ui.sidebar.groupTools'),
    },
    {
      title: t('ui.sidebar.groupPlan'),
      url: '/group/{-$groupId}/plan/',
      icon: MdiPlannerOutline,
      category: t('ui.sidebar.groupTools'),
    },
  ]
}

export const useNavigates = () => {
  const { t } = useTranslation()
  const groupTools = useGroupTools()

  return [
    {
      title: t('tools.shipment.title'),
      url: '/shipment/',
      icon: HugeiconsCargoShip,
      preview: ShipmentPreviewImg,
      description: t('tools.shipment.description'),
      category: t('ui.sidebar.explorerTools'),
    },
    {
      title: t('tools.productionLine.title'),
      url: '/production-line/',
      icon: MdiCompassOutline,
      preview: ProductionLinePreviewImg,
      description: t('tools.productionLine.description'),
      category: t('ui.sidebar.explorerTools'),
    },
    {
      title: t('ui.sidebar.catalog'),
      url: '/catalog/',
      icon: MdiFileDocumentOutline,
      description: t('ui.sidebar.catalogDescription'),
      category: t('ui.sidebar.explorerTools'),
    },
    {
      title: t('ui.sidebar.groupList'),
      url: '/group/',
      icon: MdiListBoxOutline,
      category: t('ui.sidebar.groupTools'),
    },
    ...groupTools,
  ]
}
