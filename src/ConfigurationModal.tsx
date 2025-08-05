import { useState, useEffect } from 'react';
import type { Node } from '@xyflow/react';

type ConfigurationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
  onDelete: () => void;
  node: Node | null;
};

export const ConfigurationModal = ({ isOpen, onClose, onSave, onDelete, node }: ConfigurationModalProps) => {
  const [name, setName] = useState('');
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    if (node) {
      setName(String(node.data.name || ''));
    }
  }, [node]);

  if (!isOpen || !node) {
    return null;
  }

  const handleSave = () => {
    onSave(name);
    onClose();
  };

  const isConfigured = node.data.name && String(node.data.name).trim() !== '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center font-sans">
      <div className="bg-white text-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg transform transition-all duration-300 ease-in-out">
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-600">Configure Node</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="py-6 space-y-6">
          {/* Node Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-3 text-gray-600">Node Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-500">Name</p>
                <p className="text-blue-500 font-semibold">{node.data.name ? String(node.data.name) : 'N/A'}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Type</p>
                <p className="capitalize bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block font-medium">{String(node.data.type)}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">ID</p>
                <p className="font-mono text-xs text-gray-500">{node.id}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Configured</p>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isConfigured ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {isConfigured ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* Configuration Section */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-3 text-gray-600">Configuration</h3>
            <div>
              <label htmlFor="node-name" className="block text-sm font-medium text-gray-500 mb-2">Node Name</label>
              <input
                id="node-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Enter a new name"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button 
            onClick={() => setIsDeleteConfirmOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
          >
            Delete Node
          </button>
          <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
            Save Changes
          </button>
        </div>
      </div>
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center font-sans">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800">Confirm Deletion</h3>
            <p className="text-gray-600 mt-2 mb-6">Are you sure you want to delete this node? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setIsDeleteConfirmOpen(false)} 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  onDelete();
                  setIsDeleteConfirmOpen(false);
                }} 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
