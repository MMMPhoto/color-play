import React, { useState, useEffect } from 'react';
import Board from './Board';

export default function Game() {

  // Set Board Size State
  const [boardWidth, setBoardWidth] = useState(null);
  const [boardHeight, setBoardHeight] = useState(null);
  const [boardSqares, setBoardSquares] = useState(null);
  const [rValues, setRValues] = useState([]);
  const [gValues, setGValues] = useState([]);
  const [bValues, setBValues] = useState([]);
  const [freshClick, setFreshClick] = useState(null);


  useEffect(() => {
    // Get Window Size
    const getWindowDimensions = () => {
      const { innerWidth: width, innerHeight: height } = window;
      return { width, height };
    };
    // Set number of squares
    const screenWidth = getWindowDimensions().width;
    const screenHeight = getWindowDimensions().height;
    const columns = (screenWidth - (screenWidth % 10))/10;
    const rows = (screenHeight - (screenHeight % 10))/10;
    const totalSquares = (rows * columns);
    setBoardSquares(totalSquares);
    setBoardWidth(columns);
    setBoardHeight(rows);
    setRValues(Array(totalSquares).fill(255));
    setGValues(Array(totalSquares).fill(255));
    setBValues(Array(totalSquares).fill(255));
  }, []);

  console.log(boardWidth);
  console.log(boardHeight);

  // const initialColorValues = Array(8000).fill(255);

  // const [stepNumber, setStepNumber]= useState(0);
  // const [history, setHistory] = useState([initialColorValues]);
  // const [currentSquareColors, setCurrentSquareColors] = useState(initialColorValues);

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
          if (value < 255) {
            const newValue = (value)/(1.5)
            return newValue;
          } else return value;
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
    console.log(`square ${i} clicked`);
    // Set Red
    const updatedRed = rValues.slice();
    updatedRed[i] = 255;  
    setRValues(updatedRed);
    // Set Green
    const updatedGreen = gValues.slice();
    updatedGreen[i] = 0; 
    setGValues(updatedGreen);
    // Set Blue
    const updatedBlue = bValues.slice();
    updatedBlue[i] = 0;
    setBValues(updatedBlue);
    setFreshClick(i);
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