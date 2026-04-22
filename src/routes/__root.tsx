import { createRootRoute, Outlet, useMatches } from '@tanstack/react-router'
import { AppSidebar } from '@/components/layouts/dashboard/app-sidebar'
import { SiteHeader } from '@/components/layouts/dashboard/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export const Route = createRootRoute({
  component: RootComponent,
})

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    /** When true, the page manages its own viewport layout and internal scroll.
     * Default is false — the root provides a scrollable content area. */
    fullHeight?: boolean
  }
}

function RootComponent() {
  const matches = useMatches()
  const fullHeight = matches.some(m => m.staticData?.fullHeight)

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="h-svh md:h-[calc(100svh-1rem)] overflow-hidden">
        <SiteHeader />
        <div className="flex flex-1 flex-col min-h-0">
          <div
            className={cn(
              '@container/main flex flex-1 flex-col gap-2 min-h-0',
              fullHeight ? 'overflow-hidden' : 'overflow-y-auto',
            )}
          >
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
