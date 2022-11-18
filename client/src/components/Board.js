import React from "react";
import Square from './Square';

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)} 
        />
      );
    };
  
    render() {
      return (
        <div>
          {[...Array(3)].map((x, i) => (
              <div className="board-row" key={i}>
              {[...Array(3)].map((y, j) => (
                this.renderSquare(j+(i*3))
              ))}
              </div>
          ))}
        </div>
      );
    };
};

export default Board;