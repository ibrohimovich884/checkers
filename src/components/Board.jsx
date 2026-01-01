import './Board.css';
import Piece from './Piece';

const Board = ({ board, onCellClick, selected }) => {
  return (
    <div className="checkers-board">
      {board.map((row, r) => (
        <div key={r} className="board-row">
          {row.map((cell, c) => {
            const isDark = (r + c) % 2 !== 0;
            const isSelected = selected?.r === r && selected?.c === c;

            return (
              <div
                key={`${r}-${c}`}
                className={`board-cell ${isDark ? 'dark' : 'light'} ${isSelected ? 'selected' : ''}`}
                onClick={() => onCellClick(r, c)}
              >
                {cell !== 0 && <Piece type={cell} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;