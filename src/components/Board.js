import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Cell from './Cell';

import './Board.css';

const socket = io();

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

  const clickCell = (index, isSocket) => {
    if (board[index] == null && !gameHasWinner && !isBoardFull) {
      setBoard((prevBoard) =>  {
        const boardCopy = prevBoard.slice();
        boardCopy[index] = currentCellValue;
        return boardCopy;
      });
      setCurrentTurn(prevTurn => prevTurn + 1);
      if (!isSocket) {
        socket.emit('click', index);
      }
    }
  };
  
  const restartGame = () => {
    socket.emit('restart')
  }

  useEffect(() => {
    socket.on('connect', (data) => {
      console.log(data);
    });

    socket.on('click', (index) => {
      clickCell(index, true);
    });
    
    socket.on('again', (response) => {
      setBoard(Array(9).fill(null));
    })

    return () => {
      socket.off();
    }
  });

  return (
    <div>
      {gameHasWinner ?
        <div>
          <h2>Game complete - Winner is {winner}!</h2>
          <button type="button" onClick={restartGame}> Restart </button>
        </div>
       : isBoardFull ?
          <div>
            <h2>Game complete - Tie</h2>
            <button type="button" onClick={restartGame}> Restart </button>
          </div> 
        :
          <h2>Next Player: {currentCellValue}</h2>
            
      }
      <div className="board">
        {board.map((value, i) => {
          return <Cell key={i} index={i} value={value} onClick={() => clickCell(i, false)} />
        })}
      </div>
    </div>
  );
}

export default Board;
