import type { User } from '../api/types'
import type { Services } from '../services'

export class Context {
  public user?: User

  constructor(public readonly services: Services) {}
}
