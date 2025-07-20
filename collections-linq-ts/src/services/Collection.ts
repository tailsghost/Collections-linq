import { ICollection } from "../interfaces/ICollection.js";
import { EnumerableCollection } from "./EnumerableCollection.js";

export abstract class Collection<T> extends EnumerableCollection<T> implements ICollection<T> {
  abstract Length(): number;
  abstract Add(item: T): void;
  abstract Remove(item: T): boolean;
  abstract Clear(): void;

  Contains(Item: T, idx: number | null = null): boolean {
    for (const x of this) if (x === Item) return true;
    return false;
  }
}
