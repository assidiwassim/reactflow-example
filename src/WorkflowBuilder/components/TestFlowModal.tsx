import React from 'react';
import Modal from './Modal';

interface TestFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const executionData = [
  {
    node: 'Start',
    status: 'success',
    log: 'Workflow started successfully.',
  },
  {
    node: 'Action 1',
    status: 'success',
    log: 'Action 1 completed.',
  },
  {
    node: 'Condition',
    status: 'running',
    log: 'Condition is being evaluated...',
  },
  {
    node: 'Action 2',
    status: 'pending',
    log: 'Waiting for Condition to complete.',
  },
];

const TestFlowModal: React.FC<TestFlowModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Test Workflow">
      <div className="p-4">
        <div className="space-y-4">
          {executionData.map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${{
                    success: 'bg-green-500',
                    running: 'bg-blue-500',
                    pending: 'bg-gray-400',
                  }[item.status]} text-white`}
                >
                  {index + 1}
                </div>
                {index < executionData.length - 1 && (
                  <div className="w-px h-8 bg-gray-300" />
                )}
              </div>
              <div>
                <h4 className="font-semibold">{item.node}</h4>
                <p className="text-sm text-gray-500">{item.log}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default TestFlowModal;
