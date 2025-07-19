import { ICollection } from "../interfaces/ICollection.js";
import { EnumerableCollection } from "./EnumerableCollection.js";

export abstract class Collection<T> extends EnumerableCollection<T> implements ICollection<T> {
  abstract Add(item: T): void;
  abstract Remove(item: T): boolean;
  abstract Clear(): void;
  abstract [Symbol.iterator](): Iterator<T>;

  Contains(Item: T): boolean {
    for (const x of this) if (x === Item) return true;
    return false;
  }
}
