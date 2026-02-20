import { type } from 'arktype'

export const SetUserPlanetPlanSchema = type({
  username: 'string',
  groupId: 'string',
  planet: 'string',
  plan: 'string',
})

export type SetUserPlanetPlanSchema = typeof SetUserPlanetPlanSchema.infer
