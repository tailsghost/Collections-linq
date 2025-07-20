import {Enumerable, HashSet} from "./collections-linq-ts/dist/index.js"; 

class Elem{
    num: number;
    constructor(x: number) {
        this.num = x;
    }
}

const start = performance.now();

const arr = new Array<number>();

for(let i = 0; i < 1_000_000; i++) {
    arr.push(i)
}

var ell = new Array<Elem>();

for(let x of arr) {
    if(x % 2 == 0) ell.push(new Elem(x))
}

const set = new Set();
for(let el of ell) {
    set.add(el)
}

const end = performance.now();
const elapsed = end - start; 

console.log(elapsed);

const start1 = performance.now();
const list = Enumerable.Range(0, 1_000_000)
                        .Where(x => x % 2 == 0)
                        .Select(x => new Elem(x))
                        .Select(x => new Elem(x.num / 2));




const end1 = performance.now();
const elapsed1 = end1 - start1; 

const result = {
    array:elapsed,
    list:elapsed1
}

const lol = 1;


