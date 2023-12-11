import { getData } from "../util/util.js";

const data = await getData(8);
let [moves, _, ...nodes] = (data.split("\n"))

moves = moves.trim().split("")
nodes = nodes.filter(l=> l.trim("") !== "").reduce((map,node,i) => {
  const [key, left, right] = node.match(/[A-Z][A-Z][A-Z]/g)
  map[key] = {left, right, key}
  return map
}, {})

// least common multiple -> https://stackoverflow.com/a/61352020
const gcd = (a, b) => b == 0 ? a : gcd(b, a%b)
const lcm = (a, b) =>  a/gcd(a, b) * b
const lcmAll = (ns) => ns.reduce(lcm, 1)

const getSteps = (node, condition) => {
  let i = 0
  let steps = 0

  while(condition(node.key)) {
    node = nodes[moves[i] === "L" ? node.left : node.right];
    i = (i + 1) % moves.length;
    steps++;
  }

  return steps
}

function part1() {
  return getSteps(nodes["AAA"], k => k !== "ZZZ")
}

function part2() {
  const all_steps = Object
    .keys(nodes)
    .filter(k => k[2] === "A")
    .map(k => getSteps(nodes[k], k => k[2] !== "Z"))

  return lcmAll(all_steps)
}

// part 1
console.log(part1())

// part t2
console.log(part2())