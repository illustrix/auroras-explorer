import { Handle, type NodeProps, Position } from '@xyflow/react'
import type { FC, ReactNode } from 'react'
import type { Recipe } from '@/lib/fio'
import { MaterialTile } from '../../game/material-tile'
// import FaMinus from '~icons/fa/minus'
// import FaPlus from '~icons/fa/plus'
import { RecipePreview } from './recipe-preview'

const Node: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {children}

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      {/*
      <Handle
        type="target"
        position={Position.Left}
        className="flex justify-center items-center"
        style={{
          cursor: 'pointer',
          width: '10px',
          height: '10px',
          border: 'none',
          background: 'black',
          color: 'white',
        }}
      >
        <FaPlus className="size-1" />
      </Handle>
      <Handle
        type="source"
        position={Position.Right}
        className="flex justify-center items-center"
        style={{
          cursor: 'pointer',
          width: '10px',
          height: '10px',
          border: 'none',
          background: 'black',
          color: 'white',
        }}
      >
        <FaMinus className="size-1" />
      </Handle> */}
    </>
  )
}

export const RecipeNode: FC<NodeProps> = ({ data }) => {
  return (
    <Node>
      <RecipePreview recipe={data.recipe as Recipe} />
    </Node>
  )
}

export const MaterialNode: FC<NodeProps> = ({ data }) => {
  return (
    <Node>
      <MaterialTile
        ticker={data.ticker as string}
        number={data.number as number}
      />
    </Node>
  )
}
