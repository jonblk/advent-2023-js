import { getData } from "./../util/util.js"

const DAY = 3;

// fetch data
const data = await getData(DAY)

// build array
let arr = data.split("\n").map(r => r.split(""))

const getNearby = (ri, ci, depth) => {
  if (depth === 0) {
    if ( ci < 0 || ri < 0 || ri >= arr.length || ci >= arr[ri].length ) {
      return [null]
    } else {
      return [arr[ri][ci]]
    }
  } 

  return [
    ...getNearby(ri+1,   ci, depth-1),
    ...getNearby(ri+1, ci-1, depth-1),
    ...getNearby(ri+1, ci+1, depth-1),
    ...getNearby(ri,   ci+1, depth-1),
    ...getNearby(ri,   ci-1, depth-1),
    ...getNearby(ri-1,   ci, depth-1),
    ...getNearby(ri-1, ci-1, depth-1),
    ...getNearby(ri-1, ci+1, depth-1),
  ]
}

const isSymbol = v => v !== null && v !== "." && isNaN(v)

function part1() {
  let sum = 0
  let currentNumber = ""
  let isCurrentNumberValid = false

  const onReachEndOfNumber = () => {
    if (currentNumber) {
      if (isCurrentNumberValid) {
        sum += +currentNumber
      } 
    }  

    currentNumber = ""
    isCurrentNumberValid = false
  }

  arr.forEach((r, ri) => {
    onReachEndOfNumber();
    r.forEach((c, ci) => {
      const isNumber = !isNaN(c);

      if (!isNumber) {
        onReachEndOfNumber();
      } else {
        currentNumber += c;
        if (getNearby(ri, ci, 1).some(isSymbol)) {
          isCurrentNumberValid = true;
        }
      }
    })
  })

  return sum;
}

const visitedSquares = {}

const getNumber = (ri, ci) => {
  if (isNaN(arr[ri][ci]) || visitedSquares[`${ri}-${ci}`] || ci < 0 || ri < 0 || ri >= arr.length || ci >= arr[ri].length ) {
    return "";
  }

  visitedSquares[`${ri}-${ci}`] = arr[ri][ci];

  return getNumber(ri,ci-1) + arr[ri][ci] + getNumber(ri, ci+1);
}

function part2() {
  let sum = 0;

  arr.forEach((r, ri) => {
    r.forEach((c, ci) => {
      if (c === "*") {
        let numbers = []
        numbers.push(getNumber(ri, ci+1));
        numbers.push(getNumber(ri, ci-1));
        numbers.push(getNumber(ri-1, ci-1));
        numbers.push(getNumber(ri-1, ci+1));
        numbers.push(getNumber(ri-1, ci));
        numbers.push(getNumber(ri+1, ci-1));
        numbers.push(getNumber(ri+1, ci));
        numbers.push(getNumber(ri+1, ci+1));
        numbers = numbers.filter(n => n && !isNaN(n))
        if (numbers.length == 2) {
          sum += (+numbers[0] * +numbers[1]);
        }
      }
    });
  })

  return sum;
}

// part 1
console.log(part1())

// part 2
console.log(part2())
