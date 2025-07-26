import { HashSet } from "./HashSet.js";
import List from "./List.js";

export default class Enumerable<T> {
  constructor(private readonly _src: Iterable<T>) {}

  public static Range(start: number, count: number): Enumerable<number> {
    const result = new List<number>(count);
    while (count-- > 0) result.Add(start++);
    return new Enumerable(result);
  }

  public static Repeat<T>(element: T, count: number): Enumerable<T> {
    const result = new List<T>(count);
    while (count-- > 0) result.Add(element);
    return new Enumerable(result);
  }

  Where(predicate: (item: T) => boolean): Enumerable<T> {
    const result = this.GetList<T>(4);
    for (const x of this._src) if (predicate(x)) result.Add(x!);
    return new Enumerable(result);
  }

  public static From<U>(src: Iterable<U>): Enumerable<U> {
    return new Enumerable(src);
  }

  public static Empty<U>(): Enumerable<U> {
    return new Enumerable<U>([]);
  }

  Select<U>(selector: (item: T) => U): Enumerable<U> {
    const result = this.GetList<U>(4);
    for (const x of this._src) result.Add(selector(x));
    return new Enumerable(result);
  }

  Skip(count: number): Enumerable<T> {
    const result = this.GetList<T>(2);
    let skipped = 0;
    for (const x of this._src) {
      if (skipped++ < count) continue;
      result.Add(x!);
    }
    return new Enumerable(result);
  }

  Take(count: number): Enumerable<T> {
    const result = new List<T>(this.Count() - count);
    let taken = 0;
    for (const x of this._src) {
      if (taken++ >= count) break;
      result.Add(x!);
    }
    return new Enumerable(result);
  }

  Any(predicate?: (item: T) => boolean): boolean {
    if (!predicate) {
      for (const _ of this._src) return true;
      return false;
    }
    for (const x of this._src) if (predicate(x)) return true;
    return false;
  }

  First(predicate?: (item: T) => boolean): T {
 if (!predicate) {
      for (const x of this._src) return x!;
      throw new Error("Sequence empty");
    }
    for (const x of this._src) if (predicate(x!)) return x!;
    throw new Error("No match");
  }

  FirstOrDefault(
    predicate?: (item: T) => boolean,
    defaultValue: T | null = null
  ): T | null {
   try {
      return this.First(predicate);
    } catch {
      return defaultValue;
    }
  }

  Last(predicate?: (item: T) => boolean): T {
    let res: T | undefined;
    if (!predicate) {
      for (const x of this._src) res = x;
      if (res === undefined) throw new Error("Sequence empty");
      return res;
    }
    for (const x of this._src) if (predicate(x)) res = x;
    if (res === undefined) throw new Error("No match");
    return res;
  }

  LastOrDefault(
    predicate?: (item: T) => boolean,
    defaultValue: T | null = null
  ): T | null {
    try {
      return this.Last(predicate);
    } catch {
      return defaultValue;
    }
  }

  Count(): number {
    let cnt = 0;
    for (const _ of this._src) cnt++;
    return cnt;
  }

  ToArray(): T[] {
    return [...this._src as T[]];
  }

  ToList(): List<T> {
    return this.GetList<T>().SetList(this._src as Iterable<T>)
  }

  ToHashSet(): Enumerable<T> {
    const result = new HashSet<T>().AddIterable(this._src as Iterable<T>);
    return new Enumerable(result);
  }

  ToSet(): Set<T> {
    const result = new HashSet<T>().AddIterable(this._src as Iterable<T>).ToSet();
    return result;
  }

  ForEach(action: (item: T) => void): void {
    for (const x of this._src) action(x!);
  }

  Min(selector?: (item: T) => number): number | null {
    let min: number | null = null;
    for (const x of this._src) {
      const v = selector ? selector(x) : (x as unknown as number);
      if (min === null || v < min) min = v;
    }
    return min;
  }

  Max(selector?: (item: T) => number): number | null {
    let max: number | null = null;
    for (const x of this._src) {
      const v = selector ? selector(x) : (x as unknown as number);
      if (max === null || v > max) max = v;
    }
    return max;
  }

  Sum(selector?: (item: T) => number): number {
    let sum = 0;
    for (const x of this._src)
      sum += selector ? selector(x) : (x as unknown as number);
    return sum;
  }

  Cast<U>(): Enumerable<U> {
    const result = this.GetList<U>();
    for (const x of this._src) result.Add(x as unknown as U);

    return new Enumerable(result);
  }

  private GetList<T>(sep: number = 1): List<T> {
    let result;
    if (this._src as List<T>)
      result = new List<T>((this._src as List<T>).Count() / sep);
    else {
      result = new List<T>(this.Count() / sep);
    }
    return result;
  }

  [Symbol.iterator](): Iterator<T> {
    return this._src[Symbol.iterator]();
  }
}
