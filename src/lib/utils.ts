export type generateOptions = {x:number, y:number};


const ALIVE = true;
const DEAD = false;


//
// RULES
// https://en.wikipedia.org/wiki/Conway's_Game_of_Life
//
// 1. Any live cell with two or three live neighbours survives.
// 2. Any dead cell with three live neighbours becomes a live cell.
// 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
export function calculateGrid(grid:boolean[][]):boolean[][] {
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


export function createEmptyGrid(size:generateOptions):boolean[][] {
  const grid:boolean[][] = [];
  for (let r=0; r<size.y; r++) {
    grid[r] = [];

    for (let c=0; c<size.x; c++) {
      grid[r].push(DEAD);
    }
  }

  return grid;
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



/**
 * The blow commented-out code is from thoughts that I had on improving
 * the performance of calculating a generation.
 * 
 * However, since this method relies on having an existing grid to udate in-place,
 * I was forced to make a copy of the existing grid to not mutate the current grid (React state).
 * This meant that the performance was no better than the above implementation, which was cleaner
 * in my opinion.
 * 
 * Given more time, it's possible that the below approach (or something similar) could be used to
 * achieve a bump in performance.
 */


//
// RULES
// https://en.wikipedia.org/wiki/Conway's_Game_of_Life
//
// 1. Any live cell with two or three live neighbours survives.
// 2. Any dead cell with three live neighbours becomes a live cell.
// 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
// export function calculateGridFast(liveCells:any, emptyGrid:boolean[][]):{grid:boolean[][], liveCells:any} {
//   const grid = emptyGrid;
//   const liveWithLiveNeighbors:any = {};
//   const deadWithLiveNeighbors:any = {};

//   // Loop over alive cells
//   for (let key in liveCells) {
//     const {row, cell} = fromKey(key);
//     getNeighbors(row, cell, liveCells);
//   }

//   const newLiveCells:any = {};
//   for (let key in liveWithLiveNeighbors) {
//     const count = liveWithLiveNeighbors[key];
//     if (count === 2 || count === 3) {
//       const {row, cell} = fromKey(key);
//       if (validLocation(row, cell)) {
//         grid[row][cell] = true;
//       }
//       newLiveCells[key] = true;
//     }
//   }
//   for (let key in deadWithLiveNeighbors) {
//     const count = deadWithLiveNeighbors[key];
//     if (count === 3) {
//       const {row, cell} = fromKey(key);
//       if (validLocation(row, cell)) {
//         grid[row][cell] = true;
//       }
//       newLiveCells[key] = true;
//     }
//   }
//   return { grid, liveCells: newLiveCells };

//   function getNeighbors(y:number, x:number, liveCells:any) {
//     for (let i=-1; i<2; i++) {
//       const aboveKey = cellKey(y-1, x+i);
//       const belowKey = cellKey(y+1, x+i);
//       liveCells[aboveKey] ?
//         insertNeighbor(liveWithLiveNeighbors, aboveKey)
//         :
//         insertNeighbor(deadWithLiveNeighbors, aboveKey);
  
//       liveCells[belowKey] ? 
//         insertNeighbor(liveWithLiveNeighbors, belowKey)
//         :
//         insertNeighbor(deadWithLiveNeighbors, belowKey);
//     }

//     const leftKey = cellKey(y, x-1);
//     const rightKey = cellKey(y, x+1);
//     liveCells[leftKey] ?
//       insertNeighbor(liveWithLiveNeighbors, leftKey)
//       :
//       insertNeighbor(deadWithLiveNeighbors, leftKey);

//     liveCells[rightKey] ?
//       insertNeighbor(liveWithLiveNeighbors, rightKey)
//       :
//       insertNeighbor(deadWithLiveNeighbors, rightKey);
//   }

//   function validLocation(row:number, cell:number):boolean {
//     return row >=0 && row < grid.length && cell >= 0 && cell < grid[0].length;
//   }
// }


// Get the indices of all live cells in a single row
// export function getLiveCells(rowCount:number, arr:Array<boolean>):any {
//   const alive:any = {};
//   arr.forEach((c, i) => {
//     if (c === true) {
//       alive[cellKey(rowCount, i)] = true;
//     }
//   });
//   return alive;
// }


// function insertNeighbor(obj:any, key:string) {
//   obj[key] = obj[key] ? obj[key] + 1 : 1;
// }


// function cellKey(row:number, cell:number):string {
//   return `${row}-${cell}`;
// }

// function fromKey(key:string):{row:number, cell:number} {
//   const [row, cell] = key.split('-');
//   return {
//     row: parseInt(row),
//     cell: parseInt(cell),
//   };
// }


// Calculate: 0.89892578125 ms
// Calculate: 0.428955078125 ms
// Calculate: 0.564208984375 ms
// Calculate: 0.490966796875 ms
// Calculate: 0.5 ms

// Calculate: 1.956298828125 ms
// Calculate: 0.47802734375 ms
// Calculate: 0.43798828125 ms
// Calculate: 0.501953125 ms
// Calculate: 0.410888671875 ms

// Calculate: 1.2998046875 ms
// Calculate: 0.43505859375 ms
// Calculate: 0.569091796875 ms
// Calculate: 0.587890625 ms
// Calculate: 0.419921875 ms



// Calculate: 0.248046875 ms
// Calculate: 0.7568359375 ms
// Calculate: 2.9541015625 ms
// Calculate: 0.546875 ms
// Calculate: 1.536865234375 ms

// Calculate: 0.254150390625 ms
// Calculate: 0.643798828125 ms
// Calculate: 0.612060546875 ms
// Calculate: 0.5859375 ms
// Calculate: 0.819091796875 ms