import { getData } from "../util/util.js"
const data = await getData(12)
const lines = data.split("\n").filter(r=>r.trim() !== "").map(r=>r.split(" ")).map(r=> [r[0], r[1].split(',')])

const WORKING = "."
const DAMAGED = "#"
const UNKNOWN = "?"

function isValid(springs, numbers) {
  const matches = springs.match(/#+/g)
  if (!matches) return false 
  return `${matches.map(m => `${m.length}`)}` === `${numbers}`
}

// Valid permutations (recursive)
function vp(springs, i, v) {
  if (i > springs.length-1) {
    return v(springs) ? 1 : 0
  }

  if (springs[i] === UNKNOWN) {
    const p = type => springs.slice(0,i) + type + springs.slice(i+1)
    return vp(p(WORKING), i+1, v) + vp(p(DAMAGED), i+1, v) 
  } else {
    return vp(springs, i+1, v)
  }
}

// part 1
console.log(lines.reduce((total, d) => total + vp(d[0], 0, s => isValid(s,d[1])), 0))

// part 2 TODO

