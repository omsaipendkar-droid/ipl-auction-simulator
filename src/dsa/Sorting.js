/**
 * Fundamentals of Data Structures (FDS)
 * Algorithm Group 1: Sorting Algorithms (MergeSort & QuickSort)
 * 
 * Used in IPL Auction to rank and organize players by:
 * - Base Price (Ascending/Descending)
 * - Player Rating (Ascending/Descending)
 * - Sold Price (Ascending/Descending)
 * 
 * Tracks comparison count and operational steps for FDS demonstration.
 */

/**
 * MergeSort Implementation (Divide and Conquer)
 * Time Complexity: O(n log n) in all cases (Best, Average, Worst)
 * Space Complexity: O(n)
 * Stable: Yes
 */
export function mergeSort(array, key = 'rating', ascending = false) {
  let comparisons = 0;

  function merge(left, right) {
    const result = [];
    let lIdx = 0;
    let rIdx = 0;

    while (lIdx < left.length && rIdx < right.length) {
      comparisons++;
      let shouldTakeLeft;
      if (ascending) {
        shouldTakeLeft = left[lIdx][key] <= right[rIdx][key];
      } else {
        shouldTakeLeft = left[lIdx][key] >= right[rIdx][key];
      }

      if (shouldTakeLeft) {
        result.push(left[lIdx]);
        lIdx++;
      } else {
        result.push(right[rIdx]);
        rIdx++;
      }
    }

    return result.concat(left.slice(lIdx)).concat(right.slice(rIdx));
  }

  function sort(items) {
    if (items.length <= 1) return items;
    const mid = Math.floor(items.length / 2);
    const left = sort(items.slice(0, mid));
    const right = sort(items.slice(mid));
    return merge(left, right);
  }

  const sortedArray = sort([...array]);
  return {
    sortedArray,
    comparisons,
    algorithm: 'Merge Sort',
    complexity: 'O(n log n)',
    spaceComplexity: 'O(n)'
  };
}

/**
 * QuickSort Implementation (Partitioning)
 * Time Complexity: O(n log n) average, O(n^2) worst case
 * Space Complexity: O(log n) call stack
 */
export function quickSort(array, key = 'rating', ascending = false) {
  let comparisons = 0;
  let swaps = 0;
  const arr = [...array];

  function swap(i, j) {
    swaps++;
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function partition(low, high) {
    const pivot = arr[high][key];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      let condition = ascending ? arr[j][key] < pivot : arr[j][key] > pivot;
      if (condition) {
        i++;
        swap(i, j);
      }
    }
    swap(i + 1, high);
    return i + 1;
  }

  function sort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  }

  sort(0, arr.length - 1);
  return {
    sortedArray: arr,
    comparisons,
    swaps,
    algorithm: 'Quick Sort',
    complexity: 'O(n log n) avg, O(n²) worst',
    spaceComplexity: 'O(log n)'
  };
}
