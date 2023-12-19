import { getData } from "../util/util.js"
const data = await getData(16) 
const grid = data.split("\n").filter(r => r.trim() !== "").map(k => k.split(""))

const [D, L, R, U] = [["d", [1,  0]], ["l", [0, -1]], ["r", [0,  1]], ["u", [-1, 0]]]
const next_positions = {
  "u.": [U],"d.": [D],"l.": [L],"r.": [R],
  "u|": [U],"d|": [D],"r|": [U, D],"l|": [U, D],
  "u-": [R, L],"d-": [R, L],"r-": [R],"l-": [L],
  "u/": [R],"d/": [L],"r/": [U],"l/": [D],
  "u\\": [L],"d\\": [R],"r\\": [D],"l\\": [U],
}

let moves, visited, sum

function traverse(d, p) {
  if (p[0] < 0 || p[0] > grid.length-1 || p[1] > grid[0].length-1 || p[1] < 0 || moves[`${d},${p[0]},${p[1]}`] || grid[p[0]][p[1]] === undefined) {
    return
  }

  sum += visited[`${p[0]},${p[1]}`] ? 0 : 1
  moves[`${d},${p[0]},${p[1]}`] = true
  visited[`${p[0]},${p[1]}`] = true
  next_positions[`${d}${grid[p[0]][p[1]]}`].forEach(np => {
    traverse(np[0], [np[1][0]+p[0], np[1][1]+p[1]])
  })
}

function run(d,p) {
  moves = {} // for cycle detection
  visited  = {}
  sum = 0
  traverse(d,p)
  return sum
}

// increase max stack: node --stack-size=2000 days/day16.js
// part 1
console.log(run("r", [0,0]))

// part 2
let max = 0

for(let i = 0; i < grid[0].length; i++) {
  max = Math.max(max, run("d", [0, i]))
  max = Math.max(max, run("u", [grid.length-1, i]))
}

for(let i = 0;  i < grid.length; i++) {
  max = Math.max(max, run("r", [i,0]))
  max = Math.max(max, run("l", [i, grid.length[0]-1]))
}

console.log(max)