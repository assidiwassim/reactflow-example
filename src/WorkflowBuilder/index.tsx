import { useState, useEffect, useCallback } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import type {
  Edge,
  Node,
  Connection,
} from '@xyflow/react';
import FlowEditor from './components/FlowEditor';
import Modal from './components/Modal';

import FlowEditorHeader from './components/FlowEditorHeader';
import WorkflowList from './components/WorkflowList';
import { mockWorkflows } from './mockWorkflows';
import type { Workflow } from './types';
import './WorkflowBuilder.css';

const WorkflowBuilder = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);

  const [nodes, setNodes, onNodesChangeOriginal] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChangeOriginal] = useEdgesState<Edge>([]);

  const onNodesChange: typeof onNodesChangeOriginal = (changes) => {
    onNodesChangeOriginal(changes);
    setHasUnsavedChanges(true);
  };

  const onEdgesChange: typeof onEdgesChangeOriginal = (changes) => {
    onEdgesChangeOriginal(changes);
    setHasUnsavedChanges(true);
  };

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'success'>('idle');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [workflowToDeleteId, setWorkflowToDeleteId] = useState<string | null>(null);

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

  const handleSelectWorkflow = (workflowId: string) => {
    setSelectedWorkflowId(workflowId);
    setCurrentView('editor');
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    setWorkflowToDeleteId(workflowId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteWorkflow = () => {
    if (workflowToDeleteId) {
      setWorkflows(workflows.filter(w => w.id !== workflowToDeleteId));
      setWorkflowToDeleteId(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleWorkflowNameChange = (newName: string) => {
    if (selectedWorkflowId) {
      setWorkflows(workflows.map(w => w.id === selectedWorkflowId ? { ...w, name: newName, lastModified: new Date().toISOString() } : w));
      setHasUnsavedChanges(true);
    }
  };

  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds: Edge[]) => addEdge(params, eds)), [setEdges]);

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
      setHasUnsavedChanges(false);

      // Reset status after a few seconds
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const handlePublishWorkflow = () => {
    setIsPublishModalOpen(true);
  };

  const confirmPublishWorkflow = () => {
    if (!selectedWorkflowId) return;

    setIsPublishModalOpen(false);
    setPublishStatus('publishing');

    // Simulate a publish operation
    setTimeout(() => {
      setWorkflows(workflows.map(w =>
        w.id === selectedWorkflowId
          ? { ...w, status: 'Published', lastModified: new Date().toISOString() }
          : w
      ));
      setPublishStatus('success');

      // Reset status after a few seconds
      setTimeout(() => {
        setPublishStatus('idle');
      }, 2000);
    }, 1000);
  };

  const handleBackToList = () => {
    if (hasUnsavedChanges) {
      setIsDiscardModalOpen(true);
    } else {
      setCurrentView('list');
      setSelectedWorkflowId(null);
    }
  };

  const confirmDiscardChanges = () => {
    setIsDiscardModalOpen(false);
    setCurrentView('list');
    setSelectedWorkflowId(null);
  };

  const selectedWorkflow = workflows.find((w) => w.id === selectedWorkflowId) || null;

  useEffect(() => {
    if (selectedWorkflow) {
      setNodes(selectedWorkflow.nodes || []);
      setEdges(selectedWorkflow.edges || []);
      setHasUnsavedChanges(false); // Reset unsaved changes when a workflow is loaded
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [selectedWorkflow, setNodes, setEdges]);

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      {currentView === 'list' ? (
        <WorkflowList 
          workflows={workflows} 
          onSelectWorkflow={handleSelectWorkflow} 
          onCreateWorkflow={handleCreateWorkflow} 
          onDeleteWorkflow={handleDeleteWorkflow}
        />
      ) : (
        <>
          <FlowEditorHeader 
            onBack={handleBackToList}
            workflow={selectedWorkflow}
            onWorkflowNameChange={handleWorkflowNameChange} 
            onSave={handleSaveWorkflow}
            saveStatus={saveStatus}
            onPublish={handlePublishWorkflow}
            publishStatus={publishStatus}
            hasUnsavedChanges={hasUnsavedChanges}
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
        </>
      )}
      <Modal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={confirmPublishWorkflow}
        title="Publish Workflow"
      >
        Are you sure you want to publish this workflow? This action cannot be undone.
      </Modal>
      
      <Modal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        onConfirm={confirmDiscardChanges}
        title="Discard Changes?"
        confirmText="Discard"
        cancelText="Cancel"
      >
        You have unsaved changes. Are you sure you want to discard them and go back to the list?
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteWorkflow}
        title="Delete Workflow?"
        confirmText="Delete"
        cancelText="Cancel"
      >
        Are you sure you want to delete this workflow? This action cannot be undone.
      </Modal>
    </div>
  );
};

export default WorkflowBuilder;
