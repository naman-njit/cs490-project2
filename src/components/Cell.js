import React from 'react';
import './Cell.css';

function Cell(props) {
  const { index, value, onClick, playable } = props;

  const isPlayable = playable && value === null;

  return (
    <div
      className={`cell cell-${index}${isPlayable ? ' highlight' : ''}`}
      onClick={isPlayable ? onClick : null}
    >
      {value}
    </div>
  );
}

export default Cell;
