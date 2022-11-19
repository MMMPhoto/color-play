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
      console.log(rValues);
      // Check for squares adjacent to click
      const updatedRed = rValues.map((value, index) => {
        if (( index === freshClick-1 && freshClick % boardWidth !== 0 ) ||
            ( index === freshClick+1 && (freshClick+1) % boardWidth !== 0 ) ||
            ( index === freshClick-boardWidth ) || 
            ( index === freshClick+boardWidth )) {
          console.log(`Rvalue = ${value}`);
          // const newValue = (255-value)/2
          return value;
        } else return value;
      });
      setRValues(updatedRed);
      const updatedGreen = gValues.map((value, index) => {
        if (( index === freshClick-1 && freshClick % boardWidth !== 0 ) ||
            ( index === freshClick+1 && (freshClick+1) % boardWidth !== 0 ) ||
            ( index === freshClick-boardWidth ) || 
            ( index === freshClick+boardWidth )) {
          console.log(`Gvalue = ${value}`);
          const newValue = (value)/(1.5)
          return newValue;
        } else return value;
      });
      setGValues(updatedGreen);
      const updatedBlue = bValues.map((value, index) => {
        if (( index === freshClick-1 && freshClick % boardWidth !== 0 ) ||
            ( index === freshClick+1 && (freshClick+1) % boardWidth !== 0 ) ||
            ( index === freshClick-boardWidth ) || 
            ( index === freshClick+boardWidth )) {
          console.log(`Bvalue = ${value}`);
          const newValue = (value)/(1.5)
          return newValue;
        } else return value;
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
    const updatedRed = rValues.map((value, index) => {
      if (index === i) {
        return 255;
      } else return value;
    });
    setRValues(updatedRed);
    // Set Green
    const updatedGreen = gValues.map((value, index) => {
      if (index === i) {
        return 0;
      } else return value;
    });
    setGValues(updatedGreen);
    // Set Blue
    const updatedBlue = bValues.map((value, index) => {
      if (index === i) {
        return 0;
      } else return value;
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
          onClick={(i) => handleClick(i)}
          boardWidth={boardWidth}
          boardHeight={boardHeight}
        />
      </div>
    </div>
  );
};