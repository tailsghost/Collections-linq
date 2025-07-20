import { EnumerableCollection } from "./EnumerableCollection.js";
import List from "./List.js";

export class HashSet<T>  {
  private _sets: Set<T>;

  constructor() {
    this._sets = new Set();
  }

  ToList(): List<T> {
    return new List<T>(this.Length()).SetList(this)
  }

  GetSet(): Set<T> {
    return this._sets;
  }

  AddIterable(iterable?: Iterable<T>) : HashSet<T> {
    this._sets = new Set<T>(iterable);
    return this;
  }

  Add(item: T): void {
    this._sets.add(item);
  }

  Remove(item: T): boolean {
    return this._sets.delete(item);
  }

  Contains(item: T): boolean {
    return this._sets.has(item);
  }

  Clear(): void {
    this._sets.clear();
  }

  Length(): number {
    return this._sets.size;
  }

  [Symbol.iterator](): Iterator<T> {
    return this._sets[Symbol.iterator]();
  }
}