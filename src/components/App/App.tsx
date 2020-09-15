import React, { useState, useEffect, useRef } from 'react';
import { TOAD, GLIDER, WOW } from "patterns";
import Controls from 'components/controls/Controls';

import Cell from 'components/Cell/Cell';

import './App.css';
import { calculateGrid, createEmptyGrid, generateOptions } from 'lib/utils';


const INITIAL_GRID = WOW;
const AUTOMATE_MS = 200;


const dark = !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const App:React.FC = (props) => {
  const [ darkMode, setDarkMode ] = useState(dark);
  const [ grid, setGrid ] = useState<boolean[][]>(INITIAL_GRID);
  const [ automate, setAutomate ] = useState<any>(null);
  const [ cellSize, setCellSize ] = useState(0);
  const [ generating, setGenerating ] = useState(false);
  
  const boardRef = useRef(null);

  useEffect(() => {
    calculateCellSize();
    
    window.onresize = calculateCellSize;
    return () => {
      window.onresize = null;
    }

    function calculateCellSize() {
      // @ts-ignore
      const boardWidth = boardRef && boardRef.current ? boardRef.current.clientWidth : 0;
      const cellCount = grid.length ? grid[0].length : 0;
      setCellSize(Math.floor(boardWidth/cellCount));
    }
  }, [boardRef, grid])


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


  const handleUpdateGridSize = (options:generateOptions) => {
    if (options.x && options.y) {
      setGenerating(true);
      setGrid(createEmptyGrid(options));
    }
  }


  const handleCellClick = (row:number, cell:number) => {
    const newGrid = grid.slice();
    const rowCopy = newGrid[row].slice();
    rowCopy[cell] = !rowCopy[cell];
    newGrid[row] = rowCopy;

    setGrid(newGrid);
  }


  return (
    <div className={ 'App ' + (darkMode ? 'dark' : 'light') }>
      <Controls
        onAdvance={ updateGrid }
        onReset={ handleReset }
        onAutomate={ handleSetAutomate }
        onUpdateGridSize={ handleUpdateGridSize } />
      
      <div className="board" ref={ boardRef }>
        { cellSize > 0 && // Don't render before we calulate cellSize
          grid.map((row:Array<boolean>, rowIdx:number) => (
            <div className="row" style={{ height: cellSize }} key={ rowIdx }>
              { 
                row.map((cell:boolean, cellIdx:number) => (
                  <Cell key={ cellIdx }
                    alive={ cell }
                    size={ cellSize } 
                    selectable={ generating }
                    onClick={ () => handleCellClick(rowIdx, cellIdx) } />
                ))
              }
            </div>
          ))
        }
      </div>

    </div>
  );
}

export default App