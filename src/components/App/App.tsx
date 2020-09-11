import React, { useState, useEffect } from 'react';
import { TOAD, GLIDER, WOW } from "patterns";
import Controls from 'components/controls/Controls';

import Cell from 'components/Cell/Cell';

import './App.css';

const INITIAL_GRID = WOW;
const ALIVE = true;
const DEAD = false;
const AUTOMATE_MS = 200;


const dark = !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export default function App() {
  const [ darkMode, setDarkMode ] = useState(dark);
  const [ grid, setGrid ] = useState<boolean[][]>(INITIAL_GRID);
  const [ automate, setAutomate ] = useState<any>(null);


  // Color scheme (white makes me sad)
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      setDarkMode(!!e.matches);
    });
  }, [])


  const updateGrid = () => {
    setGrid(prevGrid => calculateGrid(prevGrid));
  }


  const handleReset = () => {
    setGrid(INITIAL_GRID);
  }


  const handleAdvanceGeneration = () => {
    updateGrid();
  }


  const handleSetAutomate = () => {
    if (automate) {
      clearInterval(automate);
      setAutomate(null);
    }
    else {
      const id = setInterval(updateGrid, AUTOMATE_MS);
      setAutomate(id);
    }
  }


  return (
    <div className={ 'App ' + (darkMode ? 'dark' : 'light') }>
      <Controls onAdvance={ handleAdvanceGeneration } onReset={ handleReset } onAutomate={ handleSetAutomate } />
      
      <div className="board">
        { 
          grid.map((row:Array<boolean>, rowIdx:number) => (
            <div className="row" key={ rowIdx }>
              { 
                row.map((cell:boolean, cellIdx:number) => (
                  <Cell alive={ cell } key={ cellIdx } />
                ))
              }
            </div>
          ))
        }
      </div>

    </div>
  );
}


//
// RULES
// https://en.wikipedia.org/wiki/Conway's_Game_of_Life
//
// 1. Any live cell with two or three live neighbours survives.
// 2. Any dead cell with three live neighbours becomes a live cell.
// 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
function calculateGrid(grid:boolean[][]):boolean[][] {
  const newGrid:boolean[][] = [];

  for (let r=0; r<grid.length; r++) {
    const row = grid[r];
    const prevRow = grid[r-1];
    const nextRow = grid[r+1];
    newGrid[r] = [];

    for (let c=0; c<row.length; c++) {
      const cell = row[c];
      const aboveNeighbors = prevRow ? [prevRow[c-1], prevRow[c], prevRow[c+1]] : undefined;
      const belowNeighbors = nextRow ? [nextRow[c-1], nextRow[c], nextRow[c+1]] : undefined;
      const lrNeighbors = [row[c-1], row[c+1]];

      const aliveNeighbors = countAlive(aboveNeighbors) + countAlive(belowNeighbors) + countAlive(lrNeighbors);
      
      // Rules
      if (cell === ALIVE && [2,3].includes(aliveNeighbors)) {
        newGrid[r][c] = ALIVE;
      }
      else {
        if (aliveNeighbors === 3) {
          newGrid[r][c] = ALIVE;
        }
        else {
          newGrid[r][c] = DEAD;
        }
      }
    }
  }
  return newGrid;
}


// Fun with reduce
function countAlive(arr:any):number {
  let count = 0;
  if (arr) {
    count = arr.reduce((val:number, curr:any) => {
      return val += curr !== undefined ? Number(curr) : 0;
    }, 0);
  }
  return count;
}