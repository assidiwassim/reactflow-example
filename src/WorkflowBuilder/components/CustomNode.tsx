import { Handle, Position } from '@xyflow/react';
import { getIcon, CogIcon } from './FlowEditorIcons';
import { NodeCategory } from './FlowEditorIconsTypes';
import type { CustomNodeData } from './FlowEditorIconsTypes';

const typeStyles = {
  [NodeCategory.Trigger]: {
    borderColor: 'border-green-400',
    textColor: 'text-green-500',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-800',
    handleColor: '#4ade80',
    iconColor: 'text-green-600',
  },
  [NodeCategory.Condition]: {
    borderColor: 'border-blue-400',
    textColor: 'text-blue-500',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    handleColor: '#60a5fa',
    iconColor: 'text-blue-600',
  },
  [NodeCategory.Action]: {
    borderColor: 'border-purple-400',
    textColor: 'text-purple-500',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-800',
    handleColor: '#c084fc',
    iconColor: 'text-purple-600',
  },
};

export function CustomNode({ data }: { data: CustomNodeData }) {
  const Icon = getIcon(data.icon);
  const styles = typeStyles[data.category] || {};

  return (
    <div className={`group bg-white border-2 ${styles.borderColor} rounded-lg shadow-md w-64 hover:shadow-lg transition-shadow relative`}>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button data-action="configure" className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800">
          <CogIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="relative p-4">
        {data.category !== NodeCategory.Trigger && (
          <Handle type="target" position={Position.Left} className="!w-3 !h-3 !absolute !-left-1.5 !top-1/2 !-translate-y-1/2" style={{ backgroundColor: styles.handleColor, border: '2px solid white' }} />
        )}
        <div className="flex items-start gap-4">
          {Icon && (
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${styles.badgeBg}`}>
              <Icon className={`w-6 h-6 ${styles.iconColor}`} />
            </div>
          )}
          <div className="flex flex-col flex-grow">
            <div className="font-bold text-gray-800">{data.name}</div>
            <div className={`text-xs font-semibold uppercase tracking-wider ${styles.textColor}`}>{data.category}</div>
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-2">{data.description}</div>
        <Handle type="source" position={Position.Right} className="!w-3 !h-3 !absolute !-right-1.5 !top-1/2 !-translate-y-1/2" style={{ backgroundColor: styles.handleColor, border: '2px solid white' }} />
      </div>
      {data.isConfigured && (
        <div className="px-4 pb-4">
          <div className={`text-xs font-medium px-3 py-1 rounded-md ${styles.badgeBg} ${styles.badgeText}`}>
            Configured
          </div>
        </div>
      )}
    </div>
  );
}
