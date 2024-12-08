function tsp_ls(distance_matrix) {
    const n = distance_matrix.length;
    if (n <= 1) return 0;

    function calculateRouteLength(route) {
        let total = 0;
        for (let i = 0; i < route.length - 1; i++) {
            total += distance_matrix[route[i]][route[i + 1]];
        }
        return total;
    }

    function permute(arr) {
        if (arr.length === 0) return [[]];
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            const rest = permute(arr.slice(0, i).concat(arr.slice(i + 1)));
            for (const perm of rest) {
                result.push([arr[i], ...perm]);
            }
        }
        return result;
    }

    const cities = Array.from({ length: n }, (_, i) => i);
    const allRoutes = permute(cities);

    let shortestLength = Infinity;
    for (const route of allRoutes) {
        const length = calculateRouteLength(route);
        if (length < shortestLength) {
            shortestLength = length;
        }
    }

    return shortestLength;
}
