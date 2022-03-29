import { describe, expect, it } from '@jest/globals';

import { execute } from './algorithm.js';

describe('Dikstra algorithm', () => {
  it('should able to find node with shortest path', () => {
    expect(
      execute('book', 'piano', {
        bassGuitar: {
          neighbors: [{ nodeId: 'piano', weights: 20 }],
        },
        book: {
          neighbors: [
            { nodeId: 'rareLp', weights: 5 },
            { nodeId: 'poster', weights: 0 },
          ],
        },
        drumSet: {
          neighbors: [{ nodeId: 'piano', weights: 10 }],
        },
        piano: {
          neighbors: [],
        },
        poster: {
          neighbors: [
            { nodeId: 'drumSet', weights: 35 },
            { nodeId: 'bassGuitar', weights: 30 },
          ],
        },
        rareLp: {
          neighbors: [
            { nodeId: 'drumSet', weights: 20 },
            { nodeId: 'bassGuitar', weights: 15 },
          ],
        },
      }),
    ).toStrictEqual({
      cost: 35,
      parents: ['book', 'rareLp', 'drumSet'],
    });
  });
});
