import { Link, Outlet, createFileRoute, useMatches } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { docsRegistry } from '@/content/docs/registry'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/catalog')({
  component: RouteComponent,
  staticData: { fullHeight: true },
})

function RouteComponent() {
  const { t } = useTranslation()
  const matches = useMatches()

  const activePath = useMemo(() => {
    const leaf = matches[matches.length - 1]
    return leaf?.fullPath ?? ''
  }, [matches])

  return (
    <div className="flex h-full overflow-hidden">
      {/* Secondary sidebar */}
      <aside className="w-52 shrink-0 border-r overflow-y-auto py-3 px-2 flex flex-col gap-1">
        {/* Materials section */}
        <p className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {t('catalog.title')}
        </p>
        <NavItem
          to="/catalog/"
          label={t('catalog.allMaterials')}
          active={activePath === '/catalog/'}
        />

        {/* Divider */}
        <div className="my-2 h-px bg-border" />

        {/* Guide section */}
        <p className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {t('docs.title')}
        </p>
        {docsRegistry.map(doc => (
          <NavItem
            key={doc.slug}
            to="/catalog/docs/$slug"
            params={{ slug: doc.slug }}
            label={t(doc.titleKey)}
            active={activePath === '/catalog/docs/$slug' && matches.some(m => (m.params as { slug?: string }).slug === doc.slug)}
          />
        ))}
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}

function NavItem({
  to,
  params,
  label,
  active,
}: {
  to: string
  params?: Record<string, string>
  label: string
  active: boolean
}) {
  return (
    <Link
      to={to}
      params={params}
      className={cn(
        'rounded-md px-2 py-1.5 text-sm transition-colors truncate block',
        active
          ? 'bg-accent text-accent-foreground font-medium'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      {label}
    </Link>
  )
}
