import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Lobby.css';

const Lobby = () => {
    const [roomName, setRoomName] = useState('');
    const navigate = useNavigate();

    const handleJoin = (e) => {
        e.preventDefault();
        if (roomName.trim()) {
            navigate(`/game/${roomName.trim()}`);
        }
    };

    return (
        <div className="lobby-container">
            <div className="lobby-card">
                <div className="lobby-header">
                    <span className="heart-icon">❤️</span>
                    <h1 className="lobby-title">Love Island - checkers</h1>
                    <p className="lobby-subtitle">O'yin xonasini tanlang</p>
                </div>
                
                <form onSubmit={handleJoin} className="lobby-form">
                    <input 
                        type="text" 
                        placeholder="Xona ID sini yozing..." 
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="lobby-input"
                        required
                    />
                    <button type="submit" className="lobby-button">
                        O'yinga qo'shilish
                    </button>
                </form>
                
                <div className="lobby-footer">
                    Island Rules: Halol o'ynang!
                </div>
            </div>
        </div>
    );
};

export default Lobby;