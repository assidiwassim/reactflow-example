import DnDFlow from './DnD';
import Header from './Header';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <DnDFlow />
      </main>
    </div>
  );
}

export default App;