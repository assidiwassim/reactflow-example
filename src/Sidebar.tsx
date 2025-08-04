import React, { useState } from 'react';
import { Collapsible } from './Collapsible';
import { TriggersIcon, ConditionsIcon, ActionsIcon, StagnationIcon, NoActivityIcon, StageChangeIcon, DataChangeIcon, SendIcon, ExitIcon, SendNudgeIcon, CreateTaskIcon, SearchIcon } from './icons';

const onDragStart = (event: React.DragEvent, nodeData: { label: string; description: string; icon: string }) => {
  const data = JSON.stringify(nodeData);
  event.dataTransfer.setData('application/reactflow', data);
  event.dataTransfer.effectAllowed = 'move';
};

const Node = ({ data, icon: Icon, nodeBorderColor, iconBgColor }: { data: { label: string; description: string; icon: string }; icon: React.ComponentType; nodeBorderColor: string; iconBgColor: string; }) => (
  <div
    className={`flex items-center p-3 bg-white border rounded-lg cursor-grab transition-shadow hover:shadow-md ${nodeBorderColor}`}
    onDragStart={(event) => onDragStart(event, data)}
    draggable
  >
    <div className={`w-8 h-8 flex items-center justify-center rounded-md mr-3 ${iconBgColor}`}>
      <Icon />
    </div>
    <div className="flex flex-col">
      <div className="font-medium text-gray-800">{data.label}</div>
      <div className="text-xs text-gray-500">{data.description}</div>
    </div>
  </div>
);

const triggerNodes = [
  { data: { label: 'Deal Stagnation', description: 'Trigger when deal is stuck in stage', icon: 'stagnation' }, icon: StagnationIcon },
  { data: { label: 'No Activity', description: 'Trigger when no activity for X days', icon: 'no-activity' }, icon: NoActivityIcon },
  { data: { label: 'Stage Change', description: 'Trigger on deal stage progression', icon: 'stage-change' }, icon: StageChangeIcon },
  { data: { label: 'Data Change', description: 'Trigger on CRM data updates', icon: 'data-change' }, icon: DataChangeIcon },
];

const conditionNodes = [
  { data: { label: 'Send Email', description: 'Send an email to a contact', icon: 'send' }, icon: SendIcon },
  { data: { label: 'Exit Workflow', description: 'End the workflow for a contact', icon: 'exit' }, icon: ExitIcon },
];

const actionNodes = [
  { data: { label: 'Send Nudge', description: 'Display nudge to user', icon: 'send-nudge' }, icon: SendNudgeIcon },
  { data: { label: 'Send Email', description: 'Send automated email', icon: 'send' }, icon: SendIcon },
  { data: { label: 'Create Task', description: 'Create follow-up task', icon: 'create-task' }, icon: CreateTaskIcon },
];

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filterNodes = (nodes: any[]) => {
    if (!searchTerm.trim()) {
      return nodes;
    }
    return nodes.filter(
      (node) =>
        node.data.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    <aside className="w-80 bg-white rounded-xl p-3 overflow-y-auto flex flex-col gap-4">
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
      <Collapsible
        title="Triggers"
        count={filteredTriggerNodes.length}
        icon={TriggersIcon}
        {...sectionStyles.triggers}
      >
        {filteredTriggerNodes.map((node, index) => (
          <Node key={index} data={node.data} icon={node.icon} {...sectionStyles.triggers} />
        ))}
      </Collapsible>
      <Collapsible
        title="Conditions"
        count={filteredConditionNodes.length}
        icon={ConditionsIcon}
        {...sectionStyles.conditions}
      >
        {filteredConditionNodes.map((node, index) => (
          <Node key={index} data={node.data} icon={node.icon} {...sectionStyles.conditions} />
        ))}
      </Collapsible>
      <Collapsible
        title="Actions"
        count={filteredActionNodes.length}
        icon={ActionsIcon}
        {...sectionStyles.actions}
      >
        {filteredActionNodes.map((node, index) => (
          <Node key={index} data={node.data} icon={node.icon} {...sectionStyles.actions} />
        ))}
      </Collapsible>
    </aside>
  );
};

export default Sidebar;
