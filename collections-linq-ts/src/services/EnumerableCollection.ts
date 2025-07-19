import { IEnumerable } from "../interfaces/IEnumerable.js";
import List from "./List.js";

export abstract class EnumerableCollection<T> implements IEnumerable<T> {
  abstract [Symbol.iterator](): Iterator<T>;

  Where(predicate: (item: T) => boolean): IEnumerable<T> {
    const result = new List<T>(this.Count() / 2);
    for (const x of this) if (predicate(x)) result.Add(x);
    return result;
  }

  Select<U>(selector: (item: T) => U): IEnumerable<U> {
    const result = new List<U>(this.Count());
    for (const x of this) result.Add(selector(x));
    return result;
  }

  Skip(count: number): IEnumerable<T> {
    const result = new List<T>(this.Count() - count);
    let skipped = 0;
    for (const x of this) {
      if (skipped++ < count) continue;
      result.Add(x);
    }
    return result;
  }

  Take(count: number): IEnumerable<T> {
    const result = new List<T>(this.Count() - count);
    let taken = 0;
    for (const x of this) {
      if (taken++ >= count) break;
      result.Add(x);
    }
    return result;
  }

  Any(predicate?: (item: T) => boolean): boolean {
    for (const x of this) if (!predicate || predicate(x)) return true;
    return false;
  }

  First(predicate?: (item: T) => boolean): T {
    for (const x of this) if (!predicate || predicate(x)) return x;
    throw new Error("Sequence contains no matching element");
  }

  FirstOrDefault(
    predicate?: (item: T) => boolean,
    defaultValue: T | null = null
  ): T | null {
    for (const x of this) if (!predicate || predicate(x)) return x;
    return defaultValue;
  }

  Last(predicate?: (item: T) => boolean): T {
    let res: T | undefined;
    for (const x of this) if (!predicate || predicate(x)) res = x;
    if (res == undefined)
      throw new Error("Sequence contains no matching element");
    return res!;
  }

  LastOrDefault(
    predicate?: (item: T) => boolean,
    defaultValue: T | null = null
  ): T | null {
    let res: T | null = null;
    for (const x of this) if (!predicate || predicate(x)) res = x;
    return res ?? defaultValue;
  }

  Count(): number {
    if(this instanceof Array) {
      return this.length
    }
    
    return 0;
  }

  ToArray(): T[] {
    if (this instanceof Array) {
      return this as T[];
    }
    const result: T[] = new Array<T>(this.Count());

    if (this instanceof List) {
      const count = this.Count();
      for (let i = 0; i < count; i++) {
        result.push(this.Get(i));
      }
    }
    return result;
  }

  ToList(): List<T> {
    if (this instanceof List) {
      return this as List<T>;
    }
    const result = new List<T>(this.Count());
    for (const x of this) result.Add(x);
    return result;
  }

  ForEach(action: (item: T) => void): void {
    for (const x of this) action(x);
  }

  Min(selector?: (item: T) => number): number | null {
    let min: number | null = null;
    for (const x of this) {
      const v = selector ? selector(x) : (x as unknown as number);
      if (min === null || v < min) min = v;
    }
    return min;
  }

  Max(selector?: (item: T) => number): number | null {
    let max: number | null = null;
    for (const x of this) {
      const v = selector ? selector(x) : (x as unknown as number);
      if (max === null || v > max) max = v;
    }
    return max;
  }

  Sum(selector?: (item: T) => number): number {
    let sum = 0;
    for (const x of this)
      sum += selector ? selector(x) : (x as unknown as number);
    return sum;
  }

  Cast<U>(): IEnumerable<U> {
    const result = new List<U>();
    for (const x of this) result.Add(x as unknown as U);

    return result;
  }
}
