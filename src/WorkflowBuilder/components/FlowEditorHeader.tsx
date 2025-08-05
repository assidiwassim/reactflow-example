import React, { useState, useEffect } from 'react';
import { SaveIcon, PlayIcon } from './FlowEditorIcons';
import { type Workflow } from '../types';

interface FlowEditorHeaderProps {
  onBack: () => void;
  workflow: Workflow | null;
  onWorkflowNameChange: (newName: string) => void;
}

const FlowEditorHeader: React.FC<FlowEditorHeaderProps> = ({ onBack, workflow, onWorkflowNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [workflowName, setWorkflowName] = useState(workflow?.name || 'New Workflow');

  useEffect(() => {
    setWorkflowName(workflow?.name || 'New Workflow');
  }, [workflow?.name]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkflowName(e.target.value);
  };

  const handleNameSave = () => {
    setIsEditing(false);
    if (workflow && workflowName !== workflow.name) {
      onWorkflowNameChange(workflowName);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameSave();
    }
  };

  const status = workflow?.status || (workflow === null ? 'Draft' : undefined);
  const lastModified = workflow?.lastModified ? new Date(workflow.lastModified).toLocaleString() : '';
  return (
    <header className="bg-white p-5 border-b">
            <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Workflows
          </button>
        </div>
        <div className="flex-grow text-center">
          {isEditing ? (
            <input
              type="text"
              value={workflowName}
              onChange={handleNameChange}
              onBlur={handleNameSave}
              onKeyDown={handleKeyDown}
              className="text-xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-500 focus:outline-none text-center"
              autoFocus
            />
          ) : (
            <h1 
              className="text-xl font-bold text-gray-800 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              {workflowName}
            </h1>
          )}
          <div className="flex items-center justify-center gap-2 mt-1">
            {status && (
              <div className="flex items-center gap-1">
                <span
                  className={`h-2 w-2 rounded-full ${status === 'Published' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                </span>
                <span className="text-xs text-gray-500">{status}</span>
              </div>
            )}
            {status && lastModified && <span className="text-xs text-gray-400">•</span>}
            {lastModified && <p className="text-xs text-gray-500">Last modified: {lastModified}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <SaveIcon />
            Save Workflow
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <PlayIcon />
            Test Workflow
          </button>
        </div>
      </div>
    </header>
  );
};

export default FlowEditorHeader;
