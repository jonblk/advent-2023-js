import { getData } from "./../util/util.js";

const DAY = 4;
const data = await getData(DAY);
let cards = data.split("\n").filter(c=>/^Card/.test(c));

Set.prototype.intersection = function(set) {
  return new Set([...this].filter(x => set.has(x)));
}

const getMatches = (correct,guesses) => new Set(correct.trim().match(/:\s+(.+)/)[1].split(/\s+/).map(c => +c)).intersection(new Set(guesses.trim().split(/\s+/).map(c => +c)))

// part 1
function part1(cards) {
  return cards.reduce((total, row) => {
    let [a, b] = row.split("|");
    let matches = getMatches(a, b)
    return total + (matches.size <= 1 ? matches.size : Math.pow(2, matches.size - 1));
  }, 0);
}

// part 2
function part2(cards) {
  const pile = cards.map(c=>1);

  cards.forEach((row, i) => {
    let [a, b] = row.split("|");
    let matches = getMatches(a, b);
    for (let j = 1; j <= matches.size; j++) {
      pile[i+j] += pile[i]
    }
  });

  return pile.reduce((a, b)=>a+b,0)
}

console.log(part1(cards))
console.log(part2(cards))