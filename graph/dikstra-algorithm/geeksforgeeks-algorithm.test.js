import { describe, expect, it } from '@jest/globals';

import { execute } from './geeksforgeeks-algorithm.js';

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
