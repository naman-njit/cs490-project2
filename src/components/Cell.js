import React from 'react';
import './Cell.css';

function Cell(props) {
  const { index, value, onClick, playable } = props;

  return (
    <div
      className={`cell cell-${index}${playable ? ' highlight' : ''}`}
      onClick={playable ? onClick : null}
    >
      {value}
    </div>
  );
}

export default Cell;
