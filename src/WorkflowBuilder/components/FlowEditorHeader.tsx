import { SaveIcon, PlayIcon } from './FlowEditorIcons';

interface FlowEditorHeaderProps {
  onBack: () => void;
  workflowName?: string;
}

const FlowEditorHeader: React.FC<FlowEditorHeaderProps> = ({ onBack, workflowName }) => {
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
        <div>
                    <h1 className="text-xl font-bold text-gray-800">{workflowName || 'New Workflow'}</h1>
          <p className="text-sm text-gray-500">{workflowName ? 'Edit your workflow' : 'Create a new workflow'}</p>
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
