/**
 * Fundamentals of Data Structures (FDS)
 * Data Structure 1: Linear Queue (FIFO - First In, First Out)
 * 
 * Used in IPL Auction to maintain the sequence of players waiting to come up for bidding.
 * Ensures fair and orderly progression through the auction draft pool.
 */

export class QueueNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class AuctionQueue {
  constructor(initialItems = []) {
    this.front = null;
    this.rear = null;
    this.count = 0;

    if (Array.isArray(initialItems)) {
      initialItems.forEach(item => this.enqueue(item));
    }
  }

  /**
   * Enqueue: Adds a player to the end (rear) of the queue.
   * Time Complexity: O(1)
   */
  enqueue(item) {
    const newNode = new QueueNode(item);
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.count++;
    return this.count;
  }

  /**
   * Dequeue: Removes and returns the player at the front of the queue.
   * Time Complexity: O(1)
   */
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const removedData = this.front.data;
    this.front = this.front.next;
    if (!this.front) {
      this.rear = null;
    }
    this.count--;
    return removedData;
  }

  /**
   * Peek: Returns the next player at the front without removing them.
   * Time Complexity: O(1)
   */
  peek() {
    return this.front ? this.front.data : null;
  }

  /**
   * Returns true if queue has no elements.
   * Time Complexity: O(1)
   */
  isEmpty() {
    return this.count === 0;
  }

  /**
   * Returns total items in queue.
   * Time Complexity: O(1)
   */
  size() {
    return this.count;
  }

  /**
   * Traverses the queue and returns an Array representation.
   * Useful for UI rendering and inspection.
   * Time Complexity: O(n)
   */
  toArray() {
    const list = [];
    let current = this.front;
    while (current) {
      list.push(current.data);
      current = current.next;
    }
    return list;
  }

  /**
   * Clears the entire queue.
   * Time Complexity: O(1)
   */
  clear() {
    this.front = null;
    this.rear = null;
    this.count = 0;
  }
}
