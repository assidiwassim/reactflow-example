import { Handle, Position, useReactFlow } from '@xyflow/react';
import { getIcon } from './icons';

export type CustomNodeData = {
  label: string;
  description: string;
  icon: string;
};

export function CustomNode({ id, data }: { id: string; data: CustomNodeData }) {
  const { deleteElements } = useReactFlow();
  const Icon = data.icon ? getIcon(data.icon) : null;

  if (!Icon) {
    return null;
  }

  return (
    <div className="custom-node">
      <button className="delete-btn" onClick={() => deleteElements({ nodes: [{ id }] })}>×</button>
      <Handle type="target" position={Position.Left} />
      <div className="node-icon-wrapper">
        <Icon />
      </div>
      <div className="node-content">
        <span className="node-label">{data.label}</span>
        <span className="node-description">{data.description}</span>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
