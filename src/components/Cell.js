import React from 'react';
import './Cell.css';

function Cell(props) {
  const { index, value, onClick } = props;

  return (
    <div className={`cell cell-${index}`} onClick={onClick}>
      {value}
    </div>
  );
}

export default Cell;
