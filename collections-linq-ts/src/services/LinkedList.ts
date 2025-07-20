import { ILinkedList } from "../interfaces/ILinkedList.js";
import { Collection } from "./Collection.js";

class LinkedListNode<T> {
  constructor(public value: T, public next: LinkedListNode<T> | null = null) {}
}

export class LinkedList<T> extends Collection<T> implements ILinkedList<T> {
  private list: LinkedListNode<T> | null = null;

  constructor() {
    super()
  }

  Length(): number {
    if (!this.list) return 0;

    let index = 0;
    let current = this.list;

    while (current.next) {
      current = current.next;
        index++;
    }
    return index;
  }

  Get(): LinkedListNode<T> | null {
    return this.list;
  }

  Add(item: T): void {
    this.AddLast(item);
  }

  Remove(item: T): boolean {
    if (!this.list) return false;

    if (this.list.value === item) {
      this.list = this.list!.next;
      return true;
    }

    let current = this.list;
    while (current.next) {
      if (current.next.value === item) {
        current.next = current.next.next;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  AddFirst(item: T): void {
    const newNode = new LinkedListNode(item, this.list);
    this.list = newNode;
  }

  AddLast(item: T): void {
    const newNode = new LinkedListNode(item);
    if (!this.list) this.list = newNode;
    else {
      let current = this.list;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  RemoveFirst(item: T): T | null {
    if (!this.list) return null;
    const value = this.list.value;
    this.list = this.list.next;
    return value;
  }

  RemoveLast(item: T): T | null {
    if (!this.list) return null;

    if (this.list.next) {
      const value = this.list.value;
      this.list = null;
      return value;
    }

    let current = this.list;
    while (current.next && current.next.next) {
      current = current.next;
    }

    const value = current.next?.value;
    current.next = null;
    return value as T;
  }

  Contains(item: T): boolean {
  let current = this.list;
  while (current) {
    if (current.value === item) {
      return true;
    }
    current = current.next;
  }
  return false;
}

  [Symbol.iterator](): Iterator<T> {
    let current = this.list;

    return {
      next(): IteratorResult<T> {
        if (current) {
          const value = current.value;
          current = current.next;
          return { value, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }

  Clear(): void {
    this.list = null;
  }
}
