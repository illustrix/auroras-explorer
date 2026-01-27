import Dagre from '@dagrejs/dagre'
import { type Node, Position } from '@xyflow/react'
import type { Recipe } from '@/lib/fio'
import type { Graph } from './graph'

const nodeWidth = 100
const nodeHeight = 100

const getSize = (node: Node) => {
  if (node.type === 'MaterialNode') {
    return { width: 50, height: 50 }
  }
  if (node.type === 'RecipeNode') {
    return {
      width: (node.data.recipe as Recipe).Inputs.length * 52 + 200,
      height: 100,
    }
  }
  return { width: nodeWidth, height: nodeHeight }
}

export const layout = (graph: Graph): Graph => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: 'LR' })

  graph.edges.forEach(edge => {
    g.setEdge(edge.source, edge.target)
  })
  graph.nodes.forEach(node => {
    g.setNode(node.id, {
      ...node,
      ...getSize(node),
    })
  })

  Dagre.layout(g)

  return {
    nodes: graph.nodes.map(node => {
      const position = g.node(node.id)
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const { width, height } = getSize(node)
      const x = position.x - width / 2
      const y = position.y - height / 2

      return {
        ...node,
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        position: { x, y },
      }
    }),
    edges: graph.edges,
  }
}
