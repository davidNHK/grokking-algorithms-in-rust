function search(graph, searchFunction, searchQueues, processedNodes = []) {
  if (searchQueues.length === 0) {
    return null;
  }
  const { nodeId, parent } = searchQueues.shift();
  const node = graph[nodeId];
  if (searchFunction(nodeId, node)) {
    return { node: node, nodeId, parent: parent };
  }
  processedNodes.push(nodeId);
  if (node.neighbors)
    searchQueues.push(
      ...node.neighbors
        .filter(nodeNeighbor => !processedNodes.includes(nodeNeighbor))
        .map(nodeNeighbor => ({
          nodeId: nodeNeighbor,
          parent: [...parent, nodeId],
        })),
    );
  return search(graph, searchFunction, searchQueues, processedNodes);
}

export function execute(start, searchFunction, graph) {
  return search(
    graph,
    searchFunction,
    graph[start].neighbors.map(node => ({ nodeId: node, parent: [start] })),
  );
}
