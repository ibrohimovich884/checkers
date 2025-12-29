import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamePage from './Pages/GamePage';
import Lobby from './pages/Lobby';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/game/:roomId" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;