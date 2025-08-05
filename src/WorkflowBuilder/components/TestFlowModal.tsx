import React from 'react';
import Modal from './Modal';

interface TestFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestFlowModal: React.FC<TestFlowModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Test Workflow">
      <div className="p-4">
        <p>This is the modal for testing the workflow.</p>
      </div>
    </Modal>
  );
};

export default TestFlowModal;
