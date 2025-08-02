# Collections-linq

Простая TypeScript-библиотека для LINQ-подобных операций над коллекциями.

## Установка

```bash
npm install collections-linq-ts
```

## Интерфейсы

### ICollection<T>
- `Length(): number`
- `Add(item: T): void`
- `Remove(item: T): boolean`
- `Clear(): void`
- `Contains(item: T): boolean`

### IEnumerable<T>
- `[Symbol.iterator](): Iterator<T>`
- `Count(): number`
- `Where(predicate: (item: T) => boolean): Enumerable<T>`
- `Select<U>(selector: (item: T) => U): Enumerable<U>`
- `Skip(count: number): Enumerable<T>`
- `Take(count: number): Enumerable<T>`
- `All(predicate: (item: T) => boolean): boolean`
- `Any(predicate?: (item: T) => boolean): boolean`
- `First(predicate?: (item: T) => boolean): T`
- `FirstOrDefault(predicate?: (item: T) => boolean, defaultValue?: T): T | null`
- `Last(predicate?: (item: T) => boolean): T`
- `LastOrDefault(predicate?: (item: T) => boolean, defaultValue?: T): T | null`
- `Clone(sep?: number): Enumerable<T>`
- `ToArray(): T[]`
- `ToList(): List<T>`
- `ToHashSet(): Enumerable<T>`
- `ToSet(): Set<T>`
- `ForEach(action: (item: T) => void): void`
- `Min(selector?: (item: T) => number): number | null`
- `Max(selector?: (item: T) => number): number | null`
- `Sum(selector?: (item: T) => number): number`
- `Cast<U>(): Enumerable<U>`
- `Reverse(): Enumerable<T>`
- `Distinct(): Enumerable<T>`
- `OrderBy<K>(keySelector: (item: T) => K): Enumerable<T>`
- `OrderByDescending<K>(keySelector: (item: T) => K): Enumerable<T>`
- `ThenBy<K>(keySelector: (item: T) => K): Enumerable<T>`
- `ThenByDescending<K>(keySelector: (item: T) => K): Enumerable<T>`
- `GroupBy<K>(keySelector: (item: T) => K): Enumerable<[K, T[]]>`
- `Join<U, K, R>(inner: Iterable<U>, outerKey: (o: T) => K, innerKey: (i: U) => K, resultSelector: (o: T, i: U) => R): Enumerable<R>`

## Классы

### List<T>
- `constructor(capacity?: number)`
- `Length(): number`
- `Get(index: number): T`
- `Set(index: number, value: T): void`
- `Add(item: T): void`
- `Remove(item: T): boolean`
- `Insert(index: number, item: T): void`
- `Clear(): void`
- `Count(): number`
- `IndexOf(item: T): number`
- `LastIndexOf(item: T): number`
- `RemoveAt(index: number): T`
- `Sort(comparer: (a: T, b: T) => number): Enumerable<T>`
- `Reverse(): Enumerable<T>`
- `[Symbol.iterator](): Iterator<T>`

### LinkedList<T>
- `constructor()`
- `Length(): number`
- `Get(): LinkedListNode<T> | null`
- `Add(item: T): void`
- `AddFirst(item: T): void`
- `AddLast(item: T): void`
- `Remove(item: T): boolean`
- `RemoveFirst(): T | null`
- `RemoveLast(): T | null`
- `Contains(item: T): boolean`
- `Clear(): void`
- `[Symbol.iterator](): Iterator<T>`

### Enumerable<T>
- `static Range(start: number, count: number): Enumerable<number>`
- `static Repeat(element: T, count: number): Enumerable<T>`
- `static From(src: Iterable<U>): Enumerable<U>`
- `static Empty(): Enumerable<U>`
- все методы интерфейса `IEnumerable<T>`

### HashSet<T>
- `Add(item: T): HashSet<T>`
- `AddIterable(src: Iterable<T>): HashSet<T>`
- `Remove(item: T): boolean`
- `Contains(item: T): boolean`
- `ToSet(): Set<T>`
- `[Symbol.iterator](): Iterator<T>`


## Пример

```ts
import Enumerable from "collections-linq-ts";

// Фильтрация и проекция
const nums = Enumerable.Range(1, 10)
  .Where(x => x % 2 === 0)
  .Select(x => x * x)
  .ToArray(); 

// Группировка
const people = Enumerable.From([
  { name: "Alice", age: 30 },
  { name: "Bob", age: 20 },
  { name: "Charlie", age: 30 }
]);
const grouped = people
  .GroupBy(p => p.age)
  .ToArray(); 

// Соединение двух коллекций
const items = Enumerable.From([1, 2, 3]);
const odds = [1, 3, 5];
const joined = items.Join(
  odds,
  x => x,
  y => y,
  (x, y) => ({ x, y })
).ToArray(); 
```
