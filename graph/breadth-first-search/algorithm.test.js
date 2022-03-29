import { describe, expect, it } from '@jest/globals';

import { execute } from './algorithm.js';

describe('BFS', () => {
  it('should able to find node when target node in deeper level', () => {
    expect(
      execute('you', nodeId => nodeId === 'jonny', {
        alice: {
          neighbors: ['peggy'],
        },
        anuj: {
          neighbors: [],
        },
        bob: {
          neighbors: ['peggy', 'anuj'],
        },
        claire: {
          neighbors: ['jonny', 'thom'],
        },
        jonny: {
          neighbors: [],
        },
        peggy: {
          neighbors: [],
        },
        thom: {
          neighbors: [],
        },
        you: {
          neighbors: ['bob', 'alice', 'claire'],
        },
      }),
    ).toStrictEqual({
      node: {
        neighbors: [],
      },
      nodeId: 'jonny',
      parent: ['you', 'claire'],
    });
  });
  it('should able to find node when target node in middle', () => {
    expect(
      execute('you', nodeId => nodeId === 'peggy', {
        alice: {
          neighbors: ['peggy'],
        },
        anuj: {
          neighbors: [],
        },
        bob: {
          neighbors: ['peggy', 'anuj'],
        },
        claire: {
          neighbors: ['jonny', 'thom'],
        },
        jonny: {
          neighbors: [],
        },
        peggy: {
          neighbors: [],
        },
        thom: {
          neighbors: [],
        },
        you: {
          neighbors: ['bob', 'alice', 'claire'],
        },
      }),
    ).toStrictEqual({
      node: {
        neighbors: [],
      },
      nodeId: 'peggy',
      parent: ['you', 'bob'],
    });
  });
});
