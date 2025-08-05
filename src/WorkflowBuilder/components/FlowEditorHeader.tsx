import { SaveIcon, PlayIcon } from './FlowEditorIcons';
import { type Workflow } from '../types';

interface FlowEditorHeaderProps {
  onBack: () => void;
  workflow: Workflow | null;
}

const FlowEditorHeader: React.FC<FlowEditorHeaderProps> = ({ onBack, workflow }) => {
  const workflowName = workflow?.name || 'New Workflow';
  const status = workflow?.status;
  const lastModified = workflow?.lastModified;
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
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-xl font-bold text-gray-800">{workflowName}</h1>
            {status && (
              <span
                className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                  status === 'Published'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {status}
              </span>
            )}
          </div>
          {lastModified && <p className="text-xs text-gray-500">Last modified: {lastModified}</p>}
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
