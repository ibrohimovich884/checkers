// GameInfo.jsx
import React from 'react';
import './GameInfo.css';

const GameInfo = ({ turn, roomId, error }) => {
    return (
        <div className="game-info">
            <h3>Xona: {roomId}</h3>
            <div className={`status ${turn}`}>
                Navbat: <strong>{turn === 'white' ? 'Oqlar' : 'Qoralar'}</strong>
            </div>
            {error && <div className="error-msg">{error}</div>}
        </div>
    );
};

export default GameInfo; // <--- SHU QATORNI TEKSHIRING