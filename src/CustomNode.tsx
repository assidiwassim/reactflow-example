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
    <div className="group relative flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-md min-w-[220px]">
      <button 
        className="absolute top-[-10px] right-[-10px] bg-white border rounded-full w-5 h-5 flex items-center justify-center text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
        onClick={() => deleteElements({ nodes: [{ id }] })}
      >
        ×
      </button>
      <Handle type="target" position={Position.Left} className="!bg-gray-400" />
      <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md mr-3">
        <Icon />
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800">{data.label}</span>
        <span className="text-sm text-gray-500">{data.description}</span>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-gray-400" />
    </div>
  );
}
