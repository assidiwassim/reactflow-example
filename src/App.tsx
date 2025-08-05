import FlowEditor from './FlowEditor';
import FlowEditorHeader from './FlowEditorHeader';

function App() {
  return (
    <div className="flex flex-col h-screen ">
      <FlowEditorHeader />
      <main className="flex-grow overflow-hidden">
        <FlowEditor />
      </main>
    </div>
  );
}

export default App;