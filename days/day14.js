import { getData } from "../util/util.js"
const data = await getData(14) 
const grid = data.split("\n").filter(r=>r.trim() !== "").map(r=>r.split(""))

function rotate(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix[0].length; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = matrix[i].reverse();
  }
  return matrix
}

// Tilts grid towards north
const tilt = (grid) => {
  const m = (i,j) => {
    while(i-1 >= 0 && grid[i][j] === "O" && grid[i-1][j] === ".") {
      grid[i][j] = "."
      grid[i-1][j] = "O"
      i-- 
    }
  }

  for(let i = 1; i < grid.length; i++) {
    for(let j = 0; j < grid.length; j++) {
      m(i,j)
    }
  }
  return grid
}

function getSum(grid) {
  let sum =0 
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid.length; j++) {
      if (grid[i][j] === "O"){
        sum += (grid.length - i)
      }
    }
  }
  return sum
}

// Detect cycle and return grid with state corresponding to targetCycle 
const getGridAtCycle = (grid, targetCycle) => {
  const history = {}
  const data = []
  let cycles = 0
  while (cycles < targetCycle) {
    for (let i = 0; i < 4; i++) { 
      rotate(tilt(grid)) 
    }
    cycles++
    const key = JSON.stringify(grid)

    if (history[key]) {
      const loopStart = history[key] 
      const loopSize = cycles - loopStart 
      const i = history[key] + ((targetCycle - loopStart)%loopSize)
      return JSON.parse(data[i-1])
    } else {
      history[key] = cycles
      data.push(key)
    }
  }
}

// Cycle grid: north, west, south, east
const cycle = (grid, cycles) => {
  while (cycles > 0) {
    for (let i = 0; i < 4; i++) {
      grid = rotate(tilt(grid))
    }
    cycles--
  }
  return grid
}

// part 1
console.log(getSum(tilt(grid)))

// part 2
console.log(getSum(getGridAtCycle(grid, 1_000_000_000)))