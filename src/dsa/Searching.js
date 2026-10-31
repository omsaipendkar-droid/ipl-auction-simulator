/**
 * Fundamentals of Data Structures (FDS)
 * Algorithm Group 2: Searching Algorithms (Linear Search & Binary Search)
 * 
 * Used in IPL Auction to quickly look up players by name or attributes.
 * Generates an execution trace to visually demonstrate comparison counts and search space halving.
 */

/**
 * Linear Search Implementation
 * Sequential scanning from index 0 to n-1.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function linearSearch(array, searchTerm) {
  const query = searchTerm.trim().toLowerCase();
  let comparisons = 0;
  const trace = [];
  const matches = [];

  for (let i = 0; i < array.length; i++) {
    comparisons++;
    const player = array[i];
    const nameLower = player.name.toLowerCase();
    const isMatch = nameLower.includes(query);

    trace.push({
      step: i + 1,
      index: i,
      playerName: player.name,
      checkedValue: player.name,
      matched: isMatch
    });

    if (isMatch) {
      matches.push(player);
    }
  }

  return {
    matches,
    comparisons,
    trace,
    algorithm: 'Linear Search',
    complexity: 'O(n)',
    description: 'Scanned through all elements sequentially.'
  };
}

/**
 * Binary Search Implementation (Requires sorted array by name)
 * Repeatedly divides the search interval in half.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function binarySearch(sortedArray, targetName) {
  const query = targetName.trim().toLowerCase();
  let low = 0;
  let high = sortedArray.length - 1;
  let comparisons = 0;
  const trace = [];
  let foundPlayer = null;

  while (low <= high) {
    comparisons++;
    const mid = Math.floor((low + high) / 2);
    const midPlayer = sortedArray[mid];
    const midName = midPlayer.name.toLowerCase();

    trace.push({
      step: trace.length + 1,
      low,
      high,
      mid,
      playerName: midPlayer.name,
      target: query
    });

    if (midName === query) {
      foundPlayer = midPlayer;
      break;
    } else if (midName < query) {
      // Target is in upper half
      low = mid + 1;
    } else {
      // Target is in lower half
      high = mid - 1;
    }
  }

  return {
    foundPlayer,
    comparisons,
    trace,
    algorithm: 'Binary Search',
    complexity: 'O(log n)',
    description: foundPlayer
      ? `Found "${foundPlayer.name}" in ${comparisons} comparison(s).`
      : `Player not found after ${comparisons} comparison(s).`
  };
}
