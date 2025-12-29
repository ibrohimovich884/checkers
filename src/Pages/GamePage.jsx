import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import socket from '../api/socket';
import Board from '../components/Board';
import GameInfo from '../components/GameInfo';
import './GamePage.css';

const GamePage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [gameState, setGameState] = useState(null);
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("love_island_token");
        if (!token) {
            navigate('/login'); // Agar token bo'lmasa asosiy loyihaga qaytaradi
            return;
        }

        socket.connect();
        socket.emit('joinRoom', roomId);

        socket.on('gameState', (data) => setGameState(data));
        socket.on('updateBoard', (data) => setGameState(data));
        socket.on('error', (msg) => setError(msg));

        return () => {
            socket.off('gameState');
            socket.off('updateBoard');
            socket.off('error');
            socket.disconnect();
        };
    }, [roomId, navigate]);

    const onCellClick = (r, c) => {
        if (selected) {
            socket.emit('makeMove', { roomId, from: selected, to: { r, c } });
            setSelected(null);
        } else {
            if (gameState.board[r][c] !== 0) {
                setSelected({ r, c });
            }
        }
    };

    if (!gameState) return <div className="loading">Yuklanmoqda...</div>;

    return (
        <div className="game-page-container">
            <h2 className="game-title">Shashka Onlayn</h2>
            <div className="game-layout">
                <Board 
                    board={gameState.board} 
                    onCellClick={onCellClick} 
                    selected={selected} 
                />
                <GameInfo 
                    turn={gameState.turn} 
                    roomId={roomId} 
                    error={error}
                />
            </div>
        </div>
    );
};

export default GamePage;