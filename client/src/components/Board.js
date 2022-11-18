import React from "react";
import Square from './Square';

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
            key={i}
            onClick={() => this.props.onClick(i)}
            color={this.props.squareColor[i]}
        />
      );
    };
  
    render() {
      return (
        <div>
          {[...Array(24)].map((x, i) => (
              <div className="board-row" key={i}>
              {[...Array(44)].map((y, j) => (
                this.renderSquare(j+(i*44))
              ))}
              </div>
          ))}
        </div>
      );
    };
};

export default Board;