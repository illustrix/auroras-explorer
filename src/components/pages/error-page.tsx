import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export const ErrorPage = () => {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
        <h2 className="mb-6 text-5xl font-semibold">{t('error.title')}</h2>
        <h3 className="mb-1.5 text-3xl font-semibold">{t('error.description')}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          {t('error.description')} Please try refreshing the page, or{' '}
          <a
            href="mailto:inquires@auroras.xyz"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            {t('common.contact')}
          </a>{' '}
          if the problem persists.
        </p>
        <Button
          asChild
          size="lg"
          className="rounded-lg text-base"
          variant="outline"
        >
          <Link to="/">{t('common.back')} to home page</Link>
        </Button>
      </div>
    </div>
  )
}
