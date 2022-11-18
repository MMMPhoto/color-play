import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squareColor: Array(1056).fill("#FFF")
        }],
        stepNumber: 0,
        xIsNext: true,
        color: "#FFF"
      };
      console.log(this.state.history);
    };
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1 );
      const current = history[history.length - 1];
      const squareColor = current.squareColor.slice();
      // if (calculateWinner(squares) || squares[i]) {
      //   return;
      // };
      console.log(`square ${i} clicked`);
      console.log(this.state.xIsNext);
      console.log(squareColor);
      squareColor[i] = this.state.xIsNext ? '#FF0000' : '#00FF00';

      this.setState({
        history: history.concat([{
          squareColor: squareColor
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    };
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      // const winner = calculateWinner(current.squares);
  
      // const moves = history.map((step, move) => {
      //   const desc = move ?
      //     `Go to move # ${move}` :
      //     'Go to game start';
      //   return (
      //     <li key={move}>
      //       <button onClick={() => this.jumpTo(move)}>{desc}</button>
      //     </li>
      //   );
      // }); 
  
      // let status;
      // if (winner) {
      //   status = `Winner: ${winner}`;
      // } else {
      //   status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
      // };
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squareColor={current.squareColor}
              onClick={(i) => this.handleClick(i)}
              color={this.state.color}
            />
          </div>
          {/* <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div> */}
        </div>
      );
    };
};

// function calculateWinner(squares) {
//     const lines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//       const [a, b, c] = lines[i];
//       if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//         return squares[a];
//       };
//     };
//     return null;
// };

export default Game;