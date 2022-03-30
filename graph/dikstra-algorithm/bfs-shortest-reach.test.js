// https://www.hackerrank.com/challenges/ctci-bfs-shortest-reach/problem
import { describe, expect, it } from '@jest/globals';
import { promises as fs } from 'fs';
import { parse } from 'path';

const currentDir = parse(new URL(import.meta.url).pathname).dir;

function computeCostMap({ costStore, current, graph, processed }) {
  const currentCost = costStore.get(current);

  graph[current].forEach(neighbor => {
    const existingCost = costStore.get(neighbor);
    const newCost = currentCost + 6;
    if (newCost < existingCost) costStore.set(neighbor, newCost);
  });
  processed.push(current);
  let nextProcessNode = null;
  let nextProcessNodeCost = Number.POSITIVE_INFINITY;
  Array.from(costStore).forEach(([nodeId, cost]) => {
    if (cost >= nextProcessNodeCost || processed.includes(nodeId)) return;
    nextProcessNode = nodeId;
    nextProcessNodeCost = cost;
  });
  if (nextProcessNode !== null)
    return computeCostMap({
      costStore: costStore,
      current: nextProcessNode,
      graph: graph,
      processed: processed,
    });
  return Array.from(costStore)
    .map(([, cost]) => (cost === Number.POSITIVE_INFINITY ? -1 : cost))
    .filter(cost => cost !== 0);
}

function algorithm(graph) {
  const costStore = new Map(
    Array.from({ length: graph.node }).map((_, index) => [
      index + 1,
      Number.POSITIVE_INFINITY,
    ]),
  );
  costStore.set(graph.start, 0);
  return computeCostMap({
    costStore: costStore,
    current: graph.start,
    graph: graph.graph,
    processed: [],
  });
}

function convertInput(input) {
  const [, ...rest] = input.split('\n');
  let buffer = [];
  const quires = [];
  for (const line of rest) {
    if (line === '') continue;
    const [, v2] = line.split(' ');
    buffer.push(line);
    if (!v2) {
      quires.push(buffer.join('\n'));
      buffer = [];
    }
  }
  const graphs = quires.map(query => {
    const [nodeInfos, ...edges] = query.split('\n');
    const [numberOfNodes] = nodeInfos
      .split(' ')
      .map(data => parseInt(data, 10));
    const start = parseInt(edges.pop(), 10);
    const graph = Object.fromEntries(
      Array.from({ length: numberOfNodes }).map((__, nodeIndex) => [
        nodeIndex + 1,
        [],
      ]),
    );
    edges.forEach(edge => {
      const [current, connected] = edge
        .split(' ')
        .map(data => parseInt(data, 10));
      graph[current].push(connected);
      graph[connected].push(current);
    });
    return { graph, node: numberOfNodes, start };
  });
  return graphs;
}

describe('test', () => {
  it('convert large input correctly', async () => {
    const input = await fs.readFile(
      `${currentDir}/__fixture__/sample.txt`,
      'utf-8',
    );
    const graphs = convertInput(input);
    expect(graphs).toHaveLength(4);
  }, 60000);
  it('convert input correctly', () => {
    expect(
      convertInput(`2
4 2
1 2
1 3
1
3 1
2 3
2`),
    ).toStrictEqual([
      {
        graph: {
          1: [2, 3],
          2: [1],
          3: [1],
          4: [],
        },
        node: 4,
        start: 1,
      },
      {
        graph: {
          1: [],
          2: [3],
          3: [2],
        },
        node: 3,
        start: 2,
      },
    ]);
  });
  it('compute result correctly', () => {
    const graphs = convertInput(`2
4 2
1 2
1 3
1
3 1
2 3
2`);

    expect(algorithm(graphs[0])).toEqual([6, 6, -1]);
    expect(algorithm(graphs[1])).toEqual([-1, 6]);
  });

  it('compute result correctly 2', () => {
    const graphs = convertInput(`1
6 4
1 2
2 3
3 4
1 5
1`);

    expect(algorithm(graphs[0])).toEqual([6, 12, 18, 6, -1]);
  });
});
