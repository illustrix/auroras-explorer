import type { Recipe } from '@/lib/fio'
import {
  addRecipeRelationToGraph,
  addRecipeToGraphAsNode,
  type Graph,
  getRecipesByInput,
  getRecipesByOutput,
} from './graph'

export const addMaterialRelatedRecipesToGraph = (
  graph: Graph,
  recipes: Recipe[],
  mat: string,
) => {
  const addedKeys = new Set<string>()
  const currentRecipes = getRecipesByOutput(recipes, mat)
  if (currentRecipes.length > 0) {
    for (const recipe of currentRecipes) {
      addRecipeToGraphAsNode(graph, recipe)

      for (const input of recipe.Inputs) {
        const inputRecipes = getRecipesByOutput(recipes, input.Ticker)
        for (const inputRecipe of inputRecipes) {
          addRecipeRelationToGraph(graph, inputRecipe, recipe)

          if (addedKeys.has(inputRecipe.RecipeName)) {
            continue
          }
          addRecipeToGraphAsNode(graph, inputRecipe)
          addedKeys.add(inputRecipe.RecipeName)
        }
      }
    }
  }

  const furtherRecipes = getRecipesByInput(recipes, mat)
  for (const recipe of furtherRecipes) {
    addRecipeToGraphAsNode(graph, recipe)
    for (const currentRecipe of currentRecipes) {
      addRecipeRelationToGraph(graph, currentRecipe, recipe)
    }
  }
}

export const addBuildingRelatedRecipesToGraph = (
  graph: Graph,
  recipes: Recipe[],
  building: string,
) => {
  const buildingRecipes = recipes.filter(
    recipe => recipe.BuildingTicker === building,
  )

  for (const recipe of buildingRecipes) {
    addRecipeToGraphAsNode(graph, recipe)
  }
}
