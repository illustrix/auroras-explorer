export interface InputConfig {
  location: string
  currency: string
  sourceConfig: string
}

interface AutoConfigItem {
  amount: number
  commodity: string
  price: number
}

interface AutoConfig {
  template: string
  currency: string
  items: AutoConfigItem[]
  location: string
}

export function transformConfig(input: InputConfig): AutoConfig {
  const xitAct = JSON.parse(input.sourceConfig)

  if (!xitAct.groups || !Array.isArray(xitAct.groups)) {
    throw new Error('Invalid XIT ACT config: missing "groups" array.')
  }

  const items: AutoConfigItem[] = []

  const materials = xitAct.groups[0]?.materials
  if (!materials || typeof materials !== 'object') {
    throw new Error(`Invalid XIT ACT config: missing "materials" field.`)
  }

  for (const [ticker, amount] of Object.entries(materials)) {
    if (typeof amount !== 'number') {
      throw new Error(`Invalid amount for material ${ticker}: ${amount}`)
    }
    const commodity = ticker

    items.push({
      amount,
      commodity,
      price: 1,
    })
  }

  return {
    template: 'BUY',
    currency: input.currency,
    location: input.location,
    items,
  }
}
