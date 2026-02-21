import type { ContractPO, UserContractConditionPO } from '@/server/store/type'

export interface Contract extends ContractPO {
  Conditions: UserContractConditionPO[]
  CustomerCompanyName: string
  ProviderCompanyName: string
  CustomerCompanyCode: string
  ProviderCompanyCode: string
}

export interface UserInfo {
  key: string
  username: string
  companyName: string
  companyCode: string
  lastContSubmitAt: string
  lastContSyncAt: string
  lastContSyncStatus: string
}

export interface UserPlan {
  id: string
  username: string
  groupId: string
  planet: string
  plan: string
  createdAt: string
  updatedAt: string
  createdBy: string
  buildings: string[]
  inputs: string[]
  outputs: string[]
}
