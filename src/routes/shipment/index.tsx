import { createFileRoute } from '@tanstack/react-router'
import { ShipmentPage } from '@/components/pages/shipment'

export const Route = createFileRoute('/shipment/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ShipmentPage />
}
