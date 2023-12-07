import { getData } from "./../util/util.js";

const data = await getData(6);
let [times, records] = data.split("\n");
const getValues = line => line.split(/\s+/).map(t=>+t).filter(t=>!isNaN(t));

const run = (times,records) => {
  let o = 1; 
  times.forEach((totalTime, i) => {
    let winCount = 0;
    for(let t = 0; t <= totalTime; t++) {
      if (t*(totalTime-t) > records[i]) {
        winCount += 1;
      }
    }
    o *= winCount;
  });
  return o;
}

// part1
console.log(run(getValues(times),getValues(records)));

// part2
console.log(run([getValues(times).join("")], [getValues(records).join("")]));