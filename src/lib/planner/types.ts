export interface SharedPlan {
  uuid: string
  created_date: string
  view_count: number
  baseplanner: BasePlanner
}

export interface BasePlanner {
  name: string
  uuid: string
  planet_id: string
  faction: string
  permits_used: number
  permits_total: number
  override_empire: boolean
  baseplanner_data: BasePlannerData
  empires: Empire[]
}

export interface BasePlannerData {
  planet: Planet
  infrastructure: Infrastructure[]
  buildings: Building[]
}

export interface Planet {
  planetid: string
  permits: number
  corphq: boolean
  cogc: string
  experts: Expert[]
  workforce: Workforce[]
}

export interface Expert {
  type: string
  amount: number
}

export interface Workforce {
  type: string
  lux1: boolean
  lux2: boolean
}

export interface Infrastructure {
  building: string
  amount: number
}

export interface Building {
  name: string
  amount: number
  active_recipes: ActiveRecipe[]
}

export interface ActiveRecipe {
  recipeid: string
  amount: number
}

export interface Empire {
  faction: string
  permits_used: number
  permits_total: number
  uuid: string
  name: string
  use_fio_storage: boolean
}
