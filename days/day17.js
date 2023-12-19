import { getData, PriorityQueue, ObjectSet } from "../util/util.js"
const data = await getData(17) 

/* https://www.youtube.com/watch?v=2pDSooPLLkI */

function part1() {
  const grid = data.split("\n").filter(r => r.trim() !== "").map(k => k.split(""))
  const visited  = new ObjectSet()
  const start    = [0,0,0,0,0,0] 
  const goal     = [grid.length-1, grid[0].length-1]
  const frontier = new PriorityQueue((i,j) => i[0] < j[0])

  frontier.push(start)

  while (!frontier.isEmpty()) {
    // hl: heat loss (cost)
    // r:  row
    // c:  column
    // dr: direction row
    // dc: direction column
    // n:  same direction count
    const [hl,r,c,dr,dc,n] = frontier.pop()

    if (r === goal[0] && c === goal[1]) return hl // terminate
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) continue
    if (visited.has([r,c,dr,dc,n])) continue

    visited.add([r,c,dr,dc,n])

    // Continue in same direction
    if (n < 3 && !(dr === 0 && dc === 0)) {
      const nr = r+dr
      const nc = c+dc
      // Inbounds
      if ((0 <= nr) && (nr < grid.length) && (0 <= nc) && (nc < grid[0].length)) {
        frontier.push([hl + +grid[nr][nc], nr, nc, dr, dc, n+1])
      }
    }

    // Turn direction
    for(let [ndr, ndc] of [[0,1],[1,0],[0,-1],[-1,0]]) {
      // Not same or opposite direction
      if (`${ndr},${ndc}` !== `${dr},${dc}` && `${ndr},${ndc}` !== `${-dr},${-dc}`) {
        const nr = r+ndr
        const nc = c+ndc

        // Inbounds
        if ((0 <= nr) && (nr < grid.length) && (0 <= nc) && (nc < grid[0].length)) {
          frontier.push([hl + +grid[nr][nc], nr, nc, ndr, ndc, 1])
        }
      }
    }
  }
}

function part2() {
  const grid = data.split("\n").filter(r => r.trim() !== "").map(k => k.split(""))
  const visited  = new ObjectSet()
  const start    = [0,0,0,0,0,0] 
  const goal     = [grid.length-1, grid[0].length-1]
  const frontier = new PriorityQueue((i,j) => i[0] < j[0])

  frontier.push(start)

  while (!frontier.isEmpty()) {
    // hl: heat loss (cost)
    // r:  row
    // c:  column
    // dr: direction row
    // dc: direction column
    // n:  same direction count
    const [hl,r,c,dr,dc,n] = frontier.pop()

    if (r === goal[0] && c === goal[1] && n >= 4) return hl // terminate
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) continue
    if (visited.has([r,c,dr,dc,n])) continue

    visited.add([r,c,dr,dc,n])

    // Continue in same direction
    if (n < 10 && !(dr === 0 && dc === 0)) {
      const nr = r+dr
      const nc = c+dc
      // Inbounds
      if ((0 <= nr) && (nr < grid.length) && (0 <= nc) && (nc < grid[0].length)) {
        frontier.push([hl + +grid[nr][nc], nr, nc, dr, dc, n+1])
      }
    }

    if (n < 4 && !(dr === 0 && dc===0)) {
      continue
    }

    // Turn direction
    for(let [ndr, ndc] of [[0,1],[1,0],[0,-1],[-1,0]]) {
      // Not same or opposite direction
      if (`${ndr},${ndc}` !== `${dr},${dc}` && `${ndr},${ndc}` !== `${-dr},${-dc}`) {
        const nr = r+ndr
        const nc = c+ndc

        // Inbounds
        if ((0 <= nr) && (nr < grid.length) && (0 <= nc) && (nc < grid[0].length)) {
          frontier.push([hl + +grid[nr][nc], nr, nc, ndr, ndc, 1])
        }
      }
    }
  }
}

// part 1
console.log(part1())

// part 2
console.log(part2())