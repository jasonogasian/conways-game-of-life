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


// function calculateGrid(grid:boolean[][]):boolean[][] {
//   const newGrid:boolean[][] = [];
//   const rowCount = grid.length;

//   // Loop through each cell in every row at once
//   // (we know that all rows are the same lenght)
//   for (let r=0; r<rowCount; r++) {

//   }

//   return newGrid;
// }


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