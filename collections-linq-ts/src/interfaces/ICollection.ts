import { IEnumerable } from "./IEnumerable.js";

export interface ICollection<T> extends IEnumerable<T> {
    Add(item: T) : void;
    Remove(item: T):boolean;
    Clear(): void;
    Contains(Item:T): boolean;
}