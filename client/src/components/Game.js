import React, { useState, useEffect } from 'react';
import Board from './Board';

export default function Game() {

  // Set Board Size State
  const [boardWidth, setBoardWidth] = useState(null);
  const [boardHeight, setBoardHeight] = useState(null);

  useEffect(() => {
    // Get Window Size
    const getWindowDimensions = () => {
      const { innerWidth: width, innerHeight: height } = window;
      return { width, height };
    };
    // Set number of squares
    const screenWidth = getWindowDimensions().width;
    const screenHeight = getWindowDimensions().height;
    const columns = (screenWidth - (screenWidth % 34))/34;
    const rows = (screenHeight - (screenHeight % 34))/34;
    setBoardWidth(columns);
    setBoardHeight(rows);
  }, []);

  console.log(boardWidth);
  console.log(boardHeight);

  const initialColorValues = Array(1056).fill(255);

  // const [stepNumber, setStepNumber]= useState(0);
  const [history, setHistory] = useState([initialColorValues]);
  const [currentSquareColors, setCurrentSquareColors] = useState(initialColorValues);
  const [rValues, setRValues] = useState(initialColorValues);
  const [gValues, setGValues] = useState(initialColorValues);
  const [bValues, setBValues] = useState(initialColorValues);
  const [freshClick, setFreshClick] = useState(null);

  // useEffect(() => {
  //   setCurrent(history[history.length - 1]);
  //   console.log(current);
  // }, [history]);

  useEffect(() => {
    if (freshClick) {
      console.log(`fresh click: ${freshClick}`);
      // Check for squares adjacent to click
      const updatedRed = rValues.map((square, index) => {
        if (( index === freshClick-1 && freshClick % boardWidth !== 0 ) ||
            ( index === freshClick+1 && (freshClick+1) % boardWidth !== 0 ) ||
            ( index === freshClick-boardWidth ) || 
            ( index === freshClick+boardWidth )) {
          return 255;
        };
      });
      setRValues(updatedRed);
      const updatedGreen = gValues.map((square, index) => {
        if (( index === freshClick-1 && freshClick % boardWidth !== 0 ) ||
            ( index === freshClick+1 && (freshClick+1) % boardWidth !== 0 ) ||
            ( index === freshClick-boardWidth ) || 
            ( index === freshClick+boardWidth )) {
          return 180;
        };
      });
      setGValues(updatedGreen);
      const updatedBlue = bValues.map((square, index) => {
        if (( index === freshClick-1 && freshClick % boardWidth !== 0 ) ||
            ( index === freshClick+1 && (freshClick+1) % boardWidth !== 0 ) ||
            ( index === freshClick-boardWidth ) || 
            ( index === freshClick+boardWidth )) {
          return 180;
        };
      });
      setBValues(updatedBlue);
      setFreshClick(null);
    };
  }, [freshClick]);



  const handleClick = (i) => {
    // const history = this.state.history.slice(0, this.state.stepNumber + 1 );
    // const current = history[history.length - 1];
    // const squareColor = current.squareColor.slice();
    console.log(`square ${i} clicked`);
    // Set Red
    const updatedRed = rValues.map((square, index) => {
      if (index === i) {
        return 255;
      };
    });
    setRValues(updatedRed);
    // Set Green
    const updatedGreen = gValues.map((square, index) => {
      if (index === i) {
        return 0;
      };
    });
    setGValues(updatedGreen);
    // Set Blue
    const updatedBlue = bValues.map((square, index) => {
      if (index === i) {
        return 0;
      };
    });
    setBValues(updatedBlue);
    setFreshClick(i);
    console.log(currentSquareColors[i]);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          rValues ={rValues}
          gValues={gValues}
          bValues={bValues}
          // squareColor={currentSquareColors}
          onClick={(i) => handleClick(i)}
          boardWidth={boardWidth}
          boardHeight={boardHeight}
          // color={this.state.color}
        />
      </div>
    </div>
  );
};