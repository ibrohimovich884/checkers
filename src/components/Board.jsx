import React from 'react';

const Board = ({ board, selectedPos, onCellClick }) => {
    return (
        <div className="board">
            {board.map((row, r) =>
                row.map((cell, c) => {
                    const isSelected = selectedPos?.r === r && selectedPos?.c === c;
                    return (
                        <div 
                            key={`${r}-${c}`} 
                            className={`cell ${(r + c) % 2 === 0 ? 'light' : 'dark'} ${isSelected ? 'selected' : ''}`} 
                            onClick={() => onCellClick(r, c)}
                        >
                            {cell !== 0 && (
                                <div className={`piece ${cell % 2 === 1 ? 'white' : 'black'} ${cell > 2 ? 'king' : ''}`}>
                                    {cell > 2 && <span className="crown">👑</span>}
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Board;