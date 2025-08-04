import { Handle, Position } from '@xyflow/react';
import { getIcon } from './icons';

const typeStyles = {
  trigger: {
    borderColor: 'border-green-400',
    textColor: 'text-green-500',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-800',
    handleColor: '#4ade80',
  },
  condition: {
    borderColor: 'border-blue-400',
    textColor: 'text-blue-500',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    handleColor: '#60a5fa',
  },
  action: {
    borderColor: 'border-purple-400',
    textColor: 'text-purple-500',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-800',
    handleColor: '#c084fc',
  },
};

export type CustomNodeData = {
  label: string;
  description: string;
  icon: string;
  type: 'trigger' | 'condition' | 'action';
  status: string;
};

export function CustomNode({ data }: { data: CustomNodeData }) {
  const Icon = getIcon(data.icon);
  const styles = typeStyles[data.type] || {};

  return (
    <div className={`bg-white border-2 ${styles.borderColor} rounded-lg shadow-md w-64 hover:shadow-lg transition-shadow`}>
      <div className="relative p-4">
        <Handle type="target" position={Position.Left} className="!w-3 !h-3 !absolute !-left-1.5 !top-1/2 !-translate-y-1/2" style={{ backgroundColor: styles.handleColor, border: '2px solid white' }} />
        <div className="flex items-start">
          {Icon && <div className="w-8 h-8 flex items-center justify-center rounded-md mr-4"><Icon /></div>}
          <div className="flex flex-col flex-grow">
            <div className="font-bold text-gray-800">{data.label}</div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${styles.textColor}`}>{data.type}</div>
            <div className="text-sm text-gray-600 mt-1">{data.description}</div>
          </div>
        </div>
        <Handle type="source" position={Position.Right} className="!w-3 !h-3 !absolute !-right-1.5 !top-1/2 !-translate-y-1/2" style={{ backgroundColor: styles.handleColor, border: '2px solid white' }} />
      </div>
      {data.status === 'Configured' && (
        <div className="px-4 pb-4">
          <div className={`text-xs font-medium px-3 py-1 rounded-md ${styles.badgeBg} ${styles.badgeText}`}>
            {data.status}
          </div>
        </div>
      )}
    </div>
  );
}
