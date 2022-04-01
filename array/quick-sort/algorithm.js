export const SORT_ODDER = {
  AFTER: 1,
  BEFORE: -1,
  EQUAL: 0,
};

function quickSort(arr, compareFunction) {
  if (arr.length < 2) {
    return arr;
  }
  if (arr.length === 2) {
    const compareResult = compareFunction(arr[0], arr[1]);
    if (compareResult === SORT_ODDER.AFTER) {
      return [arr[1], arr[0]];
    }
    return arr;
  }
  const pivotIndex = Math.floor(Math.random() * (arr.length - 1));
  const [pivot] = arr.splice(pivotIndex, 1);
  const leftPartition = arr.filter(v => {
    return [SORT_ODDER.AFTER, SORT_ODDER.EQUAL].includes(
      compareFunction(pivot, v),
    );
  });
  const rightPartition = arr.filter(v => {
    return compareFunction(pivot, v) === SORT_ODDER.BEFORE;
  });
  return [].concat(
    quickSort(leftPartition, compareFunction),
    [pivot],
    quickSort(rightPartition, compareFunction),
  );
}

export function execute(arr, compareFunction) {
  return quickSort(arr, compareFunction);
}
