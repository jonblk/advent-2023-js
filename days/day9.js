import { getData } from "../util/util.js";

const data = await getData(9) 
let lines = data.split("\n").filter(l=>l.trim() !== "").map(l=>l.split(" ").map(v => +v))

const part1 = () => {
	let sum = 0
	lines.forEach(l=> {
		const diffs = [l];
		while (true) {
			if (diffs[0].every(v => v === 0)) {
				sum += diffs.reduce((acc, arr) => acc + arr.at(-1), 0);
				break
			}

			const diff = [];

			for (let i = 0; i < diffs[0].length - 1; i++) {
				diff.push(diffs[0][i + 1] - diffs[0][i]);
			}

			diffs.unshift(diff);
		}
	})
	return sum
}


const part2 = () => {
	let sum = 0
	lines.forEach(l=> {
		const diffs = [l];
		while (true) {
			if (diffs[0].every(v => v === 0)) {
				for(let i = 0; i < diffs.length - 1; i++) {
					 diffs[i+1].unshift(diffs[i+1][0] - diffs[i][0])
				}

				sum += diffs.at(-1)[0]
				break
			}

			const diff = [];

			for (let i = 0; i < diffs[0].length - 1; i++) {
				diff.push(diffs[0][i + 1] - diffs[0][i]);
			}

			diffs.unshift(diff);
		}
	})
	return sum
}

console.log(part1())
console.log(part2())