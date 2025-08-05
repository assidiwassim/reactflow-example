import React from 'react';
import { EditIcon, DeleteIcon, PlusIcon } from './FlowEditorIcons';
import { type Workflow } from '../types';

interface WorkflowListProps {
  workflows: Workflow[];
  onSelectWorkflow: (workflowId: string) => void;
  onCreateWorkflow: () => void;
  onDeleteWorkflow: (workflowId: string) => void;
}

const WorkflowList: React.FC<WorkflowListProps> = ({
  workflows,
  onSelectWorkflow,
  onCreateWorkflow,
  onDeleteWorkflow,
}) => {
  return (
    <div className="flex flex-col h-full ">
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
      <main className="flex-grow p-5 overflow-auto">
        <div className="bg-white rounded-lg border">
          <ul className="divide-y divide-gray-200">
            {workflows.map((workflow) => (
              <li key={workflow.id} className="p-5 flex justify-between items-center hover:bg-gray-50">
                <div className="flex-grow">
                  <p className="font-semibold text-lg text-gray-800">{workflow.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{workflow.description}</p>
                  <p className="text-xs text-gray-400 mt-2">Last Modified: {workflow.lastModified}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-xs font-bold border  leading-5 rounded-full ${  
                      workflow.status === 'Published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {workflow.status}
                  </span>
                  <button
                    onClick={() => onSelectWorkflow(workflow.id)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <EditIcon />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteWorkflow(workflow.id); }} 
                    className="text-red-400 hover:text-red-500"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};


export default WorkflowList;

