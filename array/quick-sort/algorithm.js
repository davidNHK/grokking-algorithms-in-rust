export const SORT_ORDER = Object.freeze({
  ASC: 'asc',
  DESC: 'desc',
});

function quickSort(arr, order) {
  if (arr.length < 2) {
    return arr;
  }
  if (arr.length === 2) {
    if (order === SORT_ORDER.ASC && arr[0] > arr[1]) {
      return [arr[1], arr[0]];
    }
    if (order === SORT_ORDER.DESC && arr[0] < arr[1]) {
      return [arr[1], arr[0]];
    }
    return arr;
  }
  const pivotIndex = Math.floor(Math.random() * (arr.length - 1));
  const [pivot] = arr.splice(pivotIndex, 1);
  const leftPartition = arr.filter(v => {
    return order === SORT_ORDER.ASC ? v <= pivot : v >= pivot;
  });
  const rightPartition = arr.filter(v => {
    return order === SORT_ORDER.ASC ? v > pivot : v < pivot;
  });
  return [].concat(
    execute(leftPartition, order),
    [pivot],
    execute(rightPartition, order),
  );
}

export function execute(arr, order = SORT_ORDER.ASC) {
  return quickSort(arr, order);
}
