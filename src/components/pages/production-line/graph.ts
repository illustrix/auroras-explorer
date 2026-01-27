import { type Edge, type Node, Position } from '@xyflow/react'
import type { Recipe } from '@/lib/fio'

export interface Graph {
  nodes: Node[]
  edges: Edge[]
}

export const addRecipeToGraph = (graph: Graph, recipe: Recipe) => {
  const initialNodes = recipe.Inputs.map((input, index) => {
    return {
      id: input.Ticker,
      type: 'MaterialNode',
      data: { ticker: input.Ticker, number: input.Amount },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      position: { x: 0, y: index * 100 },
    }
  })
  graph.nodes.push(...initialNodes)
  const output = recipe.Outputs[0] // Assume only one output
  graph.nodes.push({
    id: output.Ticker,
    type: 'MaterialNode',
    data: {
      ticker: output.Ticker,
      number: output.Amount,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    position: { x: 0, y: 0 },
  })
  const initialEdges = recipe.Inputs.map(input => {
    return {
      id: `e${input.Ticker}to${output.Ticker}`,
      source: input.Ticker,
      target: output.Ticker,
      animated: true,
    }
  })
  graph.edges.push(...initialEdges)
}

export const getRecipesByOutput = (
  recipes: Recipe[],
  outputTicker: string,
): Recipe[] => {
  return recipes.filter(recipe => {
    return recipe.Outputs.find(output => output.Ticker === outputTicker)
  })
}

export const getRecipesByInput = (
  recipes: Recipe[],
  inputTicker: string,
): Recipe[] => {
  return recipes.filter(recipe => {
    return recipe.Inputs.find(input => input.Ticker === inputTicker)
  })
}

export const addRecipeToGraphAsNode = (graph: Graph, recipe: Recipe) => {
  graph.nodes.push({
    id: recipe.RecipeName,
    type: 'RecipeNode',
    data: { recipe },
    position: { x: 0, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  })
}

export const addRecipeRelationToGraph = (
  graph: Graph,
  from: Recipe,
  to: Recipe,
) => {
  graph.edges.push({
    id: `e${from.RecipeName}to${to.RecipeName}`,
    source: from.RecipeName,
    target: to.RecipeName,
    animated: true,
  })
}
