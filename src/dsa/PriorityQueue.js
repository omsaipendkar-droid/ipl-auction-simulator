/**
 * Fundamentals of Data Structures (FDS)
 * Data Structure 2: Priority Queue (Max-Heap)
 * 
 * Used in IPL Auction to manage active bids for a player.
 * The highest bid has the highest priority and always stays at the top (root).
 * Guarantees O(1) instant lookup of the current highest bidder and O(log n) insertions.
 */

export class BidPriorityQueue {
  constructor() {
    this.heap = []; // Stores bid objects: { teamId, teamName, teamCode, teamColor, amount, timestamp, bidId }
  }

  /**
   * Helper: Get parent index in binary heap
   */
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  /**
   * Helper: Get left child index
   */
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }

  /**
   * Helper: Get right child index
   */
  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  /**
   * Swap two elements in the heap
   */
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }

  /**
   * Insert a new bid into the Max-Heap.
   * Bubbles up (heapify up) until max-heap property is restored.
   * Time Complexity: O(log n)
   */
  insert(bid) {
    this.heap.push(bid);
    this.heapifyUp(this.heap.length - 1);
  }

  /**
   * Restores heap property upwards
   */
  heapifyUp(index) {
    let currentIndex = index;
    while (
      currentIndex > 0 &&
      this.heap[currentIndex].amount > this.heap[this.getParentIndex(currentIndex)].amount
    ) {
      const parentIndex = this.getParentIndex(currentIndex);
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  /**
   * Extract the maximum bid (highest price offer)
   * Time Complexity: O(log n)
   */
  extractMax() {
    if (this.isEmpty()) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const maxBid = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return maxBid;
  }

  /**
   * Restores heap property downwards
   */
  heapifyDown(index) {
    let currentIndex = index;
    const length = this.heap.length;

    while (this.getLeftChildIndex(currentIndex) < length) {
      let largestChildIndex = this.getLeftChildIndex(currentIndex);
      const rightChildIndex = this.getRightChildIndex(currentIndex);

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].amount > this.heap[largestChildIndex].amount
      ) {
        largestChildIndex = rightChildIndex;
      }

      if (this.heap[currentIndex].amount < this.heap[largestChildIndex].amount) {
        this.swap(currentIndex, largestChildIndex);
        currentIndex = largestChildIndex;
      } else {
        break;
      }
    }
  }

  /**
   * Peek at the maximum bid without removing it.
   * Time Complexity: O(1)
   */
  peekMax() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  /**
   * Return total number of bids currently in heap
   */
  size() {
    return this.heap.length;
  }

  /**
   * Check if heap is empty
   */
  isEmpty() {
    return this.heap.length === 0;
  }

  /**
   * Clear all bids
   */
  clear() {
    this.heap = [];
  }

  /**
   * Returns a copy of the underlying array for inspection/visualizer
   */
  getHeapArray() {
    return [...this.heap];
  }
}
