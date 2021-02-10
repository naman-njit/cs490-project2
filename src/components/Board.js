import React, { useState, useCallback } from 'react';

import Cell from './Cell';

import './Board.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState(1); // 1 to 9

  const currentCellValue = currentTurn % 2 === 0 ? 'O' : 'X';

  const isBoardFull = board.every(cell => cell != null);

  const winner = calculateWinner(board);
  const gameHasWinner = winner != null;

  const clickCell = useCallback((index) => {
    if (board[index] == null && !gameHasWinner && !isBoardFull) {
      const boardCopy = board.slice();
      boardCopy[index] = currentCellValue;
      setBoard(boardCopy);
      setCurrentTurn(prevTurn => prevTurn + 1);
    }
  }, [board, setBoard]);

  return (
    <div>
      {gameHasWinner ?
        <h2>Game complete - Winner is {winner}!</h2>
       : isBoardFull ?
            <h2>Game complete - Tie</h2> :
            <h2>Next Player: {currentCellValue}</h2>
      }
      <div className="board">
        {board.map((value, i) => {
          return <>
            <Cell index={i} value={value} onClick={() => clickCell(i)} />
          </>
        })}
      </div>
    </div>
  );
}

export default Board;
