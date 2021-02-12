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

  return (
    <div>
      <div>
        X: <PlayerName player={gameData.player_x} isPlayerX={true} />
      </div>
      <div>
        O: <PlayerName player={gameData.player_o} isPlayerX={false} />
      </div>
    </div>
  );
}

export default PlayerList;
