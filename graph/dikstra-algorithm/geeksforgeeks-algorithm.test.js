// https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1
import { describe, expect, it } from '@jest/globals';

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

function execute(numberOfNodes, graph, startPoint) {
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

describe('Dikstra algorithm', () => {
  it('should able to find node with shortest path', () => {
    expect(
      execute(
        6,
        [
          [
            [5, 10],
            [3, 4],
          ],
          [[4, 4]],
          [[5, 4]],
          [[0, 4]],
          [
            [1, 4],
            [5, 6],
          ],
          [
            [2, 5],
            [0, 10],
          ],
        ],
        1,
      ),
    ).toStrictEqual([20, 0, 15, 24, 4, 10]);
  });
});
