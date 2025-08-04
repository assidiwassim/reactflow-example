import React, { useState } from 'react';
import { TriggerIcon, StagnationIcon, NoActivityIcon, StageChangeIcon, DataChangeIcon } from './icons';

const onDragStart = (event: React.DragEvent, nodeType: string, label: string, description: string, icon: string) => {
  const nodeData = { type: nodeType, label, description, icon };
  event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
  event.dataTransfer.effectAllowed = 'move';
};

interface DraggableNodeProps {
  type: string;
  label: string;
  description: string;
  icon: React.FC;
}

const DraggableNode = ({ type, label, description, icon: Icon, iconName }: DraggableNodeProps & { iconName: string }) => (
  <div className="draggable-node" onDragStart={(event) => onDragStart(event, type, label, description, iconName)} draggable>
    <div className="node-icon-wrapper"><Icon /></div>
    <div className="node-content">
      <span className="node-label">{label}</span>
      <span className="node-description">{description}</span>
    </div>
  </div>
);

const Sidebar = () => {
  const [isTriggersOpen, setTriggersOpen] = useState(true);

  return (
    <aside className="sidebar">
      <div className="collapsible-section">
        <button className="section-header" onClick={() => setTriggersOpen(!isTriggersOpen)}>
            <div className="section-title">
                <div className='section-icon-wrapper trigger'><TriggerIcon /></div>
                <span>Triggers</span>
            </div>
            <div className='section-info'>
                <span>4 available</span>
                <svg className={`chevron ${isTriggersOpen ? 'open' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
        </button>
        {isTriggersOpen && (
          <div className="section-content">
            <DraggableNode type="custom" label="Deal Stagnation" description="Trigger when deal is stuck in stage" icon={StagnationIcon} iconName="StagnationIcon" />
            <DraggableNode type="custom" label="No Activity" description="Trigger when no activity for X days" icon={NoActivityIcon} iconName="NoActivityIcon" />
            <DraggableNode type="custom" label="Stage Change" description="Trigger on deal stage progression" icon={StageChangeIcon} iconName="StageChangeIcon" />
            <DraggableNode type="custom" label="Data Change" description="Trigger on CRM data updates" icon={DataChangeIcon} iconName="DataChangeIcon" />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
