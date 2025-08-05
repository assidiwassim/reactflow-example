import React, { useState, useEffect } from 'react';
import { SaveIcon, PlayIcon, BackIcon, LoaderIcon, CheckIcon, EditIcon, PublishIcon } from './FlowEditorIcons';
import { type Workflow } from '../types';

interface FlowEditorHeaderProps {
  onBack: () => void;
  workflow: Workflow | null;
  onWorkflowNameChange: (newName: string) => void;
  onSave: () => void;
  saveStatus: 'idle' | 'saving' | 'success';
  onPublish: () => void;
  publishStatus: 'idle' | 'publishing' | 'success';
  hasUnsavedChanges: boolean;
}

const FlowEditorHeader: React.FC<FlowEditorHeaderProps> = ({ onBack, workflow, onWorkflowNameChange, onSave, saveStatus, onPublish, publishStatus, hasUnsavedChanges }) => {
  const isPublished = workflow?.status === 'Published';
  const isPublishing = publishStatus === 'publishing';
  const isPublishSuccess = publishStatus === 'success';
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
          <span className="text-gray-300">|</span>
        </div>
        <div className="flex-grow text-center">
          {isEditing ? (
            <input
              type="text"
              value={workflowName}
              size={Math.max(workflowName.length, 1)}
              onChange={handleNameChange}
              onBlur={handleNameSave}
              onKeyDown={handleKeyDown}
              className="text-xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-500 focus:outline-none text-center"
              autoFocus
            />
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-xl font-bold text-gray-800">
                {workflowName}
              </h1>
              <button onClick={() => setIsEditing(true)} className="p-1 rounded-md hover:bg-gray-200">
                <EditIcon />
              </button>
            </div>
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
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center min-w-[120px]">
            {saveStatus === 'saving' && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <LoaderIcon />
                <span>Saving...</span>
              </div>
            )}
            {saveStatus === 'success' && (
              <div className="flex items-center gap-2 text-sm text-green-500">
                <CheckIcon />
                <span>Saved!</span>
              </div>
            )}
          </div>
          <button onClick={onSave} disabled={saveStatus === 'saving'} className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <SaveIcon />
            Save Workflow
          </button>
          <div className="relative group">
            <button 
              onClick={onPublish} 
              disabled={isPublished || isPublishing || isPublishSuccess || hasUnsavedChanges}
              className={`flex items-center justify-center w-[120px] px-4 py-2 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 
                ${isPublished || isPublishSuccess 
                  ? 'bg-blue-500 focus:ring-green-500'
                  : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'}
                disabled:cursor-not-allowed`
              }
            >
              {isPublishing && <><LoaderIcon /> <span className="ml-2">Publishing...</span></>}
              {(isPublished || isPublishSuccess) && !isPublishing && <><CheckIcon /> <span className="ml-2">Published</span></>}
              {!isPublished && !isPublishing && !isPublishSuccess && <><PublishIcon /> <span className="ml-1">Publish</span></>}
            </button>
            {hasUnsavedChanges && (
              <div className="absolute top-full mt-2 w-max px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Save your changes before publishing
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            )}
          </div>
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
