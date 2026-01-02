import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lobby from './pages/Lobby.jsx';
import GamePage from './pages/GamePage';

function App() {
  useEffect(() => {
    // 1. URL dan tokenni qidirish
    const urlParams = new URLSearchParams(window.location.search);
    const receivedToken = urlParams.get('auth_token');

    if (receivedToken) {
      // 2. Love Island'dan kelgan tokenni o'zimizning localStorage'ga yozish
      localStorage.setItem('token', receivedToken);
      
      // 3. Xavfsizlik uchun URL'dagi tokenni o'chirib tashlash (Replace state)
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
      
      console.log("✅ Token Love Island'dan olindi va localStorage'ga saqlandi.");
    }
  }, []);

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