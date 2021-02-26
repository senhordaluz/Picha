export default interface PaginationResponse<T> {
    count: bigint;
    next: string | null;
    previous: string | null;
    results: Array<T>;
}