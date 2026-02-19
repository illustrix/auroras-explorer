import type { DateRange } from 'react-day-picker'
import { dayjs } from './format'

export const getDateRange = (value: string): DateRange | undefined => {
  const now = dayjs()
  if (value === 'today') {
    return {
      from: now.startOf('day').toDate(),
      to: now.endOf('day').toDate(),
    }
  } else if (value === 'yesterday') {
    const yesterday = now.subtract(1, 'day')
    return {
      from: yesterday.startOf('day').toDate(),
      to: yesterday.endOf('day').toDate(),
    }
  } else if (value === 'last-7-days') {
    return {
      from: now.subtract(7, 'day').startOf('day').toDate(),
      to: now.endOf('day').toDate(),
    }
  } else if (value === 'last-30-days') {
    return {
      from: now.subtract(30, 'day').startOf('day').toDate(),
      to: now.endOf('day').toDate(),
    }
  } else if (value === 'this-month') {
    return {
      from: now.startOf('month').toDate(),
      to: now.endOf('month').toDate(),
    }
  } else if (value === 'last-month') {
    const lastMonth = now.subtract(1, 'month')
    return {
      from: lastMonth.startOf('month').toDate(),
      to: lastMonth.endOf('month').toDate(),
    }
  }
}
