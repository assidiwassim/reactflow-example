import { Handle, Position } from '@xyflow/react';
import { getIcon } from './icons';

export type CustomNodeData = {
  label: string;
  description: string;
  icon: string;
};

export function CustomNode({ data }: { data: CustomNodeData }) {
  const Icon = data.icon ? getIcon(data.icon) : null;

  if (!Icon) {
    return null;
  }

  return (
    <div className="custom-node">
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
