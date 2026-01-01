import React from 'react';
import './PlayerCard.css';

const PlayerCard = ({ player, isTurn, color, isMe }) => {
    return (
        <div className={`player-info ${isMe ? 'me' : 'opponent'} ${isTurn ? 'active-turn' : ''}`}>
            <img src={player?.avatar_url || '/default-avatar.png'} alt="avatar" />
            <div className="player-details">
                <span className="username">{player?.username || 'Kutilmoqda...'} {isMe && "(Siz)"}</span>
                {console.log(player?.username)}
                <span className="color-tag">{color === 'white' ? 'Oqlar' : 'Qoralar'}</span>
            </div>
            <div className={`turn-indicator ${isTurn ? 'active' : ''}`}></div>
        </div>
    );
};

export default PlayerCard;