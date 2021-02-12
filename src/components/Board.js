import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Cell from './Cell';
import PlayerList from './PlayerList';

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

function Board(props) {
  const { user } = props;

  const [board, setBoard] = useState(Array(9).fill(null));
  const [room] = useState(null);
  const [gameData, setGameData] = useState(null);

  const currentTurn = board.filter(Boolean).length + 1; // count non-null values;
  const currentCellValue = currentTurn % 2 === 0 ? 'O' : 'X';

  const isBoardFull = board.every((cell) => cell != null);

  const winner = calculateWinner(board);
  const gameHasWinner = winner != null;

  const currentPlayer = currentTurn % 2 === 0 ? gameData?.player_o : gameData?.player_x;
  const playable = user?.id === currentPlayer?.id && !gameHasWinner && !isBoardFull;

  const clickCell = (index, isSocket) => {
    if (board[index] == null && !gameHasWinner && !isBoardFull) {
      setBoard((prevBoard) => {
        const boardCopy = prevBoard.slice();
        boardCopy[index] = currentCellValue;
        return boardCopy;
      });
      if (!isSocket) {
        socket.emit('click', index);
      }
    }
  };

  const restartGame = () => {
    socket.emit('restart');
  };

  useEffect(() => {
    socket.emit('load', (response) => {
      console.log(response);
      setGameData(response);
      setBoard(response.board.split('').map((char) => (char === ' ' ? null : char)));
    });

    return () => {
      socket.off();
    };
  }, [room]);

  useEffect(() => {
    socket.on('connect', (data) => {
      console.log(data);
    });

    socket.on('click', (index) => {
      clickCell(index, true);
    });

    socket.on('again', (response) => {
      setBoard(Array(9).fill(null));
    });

    return () => {
      socket.off();
    };
  }, [board]);

  if (!gameData) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>Username: {user.name}</h2>
      <PlayerList gameData={gameData} />
      {gameHasWinner ? (
        <div>
          <h2>Game complete - Winner is {winner}!</h2>
          <button type="button" onClick={restartGame}>
            {' '}
            Restart{' '}
          </button>
        </div>
      ) : isBoardFull ? (
        <div>
          <h2>Game complete - Tie</h2>
          <button type="button" onClick={restartGame}>
            {' '}
            Restart{' '}
          </button>
        </div>
      ) : (
        <h2>Next Player: {currentCellValue}</h2>
      )}
      <div className="board">
        {board.map((value, i) => {
          return (
            <Cell
              key={i}
              index={i}
              value={value}
              onClick={() => clickCell(i, false)}
              playable={playable}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Board;
