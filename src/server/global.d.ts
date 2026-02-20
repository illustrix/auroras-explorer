import type { User } from './api/types'
import type { Context } from './common/context'

declare module 'hono' {
  export type Env = {
    Variables: {
      user?: User
      ctx: Context
    }
    Bindings: object
  }
}
