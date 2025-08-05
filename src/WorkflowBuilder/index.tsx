import { useState } from 'react';
import FlowEditor from './components/FlowEditor';
import FlowEditorHeader from './components/FlowEditorHeader';
import WorkflowList from './components/WorkflowList';
import { mockWorkflows } from './mockWorkflows';
import { type Workflow } from './types';
import './WorkflowBuilder.css';

const WorkflowBuilder = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);

  const handleCreateWorkflow = () => {
    // In a real app, you'd create a new workflow object and get a new ID
    setSelectedWorkflowId('new'); // Use a special ID for new workflows
    setCurrentView('editor');
  };

  const handleEditWorkflow = (workflowId: string) => {
    setSelectedWorkflowId(workflowId);
    setCurrentView('editor');
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    setWorkflows(workflows.filter((w) => w.id !== workflowId));
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedWorkflowId(null);
  };

  const selectedWorkflow = workflows.find((w) => w.id === selectedWorkflowId) || null;

  if (currentView === 'list') {
    return (
      <div className="workflow-builder h-full">
        <WorkflowList
          workflows={workflows}
          onCreateWorkflow={handleCreateWorkflow}
          onEditWorkflow={handleEditWorkflow}
          onDeleteWorkflow={handleDeleteWorkflow}
        />
      </div>
    );
  }

  return (
    <div className="workflow-builder flex flex-col h-full">
      <FlowEditorHeader onBack={handleBackToList} workflow={selectedWorkflow} />
      <main className="flex-grow overflow-hidden">
        <FlowEditor workflow={selectedWorkflow} />
      </main>
    </div>
  );
};

export default WorkflowBuilder;
