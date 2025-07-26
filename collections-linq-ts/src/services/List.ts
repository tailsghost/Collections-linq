import IList from "../interfaces/IList.js";
import { Collection } from "./Collection.js";
import Enumerable from "./Enumerable.js";

export default class List<T> extends Collection<T> implements IList<T> {
  protected _size: number;
  protected _items: (T | undefined)[];

  private _capacity = 0;

  ToArray(): T[] {
    return this._items as T[];
  }

  ToList(): List<T> {
    return this;
  }

  Length(): number {
    return this._size;
  }

  constructor(capacity = 4) {
    super();
    const cap = capacity >= 4 ? capacity : 4;
    this._items = new Array<T>(cap);
    this._capacity = cap;
    this._size = 0;
  }

  SetList(list: Iterable<T>): List<T> {
    this._items = new Array<T>(this._capacity)
    for(const x of list)
      this._items.push(x)
    return this;
  }

  private EnsureCapacity(min: number) {
    if (this._capacity >= min) return;
    this._capacity = this._capacity * 2;
    this._items.length = this._capacity;
  }

  Get(index: number): T {
    if (index < 0 || index > this._size)
      throw new RangeError("Index out of range");
    return this._items[index]!;
  }

  Set(index: number, value: T): void {
    if (index < 0 || index >= this._size)
      throw new RangeError("Index out of range");
    this._items[index] = value;
  }

  Add(item: T): void {
    let size = this._size + 1;
    this.EnsureCapacity(size);
    this._items[this._size] = item;
    this._size = size;
  }

  Remove(item: T): boolean {
    const idx = this.IndexOf(item);
    if (idx < 0) return false;

    this.RemoveAt(idx);
    return true;
  }

  Insert(index: number, item: T): void {
    if (index < 0 || index > this._size)
      throw new RangeError("Index out of range");
    const size = this._size + 1;
    this.EnsureCapacity(size);
    for (let i = this._size; i > index; i--)
      this._items[i] = this._items[i - 1];

    this._items[index] = item;
    this._size++;
  }

  Clear(): void {
    this._items = new Array<T>(this._capacity);
    this._size = 0;
  }

  Count(): number {
    return this._size;
  }

  IndexOf(item: T): number {
    for (let i = 0; i < this._size; i++) if (this._items[i] === item) return i;
    return -1;
  }

  RemoveAt(index: number): T {
    if (index < 0 || index >= this._size)
      throw new RangeError("Index out of range");

    const value = this._items[index]!;

    for (let i = index; i < this._size - 1; i++)
      this._items[i] = this._items[i + 1];

    this._size = this._size - 1;
    this._items[this._size] = undefined;

    return value;
  }

  Sort(comparer: (a: T, b: T) => number): Enumerable<T> {
    const data = this._items as T[];
    data.sort(comparer);
    this._items = data;
    return new Enumerable<T>(this._items as T[]);
  }

  Reverse(): Enumerable<T> {
    let left = 0;
    let right = this._size - 1;
    while (left < right) {
      const tmp = this._items[left];
      this._items[left] = this._items[right];
      this._items[right] = tmp;
      left++;
      right--;
    }
    return new Enumerable<T>(this._items as T[]);
  }

  LastIndexOf(item: T): number {
    for (let i = this._size - 1; i >= 0; i--)
      if (this._items[i] === item) return i;

    return -1;
  }

  [Symbol.iterator](): Iterator<T> {
    let i = 0;
    const size = this._size;
    const items = this._items;

    return {
      next(): IteratorResult<T> {
        if (i < size) {
          const value = items[i];
          if (value === undefined) {
            return { value: undefined as any, done: true };
          }
          i++;
          return { value, done: false };
        }
        return { value: undefined as any, done: true };
      },
    };
  }
}
