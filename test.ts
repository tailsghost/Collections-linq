import {Enumerable} from "./collections-linq-ts/dist/index.js"; 

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

var el = new Array<Elem>();

for(let x of ell) {
    el.push(new Elem(x.num / 2))
}

el = el.sort((a,b) => a.num + b.num)

let e: typeof el[0] | null = null;

for(let x of el) {
    if(x.num == 0) continue;
    if((x.num / 1000_00) % 2 == 0)
    {
        e = x;
        break;
    }
}

const end = performance.now();
const elapsed = end - start; 

console.log(elapsed);

const start1 = performance.now();
const list = Enumerable.Range(0, 1_000_000)
                        .Where(x => x % 2 == 0)
                        .Select(x => new Elem(x))
                        .Select(x => new Elem(x.num / 2))
                        .ToList()
                        .Sort((a,b) => a.num - b.num)
                        .FirstOrDefault(x => x.num > 0 && (x.num / 1000_00) % 2 == 0);

const end1 = performance.now();
const elapsed1 = end1 - start1; 

const result = {
    array:elapsed,
    list:elapsed1
}

const lol = 1;


