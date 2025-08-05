import { useState, useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, addEdge, type Connection, type Edge, type Node } from '@xyflow/react';
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

      const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

    const handleCreateWorkflow = () => {
    const newWorkflow: Workflow = {
      id: `wf_${+new Date()}`,
      name: 'Untitled Workflow',
      description: 'A new workflow',
      nodes: [],
      edges: [],
      status: 'Draft',
      lastModified: new Date().toISOString(),
    };
    setWorkflows(prev => [...prev, newWorkflow]);
    setSelectedWorkflowId(newWorkflow.id);
    setCurrentView('editor');
  };

  const handleEditWorkflow = (workflowId: string) => {
    setSelectedWorkflowId(workflowId);
    setCurrentView('editor');
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    setWorkflows(workflows.filter((w) => w.id !== workflowId));
  };

  const handleWorkflowNameChange = (newName: string) => {
    if (selectedWorkflowId) {
      setWorkflows(workflows.map(w => w.id === selectedWorkflowId ? { ...w, name: newName, lastModified: new Date().toISOString() } : w));
    }
  };

    const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const handleSaveWorkflow = () => {
    if (!selectedWorkflowId) return;

    setSaveStatus('saving');

    // Simulate a save operation
    setTimeout(() => {
      setWorkflows(workflows.map(w => 
        w.id === selectedWorkflowId 
          ? { ...w, nodes, edges, lastModified: new Date().toISOString() } 
          : w
      ));
      setSaveStatus('success');

      // Reset status after a few seconds
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedWorkflowId(null);
  };

  const selectedWorkflow = workflows.find((w) => w.id === selectedWorkflowId) || null;

  useEffect(() => {
    if (selectedWorkflow) {
      setNodes(selectedWorkflow.nodes || []);
      setEdges(selectedWorkflow.edges || []);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [selectedWorkflow, setNodes, setEdges]);

  

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
      <FlowEditorHeader 
        onBack={handleBackToList} 
        workflow={selectedWorkflow} 
        onWorkflowNameChange={handleWorkflowNameChange} 
        onSave={handleSaveWorkflow}
        saveStatus={saveStatus}
      />
      <main className="flex-grow overflow-hidden">
        <FlowEditor 
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          setNodes={setNodes}
          
        />
      </main>
    </div>
  );
};

export default WorkflowBuilder;
