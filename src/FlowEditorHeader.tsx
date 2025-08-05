import { SaveIcon, PlayIcon } from './icons';

const FlowEditorHeader = () => {
  return (
    <header className="bg-white p-5 border-b">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Visual Workflow Builder</h1>
          <p className="text-sm text-gray-500">Create sophisticated nudge workflows with drag-and-drop simplicity</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            New Workflow
          </button>
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
