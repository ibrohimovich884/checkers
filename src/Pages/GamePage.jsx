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

    return (
        <div className="game-container">
            <h3>Xona: {roomId} | Navbat: {turn.toUpperCase()}</h3>
            <div className="board">
                {board.map((row, r) => (
                    row.map((cell, c) => (
                        <div 
                            key={`${r}-${c}`}
                            className={`cell ${(r + c) % 2 !== 0 ? 'dark' : 'light'} ${selectedPos?.r === r && selectedPos?.c === c ? 'selected' : ''}`}
                            onClick={() => handleCellClick(r, c)}
                        >
                            {cell === 1 && <div className="piece white"></div>}
                            {cell === 2 && <div className="piece black"></div>}
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
};

export default GamePage;