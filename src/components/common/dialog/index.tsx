import type { ReactNode } from 'react'
import { dialog as rawDialog } from 'redyc'
import { JsonInspector } from '@/components/debug/json'
import { AutoOpenDialog } from './auto-open-dialog'

export const dialog = (el: ReactNode) => {
  return rawDialog(<AutoOpenDialog>{el}</AutoOpenDialog>)
}

export const inspect = (data: unknown) => {
  return dialog(<JsonInspector data={data} />)
}
