// eslint-disable-next-line max-params
function search(
  graph,
  currentNodeId,
  searchFunction,
  stacks = [],
  explored = [],
) {
  const node = graph[currentNodeId];
  if (!explored.includes(currentNodeId)) {
    if (searchFunction(currentNodeId, node)) {
      return { node: node, nodeId: currentNodeId, parent: stacks };
    }
    explored.push(currentNodeId);
  }

  const unprocessedNodeId = node.neighbors.find(neighbor => {
    return !explored.includes(neighbor);
  });
  if (unprocessedNodeId) {
    stacks.splice(0, 0, currentNodeId);
    return search(graph, unprocessedNodeId, searchFunction, stacks, explored);
  }
  if (stacks.length === 0) return null;
  return search(graph, stacks.shift(), searchFunction, stacks, explored);
}

export function execute(start, searchFunction, graph) {
  return search(graph, start, searchFunction);
}
