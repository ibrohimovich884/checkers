import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
    const [roomName, setRoomName] = useState('');
    const navigate = useNavigate();

    const handleJoin = (e) => {
        e.preventDefault();
        if (roomName.trim()) {
            // Sening App.js dagi /game/:roomId route-ingga moslab yo'naltiramiz
            navigate(`/game/${roomName.trim()}`);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>CHESS LOBBY</h1>
                <form onSubmit={handleJoin} style={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Xona ID sini yozing..." 
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.button}>
                        Xonaga kirish
                    </button>
                </form>
            </div>
        </div>
    );
};

// CSS fayl bilan ovora bo'lmaslik uchun vaqtincha style
const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#1a1a1a' },
    card: { background: '#2c3e50', padding: '40px', borderRadius: '12px', textAlign: 'center', color: 'white' },
    title: { marginBottom: '20px', letterSpacing: '2px' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    input: { padding: '12px', borderRadius: '5px', border: 'none', fontSize: '16px' },
    button: { padding: '12px', borderRadius: '5px', border: 'none', background: '#27ae60', color: 'white', cursor: 'pointer', fontWeight: 'bold' }
};

export default Lobby;