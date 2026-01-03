import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../api/socket';
import PlayerCard from '../components/PlayerCard';
import Board from '../components/Board'; // Boardni import qildik
import './GamePage.css';

const GamePage = () => {
    const { roomId } = useParams();
    // Boshlang'ich holat: board bo'sh massiv
    const [gameState, setGameState] = useState({ 
        board: [], 
        turn: 'white', 
        players: [] 
    });
    const [selectedPos, setSelectedPos] = useState(null);
    const [myId, setMyId] = useState(null);

    useEffect(() => {
        // 1. Socketni ulaymiz
        socket.connect();
        
        // 2. Xonaga qo'shilamiz
        socket.emit('joinRoom', roomId);

        // 3. Serverdan ma'lumotlarni qabul qilish
        const handleState = (data) => {
            if (data) {
                setGameState(data);
                
                // O'zimizning ID-imizni aniqlaymiz (bir marta)
                if (data.players && !myId) {
                    // socket.user bizning authMiddleware orqali kelgan foydalanuvchi
                    const me = data.players.find(p => p.username === socket.user?.username);
                    if (me) setMyId(me.id);
                }
            }
        };

        socket.on('gameState', handleState);
        
        socket.on('updateBoard', (data) => {
            handleState(data);
            setSelectedPos(null); // Yurishdan keyin tanlangan katakni tozalash
        });

        socket.on('error', (msg) => alert(msg));
        socket.on('gameOver', (data) => alert(`O'yin tugadi! G'olib: ${data.winner}`));

        // Komponent yopilganda tozalash
        return () => {
            socket.off('gameState');
            socket.off('updateBoard');
            socket.disconnect();
        };
    }, [roomId, myId]);

    const handleCellClick = (r, c) => {
        const cellValue = gameState.board[r][c];

        if (!selectedPos) {
            // Agar dona tanlanmagan bo'lsa va bosilgan katakda dona bo'lsa
            if (cellValue !== 0) {
                // Faqat o'z navbatida va o'z rangidagi donani tanlay oladi
                // (Bu mantiqni backend ham tekshiradi, lekin UI'da ham bo'lishi yaxshi)
                setSelectedPos({ r, c });
            }
        } else {
            // Agar dona tanlangan bo'lsa, yurishni amalga oshiramiz
            socket.emit('makeMove', { 
                roomId, 
                from: selectedPos, 
                to: { r, c } 
            });
            setSelectedPos(null);
        }
    };

    // O'yinchilarni ajratib olish
    const me = gameState.players.find(p => p.id === myId);
    const opponent = gameState.players.find(p => p.id !== myId);

    return (
        <div className="game-page">
            <div className="game-layout">
                {/* Tepada raqib */}
                <PlayerCard 
                    player={opponent} 
                    isTurn={gameState.turn === 'black'} 
                    color="black" 
                    isMe={false} 
                />

                {/* ASOSIY QISM: TAYYOR BOARD */}
                <div className="board-container">
                    <Board 
                        board={gameState.board} 
                        selectedPos={selectedPos} 
                        onCellClick={handleCellClick} 
                    />
                </div>

                {/* Pastda men */}
                <PlayerCard 
                    player={me} 
                    isTurn={gameState.turn === 'white'} 
                    color="white" 
                    isMe={true} 
                />
            </div>
            
            {/* Bu yerda keyinchalik Chat bo'ladi */}
        </div>
    );
};

export default GamePage;