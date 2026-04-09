import React, { useState } from 'react';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';

function App() {
  const [view, setView] = useState('home');

  return (
    <div className="App">
      {view === 'home' ? (
        <Home onStart={() => setView('chat')} />
      ) : (
        <Chat onBack={() => setView('home')} />
      )}
    </div>
  );
}

export default App;
