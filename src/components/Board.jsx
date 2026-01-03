import React from 'react';
import './Board.css';

const Board = ({ board, selectedPos, onCellClick }) => {
    // Agar board massivi hali kelmagan bo'lsa (undefined bo'lsa) xato bermasligi uchun
    if (!board || !Array.isArray(board) || board.length === 0) {
        return (
            <div className="board-loading">
                <div className="spinner"></div>
                <p>O'yin taxtasi yuklanmoqda...</p>
            </div>
        );
    }

    return (
        <div className="board">
            {board.map((row, r) => (
                row.map((cell, c) => {
                    const isSelected = selectedPos?.r === r && selectedPos?.c === c;
                    // Katak rangini aniqlash (shaxmat tartibida)
                    const isDark = (r + c) % 2 !== 0;

                    return (
                        <div 
                            key={`${r}-${c}`} 
                            className={`cell ${isDark ? 'dark' : 'light'} ${isSelected ? 'selected' : ''}`} 
                            onClick={() => onCellClick(r, c)}
                        >
                            {/* Agar katakda dona bo'lsa (0 bo'lmasa) */}
                            {cell !== 0 && (
                                <div className={`piece ${cell % 2 === 1 ? 'white' : 'black'} ${cell > 2 ? 'king' : ''}`}>
                                    {cell > 2 && <span className="crown">👑</span>}
                                </div>
                            )}
                        </div>
                    );
                })
            ))}
        </div>
    );
};

export default Board;