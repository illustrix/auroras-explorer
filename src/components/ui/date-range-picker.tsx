'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { getDateRange } from '@/lib/date'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'

export interface DatePickerWithRangeProps {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({
  date,
  setDate,
}: DatePickerWithRangeProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('last-7-days')

  return (
    <Field className="w-60">
      <FieldLabel htmlFor="date-picker-range">{t('ui.date')}</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Select
            value={value}
            onValueChange={v => {
              setValue(v)
              setDate(getDateRange(v))
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('ui.selectDate')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">{t('dateRange.today')}</SelectItem>
              <SelectItem value="yesterday">{t('dateRange.yesterday')}</SelectItem>
              <SelectItem value="last-7-days">{t('dateRange.last7Days')}</SelectItem>
              <SelectItem value="last-30-days">{t('dateRange.last30Days')}</SelectItem>
              <SelectItem value="this-month">{t('dateRange.thisMonth')}</SelectItem>
              <SelectItem value="last-month">{t('dateRange.lastMonth')}</SelectItem>
            </SelectContent>
          </Select>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            showOutsideDays={false}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}