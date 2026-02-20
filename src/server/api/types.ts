import type { Context } from '../common/context'

export type User = {
  username: string
}

export type Variables = {
  user?: User
  ctx: Context
}
