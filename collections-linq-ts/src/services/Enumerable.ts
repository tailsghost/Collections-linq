import IEnumerable from "../interfaces/IEnumerable.js";
import { HashSet } from "./HashSet.js";
import List from "./List.js";

export default class Enumerable<T> implements IEnumerable<T> {
  constructor(private readonly _src: Iterable<T>) {}

  private _comparerChain?: ((a: T, b: T) => number)[];

  // Создает коллекцию чисел начиная с start, длиной count
  public static Range(start: number, count: number): Enumerable<number> {
    const result = new List<number>(count);
    while (count-- > 0) result.Add(start++);
    return new Enumerable(result);
  }

  // Создает коллекцию element, которая повторяется count раз
  public static Repeat<T>(element: T, count: number): Enumerable<T> {
    const result = new List<T>(count);
    while (count-- > 0) result.Add(element);
    return new Enumerable(result);
  }

  // Создает Enumerable из существующей коллекции
  public static From<U>(src: Iterable<U>): Enumerable<U> {
    return new Enumerable(src);
  }

  // Empty возвращает пустой Enumerable
  public static Empty<U>(): Enumerable<U> {
    return new Enumerable<U>([]);
  }

  // Where фильтрует элементы по условию
  Where(predicate: (item: T) => boolean): Enumerable<T> {
    const result = new List<T>(this.Count() / 4);
    for (const x of this._src) if (predicate(x)) result.Add(x!);
    return new Enumerable(result);
  }

  // Определяет проекцию выбранных значений
  Select<U>(selector: (item: T) => U): Enumerable<U> {
    const result = new List<U>(this.Count());
    for (const x of this._src) result.Add(selector(x));
    return new Enumerable(result);
  }

  // Пропускает первые n элементов
  Skip(count: number): Enumerable<T> {
    const result = this.Clone(2)._src as List<T>;
    let skipped = 0;
    for (const x of this._src) {
      if (skipped++ < count) continue;
      result.Add(x!);
    }
    return new Enumerable(result);
  }

  // Возвращает первые n элементы
  Take(count: number): Enumerable<T> {
    const result = new List<T>(this.Count() - count);
    let taken = 0;
    for (const x of this._src) {
      if (taken++ >= count) break;
      result.Add(x!);
    }
    return new Enumerable(result);
  }

  // Возвращает true, если все элементы удовлетворяют условию
  All(selector: (item: T) => boolean): boolean {
    for (const x of this._src) if (!selector(x)) return false;

    return true;
  }

  // Возвращает true, если хотя бы один элемент удовлетворяет условию
  Any(predicate?: (item: T) => boolean): boolean {
    if (!predicate) {
      for (const _ of this._src) return true;
      return false;
    }
    for (const x of this._src) if (predicate(x)) return true;
    return false;
  }

  // Возвращает первый элемент, удовлетворяющий условию
  First(predicate?: (item: T) => boolean): T {
    if (!predicate) {
      for (const x of this._src) return x!;
      throw new Error("Sequence empty");
    }
    for (const x of this._src) if (predicate(x!)) return x!;
    throw new Error("No match");
  }

  // Возвращает первый элемент, удовлетворяющий условию иначе default
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

  // Возвращает последний элемент, удовлетворяющий условию
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

  // Возвращает последний элемент, удовлетворяющий условию иначе default
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

  // Количество элементов в Enumerable
  Count(): number {
    if (this._src as List<T>) {
      return (this._src as List<T>).Count();
    }
    let cnt = 0;
    for (const _ of this._src) cnt++;
    return cnt;
  }

  // Делает копию Enumerable
  Clone(sep: number = 1): Enumerable<T> {
    const clone = new List<T>(this.Count() / sep);
    for (const x of this._src) clone.Add(x);
    return new Enumerable<T>(clone);
  }

  // Возвращает Array
  ToArray(): T[] {
    return [...(this._src as T[])];
  }

  // Возвращает копию Enumerable в новом List
  ToList(): List<T> {
    return this.Clone()._src as List<T>;
  }

  // Возвращает копию Enumerable в новом HashSet
  ToHashSet(): Enumerable<T> {
    const result = new HashSet<T>().AddIterable(this._src as Iterable<T>);
    return new Enumerable(result);
  }

  // Возвращает коллекцию Set
  ToSet(): Set<T> {
    const result = new HashSet<T>()
      .AddIterable(this._src as Iterable<T>)
      .ToSet();
    return result;
  }

  // Перебирает элементы и с каждым выполняет действие
  ForEach(action: (item: T) => void): void {
    for (const x of this._src) action(x!);
  }

  // Возвращает минимальное значение
  Min(selector?: (item: T) => number): number | null {
    let min: number | null = null;
    for (const x of this._src) {
      const v = selector ? selector(x) : (x as unknown as number);
      if (min === null || v < min) min = v;
    }
    return min;
  }

  // Возвращает максильное значение
  Max(selector?: (item: T) => number): number | null {
    let max: number | null = null;
    for (const x of this._src) {
      const v = selector ? selector(x) : (x as unknown as number);
      if (max === null || v > max) max = v;
    }
    return max;
  }

  // Возвращает сумму
  Sum(selector?: (item: T) => number): number {
    let sum = 0;
    for (const x of this._src)
      sum += selector ? selector(x) : (x as unknown as number);
    return sum;
  }

  // Преобрает T в U
  Cast<U>(): Enumerable<U> {
    const clone = new List<U>(this.Count());
    for (const x of this._src) clone.Add(x as unknown as U);
    return new Enumerable(clone);
  }

  // Переворачивает коллекцию
  Reverse(): Enumerable<T> {
    const arr = this.ToList();
    return arr.Reverse();
  }

  // Возвращает новый Enumerable с уникальными элементами
  Distinct(): Enumerable<T> {
    const set = new Set<T>();
    for (const x of this._src) set.add(x);
    return new Enumerable<T>(new List<T>(this.Count()).SetList(set));
  }

  // Сортирует элементы по возрастанию
  OrderBy<K>(keySelector: (item: T) => K): Enumerable<T> {
    const comparer = (a: T, b: T) => {
      const ka = keySelector(a);
      const kb = keySelector(b);
      return ka < kb ? -1 : ka > kb ? 1 : 0;
    };
    const sorted = this.ToList().Sort(comparer);
    const result = new Enumerable<T>(sorted);
    result._comparerChain = [comparer];
    return result;
  }

  // Сортирует элементы по убыванию
  OrderByDescending<K>(keySelector: (item: T) => K): Enumerable<T> {
    const comparer = (a: T, b: T) => {
      const ka = keySelector(a);
      const kb = keySelector(b);
      return ka > kb ? -1 : ka < kb ? 1 : 0;
    };
    const sorted = this.ToList().Sort(comparer);
    sorted._comparerChain = [comparer];
    return sorted;
  }

  // Добавляет вторичный ключ сортировки по возрастанию
  ThenBy<K>(keySelector: (item: T) => K): Enumerable<T> {
    if (!this._comparerChain)
      throw new Error("ThenBy requires an OrderBy call first!");

    const newComparer = (a: T, b: T) => {
      const ka = keySelector(a);
      const kb = keySelector(b);
      return ka < kb ? -1 : ka > kb ? 1 : 0;
    };

    const combined = (a: T, b: T) => {
      for (const cmp of this._comparerChain!) {
        const result = cmp(a, b);
        if (result !== 0) return result;
      }
      return newComparer(a, b);
    };

    const sorted = this.ToList().Sort(combined);
    const result = new Enumerable<T>(sorted);
    result._comparerChain = [...this._comparerChain, newComparer];
    return result;
  }

  // Добавляет вторичный ключ сортировки по убыванию
  ThenByDescending<K>(keySelector: (item: T) => K): Enumerable<T> {
    if (!this._comparerChain)
      throw new Error("ThenByDescending requires an OrderBy call first.");

    const newComparer = (a: T, b: T) => {
      const ka = keySelector(a);
      const kb = keySelector(b);
      return ka > kb ? -1 : ka < kb ? 1 : 0;
    };

    const combined = (a: T, b: T) => {
      for (const cmp of this._comparerChain!) {
        const result = cmp(a, b);
        if (result !== 0) return result;
      }
      return newComparer(a, b);
    };

    const sorted = this.ToList().Sort(combined);
    const result = new Enumerable<T>(sorted);
    result._comparerChain = [...this._comparerChain, newComparer];
    return result;
  }

  // Группирует элементы по ключу в map.
  GroupBy<K>(keySelector: (item: T) => K): Enumerable<[K, T[]]> {
    const map = new Map<K, T[]>();
    for (const x of this._src) {
      const key = keySelector(x);
      const grp = map.get(key) || [];
      grp.push(x);
      map.set(key, grp);
    }
    return new Enumerable(map.entries());
  }

  // Выполняет соединение двух Enumerable по ключам
  Join<U, K, R>(
    inner: Iterable<U>,
    outerKey: (o: T) => K,
    innerKey: (i: U) => K,
    resultSelector: (o: T, i: U) => R
  ): Enumerable<R> {
    const innerList = new Enumerable<U>(inner);
    const count = this.Count();
    const result = new List<R>(Math.round(count / 2));
    for (const o of this._src) {
      const ok = outerKey(o);
      for (const i of innerList) {
        if (innerKey(i) === ok) result.Add(resultSelector(o, i));
      }
    }
    return new Enumerable(result);
  }

  [Symbol.iterator](): Iterator<T> {
    return this._src[Symbol.iterator]();
  }
}
