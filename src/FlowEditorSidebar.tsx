import React, { useState } from 'react';
import { FlowEditorCollapsible } from './FlowEditorCollapsible';
import { TriggersIcon, ConditionsIcon, ActionsIcon, StagnationIcon, NoActivityIcon, StageChangeIcon, DataChangeIcon, SendIcon, ExitIcon, SendNudgeIcon, CreateTaskIcon, SearchIcon } from './FlowEditorIcons';
import { NodeCategory } from './types';

const onDragStart = (event: React.DragEvent, nodeData: object) => {
  const data = JSON.stringify(nodeData);
  event.dataTransfer.setData('application/reactflow-data', data);
  event.dataTransfer.effectAllowed = 'move';
};

const FlowEditorSidebarNode = ({ data, icon: Icon, nodeBorderColor, iconBgColor }: { data: { type: string; name: string; description: string; icon: string; category: string; status: string; }; icon: React.ComponentType; nodeBorderColor: string; iconBgColor: string; }) => (
  <div
    className={`flex items-center p-3 bg-white border rounded-lg cursor-grab transition-shadow hover:shadow-md ${nodeBorderColor}`}
    onDragStart={(event) => onDragStart(event, data)}
    draggable
  >
    <div className={`w-8 h-8 flex items-center justify-center rounded-md mr-3 ${iconBgColor}`}>
      <Icon />
    </div>
    <div className="flex flex-col">
      <div className="font-medium text-gray-800">{data.type}</div>
      <div className="text-xs text-gray-500">{data.description}</div>
    </div>
  </div>
);

const triggerNodes = [
  { data: { type: 'Deal Stagnation', name: 'Deal Stagnation', description: 'Trigger when deal is stuck in stage', icon: 'stagnation', category: NodeCategory.Trigger, status: 'Configured' }, icon: StagnationIcon },
  { data: { type: 'No Activity', name: 'No Activity', description: 'Trigger when no activity for X days', icon: 'no-activity', category: NodeCategory.Trigger, status: 'Configured' }, icon: NoActivityIcon },
  { data: { type: 'Stage Change', name: 'Stage Change', description: 'Trigger on deal stage progression', icon: 'stage-change', category: NodeCategory.Trigger, status: 'Configured' }, icon: StageChangeIcon },
  { data: { type: 'Data Change', name: 'Data Change', description: 'Trigger on CRM data updates', icon: 'data-change', category: NodeCategory.Trigger, status: 'Configured' }, icon: DataChangeIcon },
];

const conditionNodes = [
  { data: { type: 'Deal Value', name: 'Deal Value', description: 'Check deal value thresholds', icon: 'send', category: NodeCategory.Condition, status: 'Configured' }, icon: SendIcon },
  { data: { type: 'Contact Property', name: 'Contact Property', description: 'Check a contact property value', icon: 'exit', category: NodeCategory.Condition, status: 'Configured' }, icon: ExitIcon },
];

const actionNodes = [
  { data: { type: 'Send Nudge', name: 'Send Nudge', description: 'Display nudge to user', icon: 'send-nudge', category: NodeCategory.Action, status: 'Configured' }, icon: SendNudgeIcon },
  { data: { type: 'Send Email', name: 'Send Email', description: 'Send automated email', icon: 'send', category: NodeCategory.Action, status: 'Configured' }, icon: SendIcon },
  { data: { type: 'Create Task', name: 'Create Task', description: 'Create follow-up task', icon: 'create-task', category: NodeCategory.Action, status: 'Configured' }, icon: CreateTaskIcon },
];

const FlowEditorSidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filterNodes = (nodes: any[]) => {
    if (!searchTerm.trim()) {
      return nodes;
    }
    return nodes.filter(
      (node) =>
        node.data.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.data.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredTriggerNodes = filterNodes(triggerNodes);
  const filteredConditionNodes = filterNodes(conditionNodes);
  const filteredActionNodes = filterNodes(actionNodes);

  const sectionStyles = {
    triggers: {
      nodeBorderColor: 'border-green-200',
      iconBgColor: 'bg-green-50',
      sectionClasses: 'bg-green-50 border-green-200',
      iconBgClass: 'bg-green-500',
      iconClass: 'stroke-white',
    },
    conditions: {
      nodeBorderColor: 'border-blue-200',
      iconBgColor: 'bg-blue-50',
      sectionClasses: 'bg-blue-50 border-blue-200',
      iconBgClass: 'bg-blue-500',
      iconClass: 'stroke-white',
    },
    actions: {
      nodeBorderColor: 'border-purple-200',
      iconBgColor: 'bg-purple-50',
      sectionClasses: 'bg-purple-50 border-purple-200',
      iconBgClass: 'bg-purple-500',
      iconClass: 'stroke-white',
    },
  };

  return (
    <aside className="w-80 bg-white rounded-xl p-3 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search nodes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <FlowEditorCollapsible
        title="Triggers"
        count={filteredTriggerNodes.length}
        icon={TriggersIcon}
        {...sectionStyles.triggers}
      >
        {filteredTriggerNodes.map((node, index) => (
          <FlowEditorSidebarNode key={index} data={node.data} icon={node.icon} {...sectionStyles.triggers} />
        ))}
      </FlowEditorCollapsible>
      <FlowEditorCollapsible
        title="Conditions"
        count={filteredConditionNodes.length}
        icon={ConditionsIcon}
        {...sectionStyles.conditions}
      >
        {filteredConditionNodes.map((node, index) => (
          <FlowEditorSidebarNode key={index} data={node.data} icon={node.icon} {...sectionStyles.conditions} />
        ))}
      </FlowEditorCollapsible>
      <FlowEditorCollapsible
        title="Actions"
        count={filteredActionNodes.length}
        icon={ActionsIcon}
        {...sectionStyles.actions}
      >
        {filteredActionNodes.map((node, index) => (
          <FlowEditorSidebarNode key={index} data={node.data} icon={node.icon} {...sectionStyles.actions} />
        ))}
      </FlowEditorCollapsible>
    </aside>
  );
};

export default FlowEditorSidebar;
