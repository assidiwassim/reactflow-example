import React, { useState, useEffect } from 'react';
import type { Node } from '@xyflow/react';

type ConfigurationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newLabel: string) => void;
  node: Node | null;
};

export const ConfigurationModal = ({ isOpen, onClose, onSave, node }: ConfigurationModalProps) => {
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (node) {
      setLabel(node.data.label);
    }
  }, [node]);

  if (!isOpen || !node) {
    return null;
  }

  const handleSave = () => {
    onSave(label);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Configure Node</h2>
        <div className="mb-4">
          <label htmlFor="node-label" className="block text-sm font-medium text-gray-700 mb-1">Node Label</label>
          <input
            id="node-label"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
        </div>
      </div>
    </div>
  );
};
