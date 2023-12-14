import { getData } from "../util/util.js"
const data = await getData(13)
const grids = data.split("\n\n").map(r=>r.split("\n").filter(r=>r.trim() !== ""))

const isMirror = (arr, i) => {
  let index = 0
  while(true) {
    if (i-index < 0 || i+index+1 > arr.length-1 ){
      return true
    }
    if (arr[i-index] !== arr[i+index+1]) {
      return false
    }
    index++
  }
}

function vMirror(grid) {
	const len = grid[0].length 
	for(let i = 0; i < len-1; i++) {
		let valid = true
		for(let y = 0; y < grid.length; y++) {
			if (!isMirror(grid[y], i)) {
				valid = false
				break
			}
		}
		if (valid) {
			return i+1
		}
	} 
	return 0
}

function hMirror(grid) {
	for(let i = 0; i < grid.length-1; i++) {
		if (isMirror(grid, i)) {
			return (i+1)*100 
		}
	}
	return 0
}

function part1(grids) {
	return grids.reduce((total, grid) => total + vMirror(grid) + hMirror(grid), 0) 
}

console.log(part1(grids))