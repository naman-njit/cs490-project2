import React from 'react';
import io from 'socket.io-client';

const socket = io();

function PlayerName(props) {
  const { player, isPlayerX } = props;

  const joinGame = () => {
    socket.emit('join', isPlayerX);
  };

  return player ? (
    <span>{player.name}</span>
  ) : (
    <span>
      <button onClick={joinGame}>Join</button>
    </span>
  );
}

function PlayerList(props) {
  const { gameData } = props;

  const leaveGame = () => {
    console.log(gameData.board);
    if (gameData.board == '         ') {
      console.log('you can leave game');
      // if (isPlayerX) {
      //   gameData.player_x = null;
      // } else {
      //   gameData.player_y = null;
      // }
    }
  };

  return (
    <div>
      <div>
        X: <PlayerName player={gameData.player_x} isPlayerX={true} />
        <button onClick={leaveGame}> leave </button>
      </div>
      <div>
        O: <PlayerName player={gameData.player_o} isPlayerX={false} />
        <button onClick={leaveGame}> leave </button>
      </div>
    </div>
  );
}

export default PlayerList;
