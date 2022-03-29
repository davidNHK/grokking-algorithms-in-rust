function setupCostStore({ costStore, current, graph, processed }) {
  const currentCost = costStore[current];

  graph[current].forEach(([neighbor, weight]) => {
    const existingCost = costStore[neighbor];
    const newCost = currentCost + weight;
    if (newCost < existingCost) costStore[neighbor] = newCost;
  });
  processed.push(current);
  let nextProcessNode = null;
  let nextProcessNodeCost = Number.POSITIVE_INFINITY;
  costStore.forEach((cost, index) => {
    if (cost >= nextProcessNodeCost || processed.includes(index)) return;
    nextProcessNode = index;
    nextProcessNodeCost = cost;
  });
  if (nextProcessNode !== null)
    return setupCostStore({
      costStore: costStore,
      current: nextProcessNode,
      graph: graph,
      processed: processed,
    });
  return costStore;
}

export function execute(numberOfNodes, graph, startPoint) {
  const costStore = Array.from({ length: numberOfNodes }).map(
    () => Number.POSITIVE_INFINITY,
  );
  costStore[startPoint] = 0;
  return setupCostStore({
    costStore: costStore,
    current: startPoint,
    graph: graph,
    processed: [],
  });
}
