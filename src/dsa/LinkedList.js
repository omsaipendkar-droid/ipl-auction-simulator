/**
 * Fundamentals of Data Structures (FDS)
 * Data Structure 3: Singly Linked List
 * 
 * Used in IPL Auction to maintain each franchise's squad roster.
 * Each node represents a purchased cricket player and links to the next player.
 * Supports dynamic memory allocation, O(1) addition to squad, and O(n) node deletion/search.
 */

export class SquadNode {
  constructor(player) {
    this.player = player; // Player object including id, name, role, soldPrice, etc.
    this.next = null;
  }
}

export class SquadLinkedList {
  constructor(initialPlayers = []) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    if (Array.isArray(initialPlayers)) {
      initialPlayers.forEach(p => this.append(p));
    }
  }

  /**
   * Append: Adds a purchased player to the end of the squad linked list.
   * Time Complexity: O(1) with tail pointer
   */
  append(player) {
    const newNode = new SquadNode(player);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    return this.size;
  }

  /**
   * Prepend: Adds a player at the beginning (head) of the squad.
   * Time Complexity: O(1)
   */
  prepend(player) {
    const newNode = new SquadNode(player);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
    return this.size;
  }

  /**
   * Delete: Removes a player from squad by their ID.
   * Time Complexity: O(n)
   */
  delete(playerId) {
    if (!this.head) return null;

    // If head node is the one to delete
    if (this.head.player.id === playerId) {
      const removedPlayer = this.head.player;
      this.head = this.head.next;
      this.size--;
      if (!this.head) {
        this.tail = null;
      }
      return removedPlayer;
    }

    // Traverse to find the node prior to the target node
    let current = this.head;
    while (current.next && current.next.player.id !== playerId) {
      current = current.next;
    }

    if (current.next) {
      const removedPlayer = current.next.player;
      current.next = current.next.next;
      if (!current.next) {
        this.tail = current;
      }
      this.size--;
      return removedPlayer;
    }

    return null; // Not found
  }

  /**
   * Find: Searches for a player in the linked list by ID.
   * Time Complexity: O(n)
   */
  find(playerId) {
    let current = this.head;
    while (current) {
      if (current.player.id === playerId) {
        return current.player;
      }
      current = current.next;
    }
    return null;
  }

  /**
   * Traverses list and returns an array of player objects.
   * Time Complexity: O(n)
   */
  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.player);
      current = current.next;
    }
    return result;
  }

  /**
   * Calculates total purse spent by summing node soldPrices.
   * Time Complexity: O(n)
   */
  calculateTotalSpent() {
    let total = 0;
    let current = this.head;
    while (current) {
      total += current.player.soldPrice || 0;
      current = current.next;
    }
    return Math.round(total * 100) / 100;
  }

  /**
   * Counts overseas players in the squad.
   * Time Complexity: O(n)
   */
  getOverseasCount() {
    let count = 0;
    let current = this.head;
    while (current) {
      if (current.player.isOverseas) {
        count++;
      }
      current = current.next;
    }
    return count;
  }

  /**
   * Returns count of players categorized by role.
   */
  getRoleCounts() {
    const roles = {
      Batsman: 0,
      Bowler: 0,
      'All-Rounder': 0,
      Wicketkeeper: 0
    };
    let current = this.head;
    while (current) {
      const r = current.player.role;
      if (roles[r] !== undefined) {
        roles[r]++;
      }
      current = current.next;
    }
    return roles;
  }

  /**
   * Clear all nodes in squad.
   */
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}
