import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../api/socket';
import PlayerCard from '../components/PlayerCard';
import Board from '../components/Board';
import './GamePage.css';

const GamePage = () => {
    const { roomId } = useParams();
    const [gameState, setGameState] = useState({ board: [], turn: 'white', players: [] });
    const [selectedPos, setSelectedPos] = useState(null);
    const [myId, setMyId] = useState(null); // AuthContext yoki LocalStorage dan oling

    useEffect(() => {
        socket.connect();
        socket.emit('joinRoom', roomId);

        // Serverdan kelgan barcha o'yin holatini bitta statega yig'amiz
        const handleState = (data) => {
            setGameState(data);
            if (!myId && socket.id) setMyId(data.players.find(p => p.username === socket.user?.username)?.id);
        };

        socket.on('gameState', handleState);
        socket.on('updateBoard', (data) => {
            handleState(data);
            setSelectedPos(null);
        });

        socket.on('error', (msg) => alert(msg));
        socket.on('gameOver', (data) => alert(`O'yin tugadi! G'olib: ${data.winner}`));

        return () => {
            socket.off('gameState');
            socket.off('updateBoard');
            socket.disconnect();
        };
    }, [roomId]);

    const handleCellClick = (r, c) => {
        if (!selectedPos) {
            if (gameState.board[r][c] !== 0) setSelectedPos({ r, c });
        } else {
            socket.emit('makeMove', { roomId, from: selectedPos, to: { r, c } });
            setSelectedPos(null);
        }
    };

    const me = gameState.players.find(p => p.id === myId);
    const opponent = gameState.players.find(p => p.id !== myId);

    return (
        <div className="game-page">
            <div className="game-header">
                <h3>Xona: {roomId}</h3>
            </div>

            <PlayerCard 
                player={opponent} 
                isTurn={gameState.turn === 'black'} 
                color="black" 
                isMe={false} 
            />

            <Board 
                board={gameState.board} 
                selectedPos={selectedPos} 
                onCellClick={handleCellClick} 
            />

            <PlayerCard 
                player={me} 
                isTurn={gameState.turn === 'white'} 
                color="white" 
                isMe={true} 
            />
        </div>
    );
};

export default GamePage;