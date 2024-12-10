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

    function Swap(route, i, k) {
        return route.slice(0, i)
            .concat(route.slice(i, k + 1).reverse())
            .concat(route.slice(k + 1));
    }

    let currentRoute = Array.from({ length: n }, (_, i) => i);
    currentRoute = currentRoute.sort(() => Math.random() - 0.5);
    let currentLength = calculateRouteLength(currentRoute);

    let bestRoute = currentRoute;
    let bestLength = currentLength;

    const maxIterations = 1000; 
    let iterationsWithoutImprovement = 0; 

    for (let iter = 0; iter < maxIterations; iter++) {
        const i = Math.floor(Math.random() * (n - 1));
        const k = Math.floor(Math.random() * (n - i - 1)) + i + 1;

        const newRoute = Swap(bestRoute, i, k);
        const newLength = calculateRouteLength(newRoute);

        if (newLength < bestLength) {
            bestRoute = newRoute;
            bestLength = newLength;
            iterationsWithoutImprovement = 0; 
        } else {
            iterationsWithoutImprovement++;
        }

        if (iterationsWithoutImprovement >= 100) break;
    }

    return bestLength;
}
