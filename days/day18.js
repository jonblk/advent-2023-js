import { getData } from "../util/util.js"
const data = await getData(18)
const moves = data.split('\n').filter(s => s.trim() !== "").map(s=>s.split(' '))

// Starting from edge positions use bfs to count
// outside squares, then subtract sum from grid size
function part1(moves) {
  const positions = new Set()
  const outside = new Set()
  let min_r = 0
  let min_c = 0
  let max_r = 0
  let max_c = 0
  let r = 0
  let c = 0

  const bfs = (edge_r,edge_c) => {
    const frontier = [[edge_r,edge_c]]
    while(frontier.length > 0) {
      const v = frontier.pop()
      const [i,j] = v
      if (outside.has(`${i},${j}`) || i < min_r || i > max_r || j < min_c || j > max_c || positions.has(`${i},${j}`)) {
        continue
      }
      outside.add(`${i},${j}`)
      frontier.push([i+1,j])
      frontier.push([i,j-1])
      frontier.push([i,j+1])
      frontier.push([i-1,j])
    }
  }
  
  const vectors = {U: [-1, 0], D: [1, 0], R: [0, 1], L: [0, -1]}

  moves.forEach(m => {
    const distance = m[1]
    for(let i = 0; i < m[1]; i++) {
      const direction = m[0]
      r += +vectors[direction][0]
      c += +vectors[direction][1]
      min_r = Math.min(r, min_r)
      max_r = Math.max(r, max_r)
      max_c = Math.max(c, max_c)
      min_c = Math.min(c, min_c)
      positions.add(`${r},${c}`)
    }
  })

  for(let i = min_r; i <= max_r; i++) {
    bfs(i, min_c)
    bfs(i, max_c)
  }

  for(let j = min_c; j <= max_c; j++) {
    bfs(min_r, j)
    bfs(max_r, j)
  }

  return (-min_r+max_r+1)*(-min_c+max_c+1) - outside.size
}

// part 1
console.log(part1(moves))

/* TODO part 2 
const map = {0:"R",1:"D",2:"L",3:"U"}
const big_directions = directions.map(d => {
  return [map[d[2][7]], parseInt(d[2].slice(2,7),16)]
})
console.log(solve(big_directions))
*/
