# Collections-linq

**Collections-linq** – это LINQ-подобная библиотека для TypeScript.

## Установка

```bash
npm install linq-collections-ts
```

## Импорт

```ts
import Enumerable from "collections-linq-ts";
```

## Интерфейсы


### ICollection<T> 
- `Length(): number`
  Возвращает кол-во элементов в массиве
- `Add(item: T): void`
  Добавляет элемент в конец списка
- `Remove(item: T): boolean`
  Удаляет элемент из списка
- `Clear(): void`
  Полностью очищает список
- `Contains(item: T): boolean`
  Проверяет, находится ли элемент в списке

### IEnumerable<T>
- `Count(): number`
- `Where(predicate: (item: T) => boolean): Enumerable<T>`
  Фильтрует элементы по условию
- `Select<U>(selector: (item: T) => U): Enumerable<U>`
  Определяет проекцию выбранных значений
- `SelectMany<U>(selector: (item: T) => U[]): Enumerable<U>`
  Сводит набор коллекций в одну
- `Skip(count: number): Enumerable<T>`
  Пропускает первые n элементов
- `Take(count: number): Enumerable<T>`
  Возвращает первые n элементы
- `All(predicate: (item: T) => boolean): boolean`
  Возвращает true, если все элементы удовлетворяют условию
- `Any(predicate?: (item: T) => boolean): boolean`
  Возвращает true, если хотя бы один элемент удовлетворяет условию
- `First(predicate?: (item: T) => boolean): T`
  Возвращает первый элемент, удовлетворяющий условию
- `FirstOrDefault(predicate?: (item: T) => boolean, defaultValue?: T): T | null`
  Возвращает первый элемент, удовлетворяющий условию иначе default
- `Last(predicate?: (item: T) => boolean): T`
  Возвращает последний элемент, удовлетворяющий условию
- `LastOrDefault(predicate?: (item: T) => boolean, defaultValue?: T): T | null`
   Возвращает последний элемент, удовлетворяющий условию иначе default
- `Clone(sep?: number): Enumerable<T>`
  Делает копию Enumerable
- `ToArray(): T[]`
  Возвращает Array
- `ToList(): List<T>`
  Возвращает копию Enumerable в новом List
- `ToHashSet(): Enumerable<T>`
  Возвращает копию Enumerable в новом HashSet
- `ToSet(): Set<T>`
  Возвращает коллекцию Set
- `ForEach(action: (item: T) => void): void`
  Перебирает элементы и с каждым выполняет действие
- `Min(selector?: (item: T) => number): number | null`
  Возвращает минимальное значение
- `Max(selector?: (item: T) => number): number | null`
   Возвращает максильное значение
- `Sum(selector?: (item: T) => number): number`
  Возвращает сумму
- `Cast<U>(): Enumerable<U>`
  Приводит элементы к другому типу
- `Reverse(): Enumerable<T>`
  Переворачивает коллекцию
- `Distinct(): Enumerable<T>`
  Возвращает новый Enumerable с уникальными элементами
- `OrderBy<K>(keySelector: (item: T) => K): Enumerable<T>`
  Сортирует элементы по возрастанию
- `OrderByDescending<K>(keySelector: (item: T) => K): Enumerable<T>`
  Сортирует элементы по убыванию
- `ThenBy<K>(keySelector: (item: T) => K): Enumerable<T>`
  Добавляет вторичный ключ сортировки по возрастанию
- `ThenByDescending<K>(keySelector: (item: T) => K): Enumerable<T>`
  Добавляет вторичный ключ сортировки по убыванию
- `GroupBy<K>(keySelector: (item: T) => K): Enumerable<[K, T[]]>`
  Группирует элементы по ключу в map.
- `Join<U, K, R>(inner: Iterable<U>, outerKey: (o: T) => K, innerKey: (i: U) => K, resultSelector: (o: T, i: U) => R): Enumerable<R>`
  Выполняет соединение двух Enumerable по ключам

## Классы

### List<T>
- `Length(): number`
- `Get(index: number): T`
- `Set(index: number, value: T): void`
- `Add(item: T): void`
- `Remove(item: T): boolean`
- `Insert(index: number, item: T): void`
  Вставляет элемент в список по индексу
- `Clear(): void`
- `Count(): number`
- `IndexOf(item: T): number`
  Возвращает индекс в массиве
- `LastIndexOf(item: T): number`
  Возвращает последний индекс элемента в массиве
- `RemoveAt(index: number): T`
  Удаляет элемент по индексу
- `Sort(comparer: (a: T, b: T) => number): Enumerable<T>`
- `Reverse(): Enumerable<T>`
  Переворачивает список

### LinkedList<T>
- `Length(): number`
- `Get(): LinkedListNode<T> | null`
- `Add(item: T): void`
- `AddFirst(item: T): void`
  Добавляет элемент в начало
- `AddLast(item: T): void`
  Добавляет элемент в конец
- `Remove(item: T): boolean`
- `RemoveFirst(): T | null`
  Удаляет элемент из начала
- `RemoveLast(): T | null`
  Удаляет элемент с конца
- `Contains(item: T): boolean`
- `Clear(): void`

### Enumerable<T>
- `static Range(start: number, count: number): Enumerable<number>`
  Создает коллекцию чисел начиная с start, длиной count
- `static Repeat(element: T, count: number): Enumerable<T>`
  Создает коллекцию element, которая повторяется count раз
- `static From(src: Iterable<U>): Enumerable<U>`
  Создает Enumerable из существующей коллекции
- `static Empty(): Enumerable<U>`
  Возвращает пустой Enumerable


## Пример

```ts
import Enumerable from "collections-linq-ts";

const nums = Enumerable.Range(1, 10)
  .Where(x => x % 2 === 0)
  .Select(x => x * x)
  .ToArray(); 

const people = Enumerable.From([
  { name: "Alice", age: 30 },
  { name: "Bob", age: 20 },
  { name: "Charlie", age: 30 }
]);
const grouped = people
  .GroupBy(p => p.age)
  .ToArray(); 

const items = Enumerable.From([1, 2, 3]);
const odds = [1, 3, 5];
const joined = items.Join(
  odds,
  x => x,
  y => y,
  (x, y) => ({ x, y })
).ToArray(); 
```
