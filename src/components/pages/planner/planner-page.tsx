import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ReactFlowProvider,
} from '@xyflow/react'
import { GameDataLoadingWrapper } from '@/components/common/game-data-loading-wrapper'

const Planner = () => {
  return (
    <ReactFlow colorMode="dark" minZoom={0.01} maxZoom={5} fitView>
      <Background variant={BackgroundVariant.Dots} />
      <Controls />
    </ReactFlow>
  )
}

const PlannerPageInner = () => {
  return (
    <div className="size-full">
      <Planner />
    </div>
  )
}

export const PlannerPage = () => {
  return (
    <GameDataLoadingWrapper>
      <ReactFlowProvider>
        <PlannerPageInner />
      </ReactFlowProvider>
    </GameDataLoadingWrapper>
  )
}
