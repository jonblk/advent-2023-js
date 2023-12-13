import { getData } from "../util/util.js"

function shortestPath(pointA, pointB) {
	return Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);
}

const data = await getData(11) 
const grid = data.split("\n").filter(r => r.trim() !== "").map(r=>r.split(""))

// Find empty rows and columns
const emptyRows = []
const emptyColumns = []

grid.forEach((l,i) => {
	if (l.every(c => c === ".")){
		emptyRows.push(i)
	}
})

grid[0].forEach((l,i) => {
	if (grid.map(r => r[i]).every(c => c === ".")) {
		emptyColumns.push(i)
	}
})

function solve(expansionAmount) {
	let galaxies = []

	grid.forEach((r,i) => {
		r.forEach((c,j) => {
			if (c === "#"){
				const row_expansions = emptyRows.filter(r => i > r ).length 
				const col_expansions = emptyColumns.filter(c => j > c ).length

				const ri = i + (row_expansions * expansionAmount) - row_expansions 
				const ci = j + (col_expansions * expansionAmount) - col_expansions 

				galaxies.push([ri, ci])
			}
		})
	})

	let sum = 0

	for(let i = 0; i < galaxies.length; i++) {
		for(let j = i+1; j < galaxies.length; j++) {
			sum += shortestPath(galaxies[i], galaxies[j])
		}
	}

	return sum
}

// part 1
console.log(solve(2))

// part 2
console.log(solve(1000000))