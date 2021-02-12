import React, { useState, useEffect, useCallback } from 'react';
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
  const [gameData, setGameData] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(1); // 1 to 9

  const currentCellValue = currentTurn % 2 === 0 ? 'O' : 'X';

  const isBoardFull = board.every((cell) => cell != null);

  const winner = calculateWinner(board);
  const gameHasWinner = winner != null;

  const currentPlayer = currentTurn % 2 === 0 ? gameData?.player_o : gameData?.player_x;
  const playable = user?.id === currentPlayer?.id && !gameHasWinner && !isBoardFull;

  const clickCell = useCallback((index) => {
    socket.emit('click', index);
    console.log('Clicked and emitted');
  }, []);

  const onClick = useCallback(
    (index) => {
      console.log('click', index, currentCellValue, currentTurn);
      setBoard((prevBoard) => {
        const boardCopy = prevBoard.slice();
        boardCopy[index] = currentCellValue;
        return boardCopy;
      });
      setCurrentTurn((prevTurn) => {
        console.log('prev', prevTurn);
        return prevTurn + 1;
      });
    },
    [currentCellValue, currentTurn, board, gameHasWinner, isBoardFull],
  );

  const restartGame = () => {
    socket.emit('restart');
  };

  useEffect(() => {
    socket.on('connect', (data) => {
      console.log(data);
    });

    socket.on('again', () => {
      setBoard(Array(9).fill(null));
    });

    socket.on('click', (index) => onClick(index));

    socket.emit('load', (response) => {
      console.log(response);
      setGameData(response);
    });

    socket.on('join', (response) => {
      console.log(response);
      setGameData((prevData) => {
        return {
          ...prevData,
          [response.is_player_x ? 'player_x' : 'player_o']: response.player,
        };
      });
    });

    return () => {
      socket.off();
    };
  }, []);

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
        <h2>
          Next Player: {currentCellValue} {currentTurn}
        </h2>
      )}
      <div className="board">
        {board.map((value, i) => {
          return (
            <Cell
              key={i}
              index={i}
              value={value}
              onClick={() => clickCell(i)}
              playable={playable}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Board;
