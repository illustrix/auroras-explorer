import { createFileRoute } from '@tanstack/react-router'
import { ProductionLineExplorerPage } from '@/components/pages/production-line/explorer'

export const Route = createFileRoute('/production-line/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProductionLineExplorerPage />
}
