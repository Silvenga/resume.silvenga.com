export function selectMany<T, M>(collection: T[], selector: (item: T) => M[] | undefined): M[] {
    const set = new Set<M>();
    for (const item of collection) {
        const projection = selector(item);
        if (projection) {
            for (const result of projection) {
                set.add(result);
            }
        }
    }
    return [...set];
}
