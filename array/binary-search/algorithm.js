export const COMPARE = {
  EQUAL: 0,
  GREATER_THAN: 1,
  LESS_THAN: -1,
};

export function execute(arr, compareFunction) {
  const arrLength = arr.length;
  let [low, high] = [0, arrLength - 1];
  while (low <= high) {
    const guessIndex = Math.floor((low + high) / 2);
    const compareResult = compareFunction(arr[guessIndex]);
    if (compareResult === COMPARE.EQUAL) {
      return guessIndex;
    } else if (compareResult === COMPARE.GREATER_THAN) {
      high = guessIndex - 1;
    } else {
      low = guessIndex + 1;
    }
  }
  return null;
}
