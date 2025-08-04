import DnDFlow from './DnD';
import Header from './Header';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <DnDFlow />
      </main>
    </div>
  );
}

export default App;