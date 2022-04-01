import { describe, expect, it } from '@jest/globals';

import { execute, SORT_ODDER } from './algorithm.js';

describe('Quick sort', () => {
  function compareNumbersASC(a, b) {
    if (a > b) {
      return SORT_ODDER.AFTER;
    }
    if (a < b) {
      return SORT_ODDER.BEFORE;
    }
    return SORT_ODDER.EQUAL;
  }

  function compareNumbersDESC(a, b) {
    if (a < b) {
      return SORT_ODDER.AFTER;
    }
    if (a > b) {
      return SORT_ODDER.BEFORE;
    }
    return SORT_ODDER.EQUAL;
  }

  function compareStringASC(a, b) {
    const localeCompareResult = a.localeCompare(b);
    if (localeCompareResult > 0) {
      return SORT_ODDER.AFTER;
    }
    if (localeCompareResult < 0) {
      return SORT_ODDER.BEFORE;
    }
    return SORT_ODDER.EQUAL;
  }

  function compareStringDESC(a, b) {
    const localeCompareResult = a.localeCompare(b);
    if (localeCompareResult < 0) {
      return SORT_ODDER.AFTER;
    }
    if (localeCompareResult > 0) {
      return SORT_ODDER.BEFORE;
    }
    return SORT_ODDER.EQUAL;
  }

  it('should sort number array in asc order', () => {
    const array = Array.from({ length: 8192 }, (_, i) =>
      Math.ceil((i + 1) * Math.random() * 10),
    );
    const sorted = array.slice().sort((a, b) => {
      return a - b;
    });
    const result = execute(array, compareNumbersASC);
    expect(result).toStrictEqual(sorted);
  });

  it('should sort number array in desc order', () => {
    const array = Array.from({ length: 8192 }, (_, i) =>
      Math.ceil((i + 1) * Math.random() * 10),
    );
    const sorted = array.slice().sort((a, b) => {
      return b - a;
    });
    const result = execute(array, compareNumbersDESC);
    expect(result).toStrictEqual(sorted);
  });

  it('should sort string array in asc order', () => {
    const array = [
      'monkey',
      'zebra',
      'cat',
      'dog',
      'elephant',
      'giraffe',
      'bear',
      'lion',
    ];
    const sorted = array.slice().sort((a, b) => {
      return a.localeCompare(b);
    });
    const result = execute(array, compareStringASC);
    expect(result).toStrictEqual(sorted);
  });

  it('should sort string array in desc order', () => {
    const array = [
      'monkey',
      'zebra',
      'cat',
      'dog',
      'elephant',
      'giraffe',
      'bear',
      'lion',
    ];
    const sorted = array.slice().sort((a, b) => {
      return a.localeCompare(b) * -1;
    });
    const result = execute(array, compareStringDESC);
    expect(result).toStrictEqual(sorted);
  });
});
