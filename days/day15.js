import { getData } from "../util/util.js"
let data = await getData(15) 
const steps = data.replace(/\n/g,"").split(",").filter(s=>s.trim() !== "")
const INSERT = "="
const REMOVE = "-"

function hash(step) {
  let cv = 0 
  for(const c of step) {
    if (c === '\n') 
      continue

    cv += c.charCodeAt(0)
    cv *= 17
    cv %= 256
  }
  return cv
}

function part1() {
  return steps.reduce((a, b) => a+hash(b), 0)
}

function part2() {
  const boxes = new Array(256).fill(null).map(a => [])

  steps.forEach(step => {
    const label = step.match(/[a-z]+/i)[0]
    const box_index = hash(label)
    const box = boxes[box_index]
    const is_insert = step.includes(INSERT)
    const is_remove = step.includes(REMOVE)
    const slot_index = box.findIndex(b => b.label === label)
    const exists = slot_index >= 0

    if (is_insert) {
      const [_, focal_length] = step.split(INSERT)
      if (exists) {
        box[slot_index].focal_length = focal_length 
      } else {
        box.push({label, focal_length}) 
      }
    } 

    if (is_remove && exists) {
      box.splice(slot_index, 1)
    }
  })

  let sum = 0
  boxes.forEach((box,i) => {
    box.forEach((slot,j) => {
      sum += ((i+1) * (j+1) * +slot.focal_length)
    })
  })
  return sum
}

// part 1
console.log(part1())

// part 2
console.log(part2())