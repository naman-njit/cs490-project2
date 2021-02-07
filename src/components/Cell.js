import React from 'react';
import './Cell.css';

function Cell(props) {
  const { index, value } = props;

  return (
    <div className={`cell cell-${index}`}>
      {value}
    </div>
  );
}

export default Cell;