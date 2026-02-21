import type { FC, ReactNode } from 'react'
import { autoOpenModal } from 'redyc'
import { Dialog as BaseDialog, DialogContent } from '@/components/ui/dialog'

export const Dialog: FC<{
  open: boolean
  onClose?: () => void
  children: ReactNode
}> = ({ open, onClose, children }) => {
  return (
    <BaseDialog open={open} onOpenChange={open => !open && onClose?.()}>
      <DialogContent>{children}</DialogContent>
    </BaseDialog>
  )
}

export const AutoOpenDialog = autoOpenModal(Dialog)
