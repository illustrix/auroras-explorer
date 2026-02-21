import { toCamelCaseKeys } from 'es-toolkit'
import { typeid } from 'typeid-js'
import type { UserPlan } from '@/lib/api'
import { getSharedPlan } from '@/lib/planner'
import { getPlanInfo } from '@/lib/planner/util'
import type { SetUserPlanetPlanSchema } from '../api/schema'
import { db } from '../common/db'
import { AppError } from '../common/error'
import {
  handleOrderBy,
  handlePaginationOptions,
  type PaginationOptions,
} from '../common/paging'

export const listGroupPlans = async (
  groupId: string,
  opt: PaginationOptions,
) => {
  const query = db('user_plans')
    .where({ group_id: groupId })
    .orderBy('created_at', 'desc')

  handleOrderBy(query, opt.order, ['created_at', 'updated_at', 'name'])
  handlePaginationOptions(query, opt)

  const plans = await query.select('*')

  return plans
}

export const setUserPlanetPlan = async (
  params: SetUserPlanetPlanSchema,
  operator: string,
) => {
  const plan = await getSharedPlan(params.plan).catch(err => {
    throw new AppError('Failed to fetch plan from planner API', {
      cause: err,
    })
  })

  if (plan.baseplanner.planet_id !== params.planet) {
    throw new AppError('Planet ID does not match the plan data')
  }

  const info = getPlanInfo(plan.baseplanner)

  const [userPlan] = await db('user_plans')
    .insert({
      id: typeid('up').toString(),
      username: params.username,
      group_id: params.groupId,
      planet: params.planet,
      plan: params.plan,
      updated_at: new Date(),
      created_by: operator,
      buildings: info.buildings,
      inputs: info.inputs,
      outputs: info.outputs,
    })
    .returning('*')

  return toCamelCaseKeys(userPlan) as UserPlan
}

export const deleteUserPlanetPlan = async (groupId: string, planId: string) => {
  await db('user_plans').where({ id: planId, group_id: groupId }).delete()
}
