import { getData } from "./../util/util.js"

const DAY = 1;

let v = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9
};

getData(DAY).then(data => {Y
  const lines = data.split("\n");

  const output1 = lines.reduce((sum, seq) => {
    let numbers = seq.match(/\d/g)
    return sum + (numbers ? +`${numbers[0]}${numbers.at(-1)}` : 0)
  }, 0)

  const output2 = lines.reduce((sum, seq) => {
    const matches = [] 
    for (let   i = 0; i < seq.length; i++) {
      for (let j = i; j < seq.length; j++) {
        let substr = seq.slice(i, j+1);
        if (v[substr]) {
          matches.push(substr);
          break;
        }
      }
    }
    return sum + (matches.length > 0 ? +`${v[matches[0]]}${v[matches.at(-1)]}` : 0)
  }, 0)


  console.log(output1)
  console.log(output2)
});


