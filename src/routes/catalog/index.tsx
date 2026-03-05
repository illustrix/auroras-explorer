import { createFileRoute } from '@tanstack/react-router'
import { GameDataLoadingWrapper } from '@/components/common/game-data-loading-wrapper'
import { CatalogPage } from '@/components/pages/catalog/catalog-page'

export const Route = createFileRoute('/catalog/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <GameDataLoadingWrapper>
      <CatalogPage />
    </GameDataLoadingWrapper>
  )
}
