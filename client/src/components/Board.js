import React from "react";
import Square from './Square';

export default function Board(props) {

  const renderSquare = (i) => {
    return (
      <Square
          key={i}
          onClick={() => props.onClick(i)}
          color={props.squareColor[i]}
      />
    );
  };

  return (
    <div>
      {[...Array(24)].map((x, i) => (
          <div className="board-row" key={i}>
          {[...Array(44)].map((y, j) => (
            renderSquare(j+(i*44))
          ))}
          </div>
      ))}
    </div>
  );
};