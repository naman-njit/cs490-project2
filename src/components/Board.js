import React, { useState, useCallback } from 'react';

import Cell from './Cell';

function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState(1);

  const currentCellValue = currentTurn % 2 === 0 ? 'O' : 'X';

  const clickCell = useCallback((index) => {
    if (board[index] == null) {
      const boardCopy = board.slice();
      boardCopy[index] = currentCellValue;
      setBoard(boardCopy);
      setCurrentTurn(prevTurn => prevTurn + 1);
    }
  }, [board, setBoard]);

  return (
    <div className="board">
      {board.map((value, i) => {
        return <>
          <Cell index={i} value={value} onClick={() => clickCell(i)} />
          {(i % 3) == 2 ? <div /> : null}
        </>
      })}
    </div>
  );
}

export default Board;
