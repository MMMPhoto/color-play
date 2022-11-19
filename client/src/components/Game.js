import React, { useState, useEffect } from 'react';
import Board from './Board';

export default function Game() {

  // Set State variables
  const [boardWidth, setBoardWidth] = useState(null);
  const [boardHeight, setBoardHeight] = useState(null);
  const [boardSqares, setBoardSquares] = useState(null);
  const [rValues, setRValues] = useState([]);
  const [gValues, setGValues] = useState([]);
  const [bValues, setBValues] = useState([]);
  const [freshClick, setFreshClick] = useState(null);

// Render Board based on Window Size
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

  // Set Values of Neighboring Squares
  useEffect(() => {
    if (freshClick) {
      setTimeout(() => {
        const sq = freshClick;
        const bw = boardWidth;
        console.log(`fresh click: ${sq}`);
        // Set array of squares to check
        const adjacentSquares = [(sq-bw), (sq-bw-1), (sq-bw+1), (sq+bw), (sq+bw-1), (sq+bw+1)];
        if (sq % bw !== 0) {adjacentSquares.push(sq - 1)};
        if ((sq+1) % bw !== 0) {adjacentSquares.push(sq + 1)};
        console.log(`adjacentSquares = ${adjacentSquares}`);
        // Set Red
        const updatedRed = rValues.slice();
        adjacentSquares.map((position) => {
          const value = updatedRed[position];
          if (value < 255) {
            const newValue = (value)/(1.5)
            return newValue;
          } else return value;
        });
        setRValues(updatedRed);
        // Set Green
        const updatedGreen = gValues.slice();
        adjacentSquares.map((position) => {
          const value = updatedGreen[position];
            const newValue = (value)/(1.5)
            return updatedGreen[position] = newValue;
        });
        setGValues(updatedGreen);
        // Set Blue
        const updatedBlue = bValues.slice();
        adjacentSquares.map((position) => {
          const value = updatedBlue[position];
            const newValue = (value)/(1.5)
            return updatedBlue[position] = newValue;
        });
        setBValues(updatedBlue);
        // Reset freshClick 
        setFreshClick(null);
      }, 100);
    };
  }, [freshClick]);

  // Set Values of Clicked Square
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