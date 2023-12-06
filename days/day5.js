import { getData } from "./../util/util.js";

const DAY = 5;
const data = await getData(DAY);

let seeds = data.match(/seeds:\s([\d\s]+)\n\n/)[1].split(" ")

const seedRanges = []
for(let i = 0; i <= seeds.length; i = i+2) {
  if (!seeds[i]) {
    break 
  }
  const start =  seeds[i];
  const range = seeds[i+1]-1;
  seedRanges.push([+start, +start + +range])
}

const getMappings = (type) => {
  const r = new RegExp(type + ":\n+([\\d\\s\n]+)");
  return data
    .match(r)[1]
    .split("\n")
    .map((s) => s.split(" "))
    .filter((s) => s.length === 3);
}

const mappings = [
  getMappings("seed-to-soil map"),
  getMappings("soil-to-fertilizer map"),
  getMappings("fertilizer-to-water map"),
  getMappings("water-to-light map"),
  getMappings("light-to-temperature map"),
  getMappings("temperature-to-humidity map"),
  getMappings("humidity-to-location map"),
].map(m => m.map(a=> createMapping(a[1], a[0], a[2])))

const get = (search, source, target, range) => {
  if ((search >= source) && (search < source+range)) {
    return ((search - source) + target)
  }  else {
    return null
  }
}

function createMapping(source, target, range) {
  return {
    source: +source,
    target: +target,
    range: +range,
  }
}

const part1 = () => {
  let min = Infinity;
  seeds.forEach(seed => {
    min = Math.min(mappings.reduce((source, mapping) => {
      for(let i = 0; i < mapping.length; i++) {
        let s = get(source, mapping[i].source, mapping[i].target, mapping[i].range);
        if (s) {
          return s;
        } 
      }
      return source; 
    }, seed), min);
  })
  return min;
}

// Not the optimal solution, takes ~5 minutes on single thread. 
const part2 = () => {
  let min = Infinity;
  seedRanges.forEach(seedRange => {
    for(let seed = seedRange[0]; seed <= seedRange[1]; seed++) {
      min = Math.min(mappings.reduce((source, mapping) => {
        for(let i = 0; i < mapping.length; i++) {
          let s = get(source, mapping[i].source, mapping[i].target, mapping[i].range);
          if (s) {
            return s;
          } 
        }
        return source; 
      }, seed), min);
    }
    console.log(`completed: ${seedRange}`)
  })
  return min;
}

console.log(part1())
console.log(part2())