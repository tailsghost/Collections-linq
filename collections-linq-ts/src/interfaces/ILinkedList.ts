import { IEnumerable } from "./IEnumerable.js";

export interface ILinkedList<T> extends IEnumerable<T> {
    AddFirst(item: T): void;
    AddLast(item: T): void;
    RemoveFirst(item: T): T | null;
    RemoveLast(item: T): T | null;
}