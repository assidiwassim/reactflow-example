import FlowEditor from './components/FlowEditor';
import FlowEditorHeader from './components/FlowEditorHeader';
import './WorkflowBuilder.css';

const WorkflowBuilder = () => {
  return (
    <div className="workflow-builder flex flex-col h-full">
      <FlowEditorHeader />
      <main className="flex-grow overflow-hidden">
        <FlowEditor />
      </main>
    </div>
  );
};

export default WorkflowBuilder;
