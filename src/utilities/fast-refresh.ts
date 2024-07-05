export function forceRemountOnFastRefresh(module: NodeModule) {
    if (module.hot) {
        module.hot.accept((getParents) => {
            const parents = getParents();
            console.log(`Module updated, remounting ${parents.length} parents...`, parents);
            return parents;
        });
    }
}
