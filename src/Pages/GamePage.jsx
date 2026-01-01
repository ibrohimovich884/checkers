import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../api/socket';
import './GamePage.css';

const GamePage = () => {
    const { roomId } = useParams();
    const [board, setBoard] = useState([]);
    const [turn, setTurn] = useState('white');
    const [selectedPos, setSelectedPos] = useState(null);

    useEffect(() => {
        // Serverga ulanish
        socket.connect();

        // Xonaga qo'shilish
        socket.emit('joinRoom', roomId);

        // O'yin holatini olish
        socket.on('gameState', (data) => {
            setBoard(data.board);
            setTurn(data.turn);
        });

        // Har bir harakatdan keyin doskani yangilash
        socket.on('updateBoard', (data) => {
            setBoard(data.board);
            setTurn(data.turn);
            setSelectedPos(null);
        });

        socket.on('gameOver', (data) => {
            alert(`O'yin tugadi! G'olib: ${data.winner}`);
        });

        return () => {
            socket.off('gameState');
            socket.off('updateBoard');
            socket.off('gameOver');
            socket.disconnect();
        };
    }, [roomId]);

    const handleCellClick = (r, c) => {
        if (!selectedPos) {
            // Agar tanlangan dona o'zimizniki bo'lsa tanlaymiz
            if (board[r][c] !== 0) {
                setSelectedPos({ r, c });
            }
        } else {
            // Tanlangan donani yangi joyga surish uchun serverga yuboramiz
            socket.emit('makeMove', {
                roomId,
                from: selectedPos,
                to: { r, c }
            });
            setSelectedPos(null);
        }
    };

    // GamePage.jsx ichida
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        socket.on('gameState', (data) => {
            setPlayers(data.players);
        });
    }, []);

    // O'yinchilarni ajratib olish (Mening ID-im orqali)
    const me = players.find(p => p.id === myId);
    const opponent = players.find(p => p.id !== myId);


    return (
        <div className="game-container">
            <h3>Xona: {roomId} | Navbat: {turn.toUpperCase()}</h3>
            <div className="player-info opponent">
                <img src={opponent?.avatar || '/default-avatar.png'} alt="avatar" />
                <span>{opponent?.username || 'Kutilmoqda...'}</span>
                <div className={`turn-indicator ${turn === 'black' ? 'active' : ''}`}></div>
            </div>
            <div className="board">
                {board.map((row, r) =>
                    row.map((cell, c) => (
                        <div key={`${r}-${c}`} className={`cell ${(r + c) % 2 === 0 ? 'light' : 'dark'}`} onClick={() => handleCellClick(r, c)}>
                            {cell !== 0 && (
                                <div className={`piece ${cell % 2 === 1 ? 'white' : 'black'} ${cell > 2 ? 'king' : ''}`}>
                                    {cell > 2 && ''}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
            <div className="player-info me">
                <img src={me?.avatar || '/default-avatar.png'} alt="avatar" />
                <span>{me?.username} (Siz)</span>
                <div className={`turn-indicator ${turn === 'white' ? 'active' : ''}`}></div>
            </div>
        </div>
    );
};

export default GamePage;