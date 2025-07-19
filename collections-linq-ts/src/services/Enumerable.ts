import List from "./List.js";

export default class Enumerable {
  public static Range(start: number, count: number): List<number> {
    const result = new List<number>(count);
    while (count-- > 0) result.Add(start++);
    return result;
  }

  public static Repeat<T>(element: T, count: number): List<T> {
    const result = new List<T>(count);
    while (count-- > 0) result.Add(element);
    return result;
  }
}
