import React from "react";
import Square from './Square';

export default function Board({onClick, squareColor}) {

  const renderSquare = (i) => {
    return (
      <Square
          key={i}
          onClick={() => onClick(i)}
          color={squareColor[i]}
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