import { Collection } from "collect.js";

export default interface Pagination<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Collection<T>;
}
