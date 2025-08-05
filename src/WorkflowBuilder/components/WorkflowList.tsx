import React from 'react';
import { DeleteIcon, PlusIcon, ExecutionLogIcon } from './FlowEditorIcons';
import { type Workflow } from '../types';

interface WorkflowListProps {
  workflows: Workflow[];
  onSelectWorkflow: (workflowId: string) => void;
  onCreateWorkflow: () => void;
  onDeleteWorkflow: (workflowId: string) => void;
  onShowLogs: (workflowId: string) => void;
}

const WorkflowList: React.FC<WorkflowListProps> = ({
  workflows,
  onSelectWorkflow,
  onCreateWorkflow,
  onDeleteWorkflow,
  onShowLogs,
}) => {
  const publishedWorkflows = workflows.filter(w => w.status === 'Published');
  const draftWorkflows = workflows.filter(w => w.status === 'Draft');

  const renderWorkflowList = (list: Workflow[]) => (
    <div className="bg-white rounded-lg border">
      <ul className="divide-y divide-gray-200">
        {list.map((workflow) => (
          <li key={workflow.id} onClick={() => onSelectWorkflow(workflow.id)} className="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
            <div className="flex-grow">
              <p className="font-semibold text-gray-800">{workflow.name}</p>
              <p className="text-sm text-gray-500 mt-1">{workflow.description}</p>
              <div className="flex items-center text-xs text-gray-400 mt-2">
                <span>Last Modified: {workflow.lastModified}</span>
                <span className="mx-2">•</span>
                <span className="font-semibold text-gray-600">{workflow.executionCount} Executions</span>
              </div>
            </div>
            <div className="flex items-center gap-4 ml-4">
              <span
                className={`px-3 py-1 text-xs font-bold leading-5 rounded-full ${  
                  workflow.status === 'Published'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                }`}
              >
                {workflow.status}
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); onShowLogs(workflow.id); }}
                className="text-gray-400 hover:text-blue-500 p-1 rounded-full hover:bg-gray-100"
                title="View Logs"
              >
                <ExecutionLogIcon />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDeleteWorkflow(workflow.id); }} 
                className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100"
                title="Delete Workflow"
              >
                <DeleteIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderEmptyState = (message: string) => (
    <div className="text-center py-10 border-2 border-dashed rounded-lg bg-gray-50">
      <p className="text-gray-500">{message}</p>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white p-5 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Workflows</h1>
            <p className="text-sm text-gray-500">Manage and create your workflows</p>
          </div>
          <button
            onClick={onCreateWorkflow}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon />
            New Workflow
          </button>
        </div>
      </header>
      <main className="flex-grow p-6 overflow-auto">
        <div>
          <h2 className="text-base font-semibold text-gray-600 mb-3 ml-1">Published ({publishedWorkflows.length})</h2>
          {publishedWorkflows.length > 0 ? renderWorkflowList(publishedWorkflows) : renderEmptyState('No published workflows yet.')}
        </div>
        <div className="mt-8">
          <h2 className="text-base font-semibold text-gray-600 mb-3 ml-1">Drafts ({draftWorkflows.length})</h2>
          {draftWorkflows.length > 0 ? renderWorkflowList(draftWorkflows) : renderEmptyState('No draft workflows. Create one to get started!')}
        </div>
      </main>
    </div>
  );
};


export default WorkflowList;

