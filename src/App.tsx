import DnDFlow from './DnD';
import Header from './Header';

function App() {
  return (
    <div className="flex flex-col h-screen ">
      <Header />
      <main className="flex-grow">
        <DnDFlow />
      </main>
    </div>
  );
}

export default App;