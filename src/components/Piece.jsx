import React from 'react';
import './Price.css';

const Piece = ({ type }) => {
  // 1: Oq, 2: Qora, 3: Oq Dama, 4: Qora Dama
  const isWhite = type === 1 || type === 3;
  const isKing = type === 3 || type === 4;

  return (
    <div className={`piece ${isWhite ? 'white' : 'black'} ${isKing ? 'king' : ''}`}>
      {isKing && <div className="king-icon">★</div>}
    </div>
  );
};

export default Piece;