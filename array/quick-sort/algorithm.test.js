import { describe, expect, it } from '@jest/globals';

import { execute, SORT_ORDER } from './algorithm.js';

describe('Quick sort', () => {
  it('should sort the array in asc order', () => {
    const array = Array.from({ length: 8192 }, (_, i) =>
      Math.ceil((i + 1) * Math.random() * 10),
    );
    const sorted = array.slice().sort((a, b) => {
      return a - b;
    });
    const result = execute(array);
    expect(result).toStrictEqual(sorted);
  });

  it('should sort the array in desc order', () => {
    const array = Array.from({ length: 8192 }, (_, i) =>
      Math.ceil((i + 1) * Math.random() * 10),
    );
    const sorted = array.slice().sort((a, b) => {
      return b - a;
    });
    const result = execute(array, SORT_ORDER.DESC);
    expect(result).toStrictEqual(sorted);
  });
});
