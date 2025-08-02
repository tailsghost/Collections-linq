import Enumerable from "../services/Enumerable";
import List from "../services/List";

export default interface IEnumerable<T> {
  // Where фильтрует элементы по условию
  Where(predicate: (item: T) => boolean): Enumerable<T>;
  // Определяет проекцию выбранных значений
  Select<U>(selector: (item: T) => U): Enumerable<U>;
  // Пропускает первые n элементов
  Skip(count: number): Enumerable<T>;
  // Возвращает первые n элементы
  Take(count: number): Enumerable<T>;
  // Возвращает true, если хотя бы один элемент удовлетворяет условию
  Any(predicate?: (item: T) => boolean): boolean;
  // Возвращает true, если все элементы удовлетворяют условию
  All(selector: (item: T) => boolean): boolean;
  // Возвращает первый элемент, удовлетворяющий условию
  First(predicate?: (item: T) => boolean): T;
  // Возвращает первый элемент, удовлетворяющий условию иначе default
  FirstOrDefault(
    predicate?: (item: T) => boolean,
    defaultValue?: T | null
  ): T | null;
  // Возвращает последний элемент, удовлетворяющий условию
  Last(predicate?: (item: T) => boolean): T;
  // Возвращает последний элемент, удовлетворяющий условию иначе default
  LastOrDefault(
    predicate?: (item: T) => boolean,
    defaultValue?: T | null
  ): T | null;
  // Количество элементов в Enumerable
  Count(): number;
  // Делает копию Enumerable
  Clone(sep: number): Enumerable<T>;
  // Возвращает Array
  ToArray(): T[];
  // Возвращает копию Enumerable в новом List
  ToList(): List<T>;
  // Возвращает копию Enumerable в новом HashSet
  ToHashSet(): Enumerable<T>;
  // Возвращает коллекцию Set
  ToSet(): Set<T>;
  // Перебирает элементы и с каждым выполняет действие
  ForEach(action: (item: T) => void): void;
  // Возвращает минимальное значение
  Min(selector?: (item: T) => number): number | null;
  // Возвращает максильное значение
  Max(selector?: (item: T) => number): number | null;
  // Возвращает сумму
  Sum(selector?: (item: T) => number): number;
  // Преобрает T в U
  Cast<U>(): Enumerable<U>;
  // Переворачивает коллекцию
  Reverse(): Enumerable<T>;
  // Возвращает новый Enumerable с уникальными элементами
  Distinct(): Enumerable<T>;
  // Сортирует элементы по возрастанию
  OrderBy<K>(keySelector: (item: T) => K): Enumerable<T>;
  // Сортирует элементы по убыванию
  OrderByDescending<K>(keySelector: (item: T) => K): Enumerable<T>;
  // Добавляет вторичный ключ сортировки по возрастанию
  ThenBy<K>(keySelector: (item: T) => K): Enumerable<T>;
  // Добавляет вторичный ключ сортировки по убыванию
  ThenByDescending<K>(keySelector: (item: T) => K): Enumerable<T>;
  // Группирует элементы по ключу в map.
  GroupBy<K>(keySelector: (item: T) => K): Enumerable<[K, T[]]>;
  // Выполняет соединение двух Enumerable по ключам
  Join<U, K, R>(
    inner: Iterable<U>,
    outerKey: (o: T) => K,
    innerKey: (i: U) => K,
    resultSelector: (o: T, i: U) => R
  ): Enumerable<R>;
}
