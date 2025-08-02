import { ICollection } from "../interfaces/ICollection.js";

export abstract class Collection<T> implements ICollection<T> {
  abstract Length(): number;
  abstract Add(item: T): void;
  abstract Remove(item: T): boolean;
  abstract Clear(): void;

  Contains(item: T): boolean {
    for (const x of (this as any as Iterable<T>)) {
      if (x === item) return true;
    }
    return false;
  }
}
