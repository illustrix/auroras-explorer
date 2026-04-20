import { Link, createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { docsRegistry } from '@/content/docs/registry'
import MdiArrowRight from '~icons/mdi/arrow-right'
import MdiBookOpenPageVariantOutline from '~icons/mdi/book-open-page-variant-outline'

export const Route = createFileRoute('/catalog/docs/')({
  component: DocsIndexPage,
})

function DocsIndexPage() {
  const { t } = useTranslation()

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 max-w-3xl mx-auto">
        <div className="grid gap-3">
          {docsRegistry.map(doc => (
            <Link
              key={doc.slug}
              to="/catalog/docs/$slug"
              params={{ slug: doc.slug }}
              className="group flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="mt-0.5 text-primary">
                <MdiBookOpenPageVariantOutline className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium group-hover:text-primary transition-colors">
                  {t(doc.titleKey)}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {t(doc.descriptionKey)}
                </p>
              </div>
              <MdiArrowRight className="h-4 w-4 mt-1 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
