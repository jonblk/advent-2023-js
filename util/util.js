import { config } from 'dotenv';
import fs from 'fs';

config();

export function readFile(day) {
  try {
    const data = fs.readFileSync(`./input/day${day}.txt`, 'utf8');
    return data
  } catch (err) {
    throw `couldn't read data ${err}`
  }
}

export class Queue {
  constructor() {
    this.elements = {};
    this.head = 0;
    this.tail = 0;
  }
  enqueue(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }
  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }
  peek() {
    return this.elements[this.head];
  }
  get length() {
    return this.tail - this.head;
  }
  get isEmpty() {
    return this.length === 0;
  }
}

export async function getData(day) {
  try {
    const response = await fetch(
      `https://adventofcode.com/2023/day/${day}/input`,
      { headers: { 'Cookie': process.env.SESSION_COOKIE } }
    );

    if (!response.ok) {
      throw "Error getting input";
    }

    return  await response.text();
  } catch (e) {
    console.log(e);
    throw("");
  }
}

export class ObjectSet extends Set {
 add(elem) {
  return super.add(typeof elem === 'object' ? JSON.stringify(elem) : elem);
 }
 has(elem) {
  return super.has(typeof elem === 'object' ? JSON.stringify(elem) : elem);
 }
}

/* 
priority queue: 
https://stackoverflow.com/a/42919752 
*/
const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[top];
  }
  push(value) {
    this._heap.push(value);
    this._siftUp();
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}


export {PriorityQueue}