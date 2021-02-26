import { Collection } from "collect.js";

export default interface Pagination<T> {
    count: bigint;
    next: string | null;
    previous: string | null;
    results: Collection<T>;
}