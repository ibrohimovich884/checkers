import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Lobby.css';

const Lobby = () => {
    const [roomName, setRoomName] = useState('');
    const navigate = useNavigate();

    const handleJoin = (e) => {
        e.preventDefault();
        if (roomName.trim()) {
            // Foydalanuvchini yozilgan xona ID si bilan yo'naltiramiz
            navigate(`/game/${roomName.trim()}`);
        }
    };

    return (
        <div className="lobby-container">
            <div className="lobby-card">
                <h1 className="lobby-title">Love Island Shashka</h1>
                <p className="lobby-subtitle">Xona nomini kiriting va jangga qo'shiling</p>
                
                <form onSubmit={handleJoin} className="lobby-form">
                    <input 
                        type="text" 
                        placeholder="Xona nomi (masalan: room101)" 
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="lobby-input"
                        required
                    />
                    <button type="submit" className="lobby-button">
                        O'yinga kirish
                    </button>
                </form>

                <div className="lobby-footer">
                    <span>Localhost Auth: Love Island Token talab qilinadi</span>
                </div>
            </div>
        </div>
    );
};

export default Lobby;