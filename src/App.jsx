import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lobby from './pages/Lobby.jsx'; // Agar fayl nomi Lobby.jsx bo'lsa
import GamePage from './pages/GamePage.jsx'; // Agar fayl nomi GamePage.jsx bo'lsa

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