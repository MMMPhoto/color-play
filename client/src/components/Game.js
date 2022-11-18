import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Board from './Board';

export default function Game() {
  const initialState = Array(1056).fill("#FFF");
  // console.log(initialState);

  // const [stepNumber, setStepNumber]= useState(0);
  const [history, setHistory] = useState([initialState]);
  const [currentSquareColors, setCurrentSquareColors] = useState(initialState);
  const [freshClick, setFreshClick] = useState(null);

  // useEffect(() => {
  //   setCurrent(history[history.length - 1]);
  //   console.log(current);
  // }, [history]);

    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     history: [{
    //       squareColor: Array(1056).fill("#FFF")
    //     }],
    //     stepNumber: 0,
    //     xIsNext: true,
    //     color: "#FFF"
    //   };
    //   console.log(this.state.history);
    // };
  useEffect(() => {
    if (freshClick) {
      console.log(`fresh click: ${freshClick}`);
      // Check for squares adjacent to click
      const updatedColor = currentSquareColors.map((square, index) => {
        if (( index === freshClick-1 && freshClick % 44 !== 0 ) ||
            ( index === freshClick+1 && (freshClick+1) % 44 !== 0 ) ||
            ( index === freshClick-44 ) || 
            ( index === freshClick+44 )) {
          return '#FF0000';
        } else {
          return square;
        };
      });
      setCurrentSquareColors(updatedColor);
      setFreshClick(null);
    };
  }, [freshClick]);



  const handleClick = (i) => {
    // const history = this.state.history.slice(0, this.state.stepNumber + 1 );
    // const current = history[history.length - 1];
    // const squareColor = current.squareColor.slice();
    // if (calculateWinner(squares) || squares[i]) {
    //   return;
    // };
    console.log(`square ${i} clicked`);
    console.log(currentSquareColors);
    const updatedColor = currentSquareColors.map((square, index) => {
      if (index === i) {
        return '#FF0000';
      } else {
        return square;
      };
    });
    setCurrentSquareColors(updatedColor);
    setFreshClick(i);
    console.log(currentSquareColors[i]);
    // setCurrent[i] = '#FF0000';
    // setHistory({
    //   history: history.concat([{
    //     squareColor: squareColor
    //   }]),
    //   stepNumber: history.length,
    //   // xIsNext: !this.state.xIsNext
    // });
  };


  
    // const jumpTo = (step) => {
    //   this.setState({
    //     stepNumber: step,
    //     xIsNext: (step % 2) === 0,
    //   })
    // }
  
    // render() {
    //   const history = this.state.history;
    //   const current = history[this.state.stepNumber];
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
              squareColor={currentSquareColors}
              onClick={(i) => handleClick(i)}
              // color={this.state.color}
            />
          </div>
        </div>
            /* <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div> */
      );
    // };
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

// export default Game;