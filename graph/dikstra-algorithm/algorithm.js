function findShortestPath({
  costsTable,
  current,
  endNodeId,
  graph,
  processedNodes,
}) {
  graph[current].neighbors.forEach(({ nodeId, weights }) => {
    const currentCost = costsTable[nodeId]?.cost ?? Number.POSITIVE_INFINITY;
    const newCost = costsTable[current]?.cost + weights;
    if (newCost < currentCost) {
      costsTable[nodeId] = {
        cost: newCost,
        parent: current,
      };
    }
  });
  processedNodes.push(current);
  let minNodeCost = Number.POSITIVE_INFINITY;
  let nextProcessNodeId = null;
  Object.entries(costsTable).forEach(([nodeId, { cost }]) => {
    if (cost < minNodeCost && !processedNodes.includes(nodeId)) {
      minNodeCost = cost;
      nextProcessNodeId = nodeId;
    }
  });

  if (nextProcessNodeId && nextProcessNodeId !== endNodeId) {
    return findShortestPath({
      costsTable,
      current: nextProcessNodeId,
      endNodeId,
      graph,
      processedNodes,
    });
  }
  return costsTable;
}

export function execute(startNodeId, endNodeId, graph) {
  const costTable = findShortestPath({
    costsTable: {
      [startNodeId]: {
        cost: 0,
        parent: null,
      },
    },
    current: startNodeId,
    endNodeId,
    graph,
    processedNodes: [startNodeId],
  });

  const nodeCost = costTable[endNodeId];
  const { cost } = nodeCost;
  let { parent } = nodeCost;
  const paths = [];
  while (costTable[parent]) {
    paths.push(parent);
    parent = costTable[parent].parent;
  }
  return { cost, parents: paths.reverse() };
}
