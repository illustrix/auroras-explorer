export interface SharedPlan {
  uuid: string
  plan_details: PlanDetails
  view_count: number
  created_at: string
}

export interface PlanDetails {
  uuid: string
  plan_name: string
  planet_natural_id: string
  plan_permits_used: number
  plan_cogc: string
  plan_corphq: boolean
  plan_data: PlanData
  empires: Empire[]
}

export interface PlanData {
  experts: Expert[]
  buildings: Building[]
  workforce: Workforce[]
  infrastructure: Infrastructure[]
}

export interface Expert {
  type: string
  amount: number
}

export interface Building {
  name: string
  amount: number
  active_recipes: ActiveRecipe[]
}

export interface ActiveRecipe {
  amount: number
  recipeid: string
}

export interface Workforce {
  lux1: boolean
  lux2: boolean
  type: string
}

export interface Infrastructure {
  amount: number
  building: string
}

export interface Empire {
  uuid: string
  empire_name: string
  empire_faction: string
  empire_permits_used: number
  empire_permits_total: number
  cx: Cx
}

export interface Cx {
  uuid: string
  cx_name: string
  cx_data: CxData
}

export interface CxData {
  cx_empire: CxEmpire[]
  cx_planets: unknown[]
  ticker_empire: unknown[]
  ticker_planets: unknown[]
}

export interface CxEmpire {
  type: string
  exchange: string
}
