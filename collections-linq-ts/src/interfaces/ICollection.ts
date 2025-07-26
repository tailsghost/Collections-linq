export interface ICollection<T> {
    Add(item: T) : void;
    Remove(item: T):boolean;
    Clear(): void;
    Contains(Item:T): boolean;
}