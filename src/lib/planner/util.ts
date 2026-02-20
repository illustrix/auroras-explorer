import type { BasePlanner } from './types'

export const parseRecipeId = (recipeId: string) => {
  const [building, recipe] = recipeId.split('#')
  const [inputs, outputs] = recipe.split('=>').map(items =>
    items.split(' ').map(item => {
      const [count, ticker] = item.split('x')
      return {
        count: +count,
        ticker,
      }
    }),
  )
  return {
    building,
    inputs,
    outputs,
  }
}

export const getPlanInfo = (plan: BasePlanner) => {
  const inputs = new Set<string>()
  const outputs = new Set<string>()

  for (const building of plan.baseplanner_data.buildings) {
    for (const recipe of building.active_recipes) {
      const r = parseRecipeId(recipe.recipeid)
      for (const input of r.inputs) {
        inputs.add(input.ticker)
      }
      for (const output of r.outputs) {
        outputs.add(output.ticker)
      }
    }
  }

  return {
    inputs: Array.from(inputs),
    outputs: Array.from(outputs),
  }
}
