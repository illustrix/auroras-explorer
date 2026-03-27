import axios from 'axios'
import type { SharedPlan } from './types'

const plannerClient = axios.create({
  baseURL: 'https://api.prunplanner.org',
  timeout: 10000,
})

export const getSharedPlan = async (id: string) => {
  const res = await plannerClient.get<SharedPlan>(`/planning/shared/${id}`)
  return res.data
}
