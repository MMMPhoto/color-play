import React from "react";
import Square from './Square';

export default function Board({ onClick, squareColor, boardWidth, boardHeight }) {

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
    <div className="m-1">
      {[...Array(boardHeight)].map((x, i) => (
          <div className="board-row" key={i}>
          {[...Array(boardWidth)].map((y, j) => (
            renderSquare(j+(i*boardWidth))
          ))}
          </div>
      ))}
    </div>
  );
};