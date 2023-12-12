import { getData } from "../util/util.js"

const data = await getData(10)
const grid = data.split("\n").map(r=>r.split("").filter(r => r.trim() !== ""))
let start

for(let r=0; r < grid.length; r++) {
  if (start) break
  for(let c=0; c < grid[r].length; c++) {
    if (grid[r][c] === "S") {
      start = {r, c}
      break
    }
  }
}

function part1() {
  const validNeighbors = {
    //    top       right     down      left        
    "|": [/[|SF7]/, /x/,      /[JLS|]/, /x/],
    "F": [/x/,      /[-7JS]/, /[JLS|]/, /x/],
    "7": [/x/,      /x/,      /[JLS|]/, /[-SFL]/],
    "J": [/[|SF7]/, /x/,      /x/,      /[-SFL]/],
    "L": [/[|SF7]/, /[-7JS]/, /x/,      /x/],
    "-": [/x/,      /[-7J]/,  /x/,      /[-FL]/],
    "S": [/[|SF7]/, /[-7J]/,  /[JLS|]/, /[-FL]/],
  }
  const p = start
  const prev = {r: -1, c: -1}
  let steps = 0

  while(true) {
    const pipe = grid[p.r][p.c]

    const neighbors = [
      [p.r-1, p.c],
      [p.r,   p.c+1],
      [p.r+1, p.c],
      [p.r,   p.c-1],
    ]

    for(let i = 0; i < neighbors.length; i++) {
      const r     = neighbors[i][0]
      const c     = neighbors[i][1]

      if (r < 0 || c >= grid[0].length) continue
      if (prev.r === r && prev.c === c ) continue 
      if (!validNeighbors[pipe][i].test(grid[r][c])) continue
      if (grid[r][c] === "S") return steps + 1

      prev.r = p.r
      prev.c = p.c
      p.r = r
      p.c = c
      steps++

      break
    }
  }
}

console.log(part1()/2)