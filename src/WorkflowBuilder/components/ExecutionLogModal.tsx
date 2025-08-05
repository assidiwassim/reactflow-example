import React from 'react';
import { type Workflow } from '../types';

interface ExecutionLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow: Workflow | null;
}

const mockLogs = [
  { id: 1, timestamp: '2023-09-01 10:00:00', status: 'Success', message: 'Workflow triggered and completed successfully.' },
  { id: 2, timestamp: '2023-09-01 11:30:00', status: 'Success', message: 'Workflow triggered and completed successfully.' },
  { id: 3, timestamp: '2023-09-02 14:00:00', status: 'Failed', message: 'Error at step 3: API connection failed.' },
  { id: 4, timestamp: '2023-09-03 09:00:00', status: 'Success', message: 'Workflow triggered and completed successfully.' },
];

const ExecutionLogModal: React.FC<ExecutionLogModalProps> = ({ isOpen, onClose, workflow }) => {
  if (!isOpen || !workflow) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <header className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Execution Logs for "{workflow.name}"</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </header>
        <main className="p-6 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {mockLogs.map(log => (
              <li key={log.id} className="py-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">{log.timestamp}</p>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {log.status}
                  </span>
                </div>
                <p className="text-sm text-gray-800 mt-1">{log.message}</p>
              </li>
            ))}
          </ul>
        </main>
        <footer className="p-4 border-t flex justify-end">
          <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Close</button>
        </footer>
      </div>
    </div>
  );
};

export default ExecutionLogModal;
