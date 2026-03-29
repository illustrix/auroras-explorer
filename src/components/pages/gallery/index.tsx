import { Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { externalTools, tools } from './tools'

export const ToolsGallery: FC<{ tools: typeof tools }> = ({ tools }) => {
  const { t } = useTranslation()
  
  const getToolTitle = (item: typeof tools[0]) => {
    switch (item.title) {
      case 'Shipment':
        return t('tools.shipment.title')
      case 'Production Line':
        return t('tools.productionLine.title')
      case 'PRUNPlanner':
        return t('tools.prunPlanner.title')
      case 'FIO':
        return t('tools.fio.title')
      case 'PCT Wiki':
        return t('tools.pctWiki.title')
      default:
        return item.title
    }
  }
  
  const getToolDescription = (item: typeof tools[0]) => {
    switch (item.title) {
      case 'Shipment':
        return t('tools.shipment.description')
      case 'Production Line':
        return t('tools.productionLine.description')
      case 'PRUNPlanner':
        return t('tools.prunPlanner.description')
      case 'FIO':
        return t('tools.fio.description')
      case 'PCT Wiki':
        return t('tools.pctWiki.description')
      default:
        return item.description
    }
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {tools.map(item => {
        if (!item.preview) {
          return null
        }
        return (
          <Link
            key={item.url}
            to={item.url}
            className="border border-border rounded-lg hover:outline transition-all flex flex-col gap-2 group overflow-hidden"
            target="_blank"
            rel="noopener"
          >
            <div className="overflow-hidden w-full h-60 rounded-lg bg-muted/50">
              <img
                alt={`${getToolTitle(item)} 的预览`}
                src={item.preview}
                className="w-full h-60 group-hover:scale-110 transition-all"
              />
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="flex items-center">
                <item.icon className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-lg font-semibold">{getToolTitle(item)}</h3>
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                {getToolDescription(item)}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export const ToolGalleryPage = () => {
  const { t } = useTranslation()
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{t('gallery.title')}</h1>
      <p className="mt-4 text-muted-foreground">
        {t('gallery.description')}
      </p>
      <ToolsGallery tools={tools} />

      <h2 className="mt-8 text-xl font-semibold">
        {t('gallery.featuredTitle')}
      </h2>
      <p className="mt-4 text-muted-foreground">
        {t('gallery.featuredDescription')}
      </p>

      <ToolsGallery tools={externalTools} />

      <div className="mt-8 text-sm text-muted-foreground">
        {t('gallery.suggestions')}
      </div>
    </div>
  )
}
