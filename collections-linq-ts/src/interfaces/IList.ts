import { ICollection } from "./ICollection.js";
import { IEnumerable } from "./IEnumerable.js";

export default interface IList<T> extends ICollection<T> {
    Get(index: number): T;
    Set(index:number, value: T): void;
    Insert(index:number, item: T): void;
    RemoveAt(index: number) : T;
    IndexOf(item: T): number;
    Sort(comparer: (a:T,b:T) => number) : IEnumerable<T>;
    Reverse():IEnumerable<T>;
    LastIndexOf(item:T): number;
    Length: number;
}