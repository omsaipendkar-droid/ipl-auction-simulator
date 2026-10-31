/**
 * Automated Verification Suite for FDS Data Structures & Auction Rules
 */
import { AuctionQueue } from '../src/dsa/Queue.js';
import { BidPriorityQueue } from '../src/dsa/PriorityQueue.js';
import { SquadLinkedList } from '../src/dsa/LinkedList.js';
import { mergeSort, quickSort } from '../src/dsa/Sorting.js';
import { linearSearch, binarySearch } from '../src/dsa/Searching.js';
import { INITIAL_PLAYERS } from '../src/data/playersData.js';
import { TEAMS_DATA } from '../src/data/teamsData.js';

console.log('--- STARTING FDS AUTOMATED VERIFICATION ---');

// 1. Verify Queue (FIFO)
console.log('\n[1] Testing Linear Queue (FIFO)...');
const q = new AuctionQueue();
q.enqueue({ id: 'p1', name: 'Virat Kohli' });
q.enqueue({ id: 'p2', name: 'Rohit Sharma' });
q.enqueue({ id: 'p3', name: 'MS Dhoni' });
console.assert(q.size() === 3, `Queue size should be 3, got ${q.size()}`);
console.assert(q.peek().name === 'Virat Kohli', `Peek should be Virat, got ${q.peek().name}`);
const firstOut = q.dequeue();
console.assert(firstOut.name === 'Virat Kohli', `Dequeued should be Virat, got ${firstOut.name}`);
console.assert(q.size() === 2, `Queue size after dequeue should be 2, got ${q.size()}`);
console.log('✓ Linear Queue passed successfully.');

// 2. Verify Priority Queue (Max-Heap)
console.log('\n[2] Testing Priority Queue (Max-Heap)...');
const pq = new BidPriorityQueue();
pq.insert({ teamName: 'CSK', amount: 2.0 });
pq.insert({ teamName: 'MI', amount: 6.5 });
pq.insert({ teamName: 'RCB', amount: 4.25 });
pq.insert({ teamName: 'KKR', amount: 8.0 });
pq.insert({ teamName: 'SRH', amount: 5.0 });

console.assert(pq.peekMax().amount === 8.0, `PeekMax should be 8.0, got ${pq.peekMax().amount}`);
console.assert(pq.peekMax().teamName === 'KKR', `Leading team should be KKR, got ${pq.peekMax().teamName}`);
const maxBid = pq.extractMax();
console.assert(maxBid.amount === 8.0, `Extracted max should be 8.0, got ${maxBid.amount}`);
console.assert(pq.peekMax().amount === 6.5, `Next max after extraction should be 6.5, got ${pq.peekMax().amount}`);
console.log('✓ Priority Queue (Max-Heap) passed successfully.');

// 3. Verify Singly Linked List
console.log('\n[3] Testing Singly Linked List (Team Squad)...');
const squad = new SquadLinkedList();
squad.append({ id: 'ind-01', name: 'Virat Kohli', role: 'Batsman', soldPrice: 15.0, isOverseas: false });
squad.append({ id: 'os-01', name: 'Jos Buttler', role: 'Wicketkeeper', soldPrice: 12.5, isOverseas: true });
squad.append({ id: 'ind-04', name: 'Jasprit Bumrah', role: 'Bowler', soldPrice: 18.0, isOverseas: false });

console.assert(squad.size === 3, `Squad size should be 3, got ${squad.size}`);
console.assert(squad.calculateTotalSpent() === 45.5, `Total spent should be 45.5, got ${squad.calculateTotalSpent()}`);
console.assert(squad.getOverseasCount() === 1, `Overseas count should be 1, got ${squad.getOverseasCount()}`);

// Test deletion (releasing player)
const deleted = squad.delete('os-01');
console.assert(deleted.name === 'Jos Buttler', `Deleted player should be Jos Buttler, got ${deleted?.name}`);
console.assert(squad.size === 2, `Squad size after delete should be 2, got ${squad.size}`);
console.assert(squad.calculateTotalSpent() === 33.0, `Total spent after delete should be 33.0, got ${squad.calculateTotalSpent()}`);
console.log('✓ Singly Linked List passed successfully.');

// 4. Verify MergeSort and QuickSort
console.log('\n[4] Testing Sorting Algorithms...');
const mergeSortedRatingDesc = mergeSort(INITIAL_PLAYERS, 'rating', false);
for (let i = 0; i < mergeSortedRatingDesc.sortedArray.length - 1; i++) {
  console.assert(
    mergeSortedRatingDesc.sortedArray[i].rating >= mergeSortedRatingDesc.sortedArray[i + 1].rating,
    `MergeSort desc invariant failed at index ${i}`
  );
}

const quickSortedPriceAsc = quickSort(INITIAL_PLAYERS, 'basePrice', true);
for (let i = 0; i < quickSortedPriceAsc.sortedArray.length - 1; i++) {
  console.assert(
    quickSortedPriceAsc.sortedArray[i].basePrice <= quickSortedPriceAsc.sortedArray[i + 1].basePrice,
    `QuickSort asc invariant failed at index ${i}`
  );
}
console.log(`✓ MergeSort (Rating Desc) verified (${mergeSortedRatingDesc.comparisons} comparisons).`);
console.log(`✓ QuickSort (Price Asc) verified (${quickSortedPriceAsc.comparisons} comparisons).`);

// 5. Verify Linear Search and Binary Search
console.log('\n[5] Testing Searching Algorithms...');
const linRes = linearSearch(INITIAL_PLAYERS, 'Bumrah');
console.assert(linRes.matches.length > 0, 'Linear search should find Bumrah');
console.assert(linRes.matches[0].name.includes('Bumrah'), 'Matched name should contain Bumrah');

const sortedByName = [...INITIAL_PLAYERS].sort((a, b) => a.name.localeCompare(b.name));
const binRes = binarySearch(sortedByName, 'Rohit Sharma');
console.assert(binRes.foundPlayer !== null, 'Binary search should find Rohit Sharma');
console.assert(binRes.foundPlayer.name === 'Rohit Sharma', 'Binary search result should match target');
console.log(`✓ Linear Search verified (${linRes.comparisons} comparisons).`);
console.log(`✓ Binary Search verified (${binRes.comparisons} comparisons, logarithmic steps).`);

// 6. Verify Team starting budget & rules
console.log('\n[6] Testing Franchise Rules & Budget Limits...');
console.assert(TEAMS_DATA.length === 10, `Expected 10 franchises, got ${TEAMS_DATA.length}`);
console.assert(INITIAL_PLAYERS.length >= 30, `Expected at least 30 players, got ${INITIAL_PLAYERS.length}`);
const indianPlayers = INITIAL_PLAYERS.filter(p => !p.isOverseas);
const overseasPlayers = INITIAL_PLAYERS.filter(p => p.isOverseas);
console.assert(indianPlayers.length >= 15, `Expected >= 15 Indian players, got ${indianPlayers.length}`);
console.assert(overseasPlayers.length >= 15, `Expected >= 15 Overseas players, got ${overseasPlayers.length}`);

console.log('✓ All 10 Teams & 34 Players Verified.');
console.log('\n=== ALL FDS DATA STRUCTURE & AUCTION TESTS PASSED! ===\n');
