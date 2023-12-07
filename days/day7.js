import { getData } from "./../util/util.js";

const DAY = 7;
const data = await getData(DAY);
let hands = data.split("\n");
while (hands.at(-1).trim() === "") { hands.pop();}


const strengths = {
  'A': 13,
  'K': 12,
  'Q': 11,
  'J': 10,
  'T': 9,
  '9': 8,
  '8': 7,
  '7': 6,
  '6': 5,
  '5': 4,
  '4': 3,
  '3': 2,
  '2': 1
};

const strengthsj = {
  'A': 12,
  'K': 11,
  'Q': 10,
  'T': 9,
  '9': 8,
  '8': 7,
  '7': 6,
  '6': 5,
  '5': 4,
  '4': 3,
  '3': 2,
  '2': 1,
  'J': 0,
};


function compareCards(strengths, a, b) {
  a = a[0];
  b = b[0]
  for(let i = 0; i < a.length; i++) {
    if(strengths[a[i]] > strengths[b[i]]) {
      return 1;
    } else if(strengths[a[i]] < strengths[b[i]]) {
      return -1;
    }
  }
  return 0;
}

// Returns the value of the hand type
const getTypeValue = (hand) => {
    const v = new Map()
    hand.split("").forEach(c => {
      if (v.has(c)) {
          v.set(c, [...v.get(c), c]);
      } else {
          v.set(c, [c])
      }
    })

    const cards = Array.from(v.values());

    // high card
    if (v.size === 5) {
      return 0
    } 

    // 5 of a kind
    if (v.size === 1) {
        return 6
    }

    if (v.size === 2) {
      if (cards.some(group => group.length === 4)) {
          return 5 //  4 of a kind
      } else {
          return 4 // full house
      }
    }

    if (v.size === 3) {
      if (cards.some(group => group.length === 3)) {
          return 3 // three of a kind
      } else {
          return 2 // two pair
      }
    }

    return 1 // one pair
} 

// Recursively find optimal hand if using wild cards 
function j(hand, i=0) {
  if (i >= hand.length) {
    return [hand, getTypeValue(hand)];
  }

  if (hand[i] === "J") {
    let hands = Object.keys(strengthsj).map(v =>
      j(hand.slice(0, i) + v + hand.slice(i+1), i+1)
    );
    let max = 0
    hands.forEach((s,i) => {
      if (s[1] > hands[max][1]) {
        max = i
      }
    })
    return hands[max];
  } else {
    return j(hand, i+1);
  }
}

// ordered from least valuable to most
const getTypeGroups = () => [[],[],[],[],[],[],[]]

function part1() {
  let typeGroups = getTypeGroups() 
  let a = hands.map(h=>[h.split(" ")[0], +h.split(" ")[1]]);
  a.forEach(h => typeGroups[getTypeValue(h[0])].push(h));
  typeGroups = typeGroups.map(g =>{return g.sort((a,b) =>compareCards(strengths, a,b))})
  return run(typeGroups);
}

function part2() {
  let typeGroups = getTypeGroups();
  let a = hands.map(h=>[h.split(" ")[0], +h.split(" ")[1]]);
  a.forEach(h => typeGroups[j(h[0])[1]].push(h));
  typeGroups = typeGroups.map(g =>{return g.sort((a,b) =>compareCards(strengthsj, a,b))})
  return run(typeGroups);
}

function run(typeGroups) {
  let i = 1;
  let winnings = 0;
  typeGroups.forEach(g => {
    g.forEach(a => {
      winnings += a[1]*i;
      i++;
    });
  })
  return winnings
}

// part 1
console.log(part1())

// part 2
console.log(part2())