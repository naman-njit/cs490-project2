import React, { useState } from 'react';

import Cell from './Cell';

function Board() {
  const [board, setBoard] = useState(['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']);

  return (
    <div className="board">
      {board.map((value, i) => {
        return <>
          <Cell index={i} value={value} />
          {(i % 3) == 2 ? <div /> : null}
        </>
      })}
    </div>
  );
}

export default Board;