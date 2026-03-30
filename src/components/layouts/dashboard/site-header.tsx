import { useTranslation } from 'react-i18next'
import { AppBreadcrumb } from '@/components/common/breadcrumb/app-breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { IconBrandGithub } from '@tabler/icons-react'

export function SiteHeader() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language
  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === 'en' ? 'zh' : 'en')
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <AppBreadcrumb />

        <div className="ml-auto flex items-center gap-2">
          <Button
            type="button"
            onClick={toggleLanguage}
            size="sm"
            variant="ghost"
            className="font-normal"
          >
            {currentLang === 'en' ? '中文' : 'English'}
          </Button>
          <Button variant="ghost" asChild size="icon">
            <a
              href="https://github.com/illustrix/auroras-explorer"
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconBrandGithub className="size-5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}