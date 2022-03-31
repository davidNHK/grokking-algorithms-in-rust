import { describe, expect, it } from '@jest/globals';

import { COMPARE, execute } from './algorithm.js';

function compare(target) {
  return val => {
    if (val === target) {
      return COMPARE.EQUAL;
    } else if (val > target) {
      return COMPARE.GREATER_THAN;
    }
    return COMPARE.LESS_THAN;
  };
}

describe('Binary search', () => {
  it.each([[800], [4192], [500], [689], [10]])(
    'should return the index of the %s',
    target => {
      const array = Array.from({ length: 8192 }, (_, i) => i);
      const result = execute(array, compare(target));
      expect(result).toBe(target);
    },
  );

  it.each([
    [null],
    [undefined],
    [Number.POSITIVE_INFINITY],
    [-1],
    [Number.NEGATIVE_INFINITY],
  ])('should return the null of the %s coz not found', target => {
    const array = Array.from({ length: 8192 }, (_, i) => i);
    const result = execute(array, compare(target));
    expect(result).toBe(null);
  });
});
