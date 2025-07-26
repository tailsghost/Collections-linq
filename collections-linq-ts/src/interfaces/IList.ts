import Enumerable from "../services/Enumerable.js";
import { ICollection } from "./ICollection.js";

export default interface IList<T> extends ICollection<T> {
    Get(index: number): T;
    Set(index:number, value: T): void;
    Insert(index:number, item: T): void;
    RemoveAt(index: number) : T;
    IndexOf(item: T): number;
    Sort(comparer: (a:T,b:T) => number) : Enumerable<T>;
    Reverse():Enumerable<T>;
    LastIndexOf(item:T): number;
    Count(): number;
}