import { useTranslation } from 'react-i18next'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

export const LanguageSelector = () => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage?.split('-')[0] ?? 'en'

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value)
  }

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="zh">中文</SelectItem>
      </SelectContent>
    </Select>
  )
}