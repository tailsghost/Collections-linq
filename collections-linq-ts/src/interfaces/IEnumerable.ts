import { HashSet } from "../services/HashSet.js";
import List from "../services/List.js";


export interface IEnumerable<T> extends Iterable<T> {
  Where(predicate: (item: T) => boolean): IEnumerable<T>;
  Select<U>(selector: (item: T) => U): IEnumerable<U>;
  Skip(count: number): IEnumerable<T>;
  Take(count: number): IEnumerable<T>;
  Any(predicate?: (item: T) => boolean): boolean;
  First(predicate?: (item: T) => boolean): T;
  FirstOrDefault(predicate?: (item: T) => boolean, defaultValue?: T | null): T | null;
  Last(predicate?: (item: T) => boolean): T;
  LastOrDefault(predicate?: (item: T) => boolean, defaultValue?: T | null): T | null;
  Count(): number;
  ToArray(): T[];
  ToList(): List<T>;
  ToHashSet(): HashSet<T>;
  ForEach(action: (item: T) => void): void;
  Min(selector?: (item: T) => number): number | null;
  Max(selector?: (item: T) => number): number | null;
  Sum(selector?: (item: T) => number): number;
  Cast<U>(): IEnumerable<U>;
}