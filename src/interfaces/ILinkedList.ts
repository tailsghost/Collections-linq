export interface ILinkedList<T> {
    AddFirst(item: T): void;
    AddLast(item: T): void;
    RemoveFirst(item: T): T | null;
    RemoveLast(item: T): T | null;
}