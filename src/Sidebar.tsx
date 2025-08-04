import React from 'react';
import { Collapsible } from './Collapsible';
import { TriggersIcon, ConditionsIcon, ActionsIcon, StagnationIcon, NoActivityIcon, StageChangeIcon, DataChangeIcon, SendIcon, ExitIcon, SendNudgeIcon, CreateTaskIcon } from './icons';

const onDragStart = (event: React.DragEvent, nodeData: { label: string; description: string; icon: string }) => {
  const data = JSON.stringify(nodeData);
  event.dataTransfer.setData('application/reactflow', data);
  event.dataTransfer.effectAllowed = 'move';
};

const Node = ({ data, icon: Icon }: { data: { label: string; description: string; icon: string }; icon: React.ComponentType }) => (
  <div
    className="draggable-node"
    onDragStart={(event) => onDragStart(event, data)}
    draggable
  >
    <div className="node-icon-wrapper">
      <Icon />
    </div>
    <div className="node-content">
      <div className="node-title">{data.label}</div>
      <div className="node-description">{data.description}</div>
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
  return (
    <aside className="sidebar">
      <Collapsible
        className="triggers-section"
        title="Triggers"
        count={triggerNodes.length}
        icon={TriggersIcon}
        color="#f0fdf4"
        iconBgColor="#10b981"
        iconColor="icon-white"
      >
        {triggerNodes.map((node, index) => (
          <Node key={index} data={node.data} icon={node.icon} />
        ))}
      </Collapsible>
      <Collapsible
        className="conditions-section"
        title="Conditions"
        count={conditionNodes.length}
        icon={ConditionsIcon}
        color="#eff6ff"
        iconBgColor="#3b82f6"
        iconColor="icon-white"
      >
        {conditionNodes.map((node, index) => (
          <Node key={index} data={node.data} icon={node.icon} />
        ))}
      </Collapsible>
      <Collapsible
        className="actions-section"
        title="Actions"
        count={actionNodes.length}
        icon={ActionsIcon}
        color="#fbf5ff"
        iconBgColor="#9333ea"
        iconColor="icon-white"
      >
        {actionNodes.map((node, index) => (
          <Node key={index} data={node.data} icon={node.icon} />
        ))}
      </Collapsible>
    </aside>
  );
};

export default Sidebar;
