import React, { useState } from 'react';
import { 
  Binary, 
  Layers, 
  ArrowRight, 
  Clock, 
  Cpu, 
  Play, 
  RotateCcw, 
  Search, 
  Code2, 
  CheckCircle2, 
  TrendingUp, 
  Trash2, 
  FileText,
  Table,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { mergeSort, quickSort } from '../dsa/Sorting';
import { linearSearch, binarySearch } from '../dsa/Searching';
import { formatCrore } from '../utils/formatters';

export default function FdsConceptsView({ 
  players, 
  teams, 
  auctionQueue, 
  priorityQueue 
}) {
  const [activeFdsTab, setActiveFdsTab] = useState('queue'); // 'queue' | 'priorityQueue' | 'linkedList' | 'sorting' | 'searching' | 'cheatsheet'

  // Interactive Sorting State
  const [sortAlgo, setSortAlgo] = useState('mergesort');
  const [sortKey, setSortKey] = useState('rating');
  const [sortAscending, setSortAscending] = useState(false);
  const [sortResult, setSortResult] = useState(null);

  // Interactive Searching State
  const [searchTarget, setSearchTarget] = useState('Virat Kohli');
  const [linearResult, setLinearResult] = useState(null);
  const [binaryResult, setBinaryResult] = useState(null);

  // Run Sorting Benchmark
  const handleRunSort = () => {
    if (sortAlgo === 'mergesort') {
      const res = mergeSort(players, sortKey, sortAscending);
      setSortResult(res);
    } else {
      const res = quickSort(players, sortKey, sortAscending);
      setSortResult(res);
    }
  };

  // Run Searching Benchmark (Linear vs Binary)
  const handleRunSearch = () => {
    // 1. Linear Search on unsorted/original
    const lin = linearSearch(players, searchTarget);
    setLinearResult(lin);

    // 2. Binary Search requires alphabetically sorted array by name
    const sortedByName = [...players].sort((a, b) => a.name.localeCompare(b.name));
    const bin = binarySearch(sortedByName, searchTarget);
    setBinaryResult(bin);
  };

  // Active queue array from AuctionQueue
  const queueArray = auctionQueue ? auctionQueue.toArray() : [];

  // Active priority queue heap from BidPriorityQueue
  const heapArray = priorityQueue ? priorityQueue.getHeapArray() : [];

  // Active team squads (Linked Lists)
  const sampleTeam = teams.find(t => t.squad && t.squad.length > 0) || teams[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
            <Binary className="w-4 h-4 text-amber-400" />
            <span>FDS ACADEMIC SPECIFICATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Fundamentals of Data Structures (FDS) Laboratory
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real data structures implemented in code with interactive step tracers and complexity analysis.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: 'queue', label: '1. Linear Queue (FIFO)' },
          { id: 'priorityQueue', label: '2. Priority Queue (Max-Heap)' },
          { id: 'linkedList', label: '3. Singly Linked List' },
          { id: 'sorting', label: '4. MergeSort vs QuickSort' },
          { id: 'searching', label: '5. Linear vs Binary Search' },
          { id: 'cheatsheet', label: '6. Complexity Cheat Sheet' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFdsTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeFdsTab === tab.id
                ? 'bg-amber-400 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: LINEAR QUEUE */}
      {activeFdsTab === 'queue' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#0b1328] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">Linear Queue (FIFO – First-In First-Out)</h3>
                <p className="text-xs text-slate-400">
                  Maintains the precise sequential order in which cricket players appear for bidding on the auction podium.
                </p>
              </div>
              <span className="font-mono text-xs text-amber-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                Size: {queueArray.length} Nodes
              </span>
            </div>

            {/* Visual Queue Pipeline */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold flex items-center space-x-1">
                  <span>← FRONT (Dequeue Next)</span>
                </span>
                <span className="text-sky-400 font-bold flex items-center space-x-1">
                  <span>REAR (Enqueue Entry) ←</span>
                </span>
              </div>

              <div className="flex items-center space-x-3 overflow-x-auto py-3">
                {queueArray.length === 0 ? (
                  <div className="text-xs text-slate-500 py-4 text-center w-full italic">
                    Queue is currently empty. All players dequeued!
                  </div>
                ) : (
                  queueArray.map((p, idx) => (
                    <div 
                      key={p.id}
                      className={`p-3 rounded-xl border shrink-0 text-center w-36 transition-all ${
                        idx === 0 
                          ? 'bg-amber-500/20 border-amber-400 shadow-md ring-2 ring-amber-400/40' 
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold block text-slate-500">
                        {idx === 0 ? 'FRONT [0]' : `[Index ${idx}]`}
                      </span>
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-full mx-auto my-1.5 object-cover" />
                      <span className="text-xs font-bold text-white block truncate">{p.name}</span>
                      <span className="text-[10px] text-amber-400 font-mono">{formatCrore(p.basePrice)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Operations & Complexity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <strong className="text-white block font-mono text-sm mb-1">enqueue(player)</strong>
                <span className="text-slate-400 block mb-1">Inserts a cricketer at the rear tail pointer.</span>
                <span className="text-emerald-400 font-mono font-bold">O(1) Constant Time</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <strong className="text-white block font-mono text-sm mb-1">dequeue()</strong>
                <span className="text-slate-400 block mb-1">Removes and presents the front cricketer for bidding.</span>
                <span className="text-emerald-400 font-mono font-bold">O(1) Constant Time</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <strong className="text-white block font-mono text-sm mb-1">peek()</strong>
                <span className="text-slate-400 block mb-1">Inspects the upcoming player without removing from queue.</span>
                <span className="text-emerald-400 font-mono font-bold">O(1) Constant Time</span>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="bg-[#070c18] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <span className="text-slate-500">// Source: src/dsa/Queue.js</span>
              <pre className="mt-2 text-[11px] leading-relaxed text-sky-300">
{`export class AuctionQueue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.count = 0;
  }
  enqueue(item) {
    const newNode = new QueueNode(item);
    if (!this.front) { this.front = newNode; this.rear = newNode; }
    else { this.rear.next = newNode; this.rear = newNode; }
    this.count++;
  }
  dequeue() {
    if (!this.front) return null;
    const removed = this.front.data;
    this.front = this.front.next;
    this.count--;
    return removed;
  }
}`}
              </pre>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: PRIORITY QUEUE (MAX-HEAP) */}
      {activeFdsTab === 'priorityQueue' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#0b1328] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-lg font-black text-white">Priority Queue (Binary Max-Heap)</h3>
              <p className="text-xs text-slate-400">
                Manages real-time bidding offers. The highest monetary bid always stays at index 0 (root of the heap).
              </p>
            </div>

            {/* Visual Binary Heap Tree & Array Representation */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-amber-400 font-bold">Heap Array Representation</span>
                <span className="text-slate-400 text-[11px]">Parent index = floor((i-1)/2) • Children = 2i+1, 2i+2</span>
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto py-2">
                {heapArray.length === 0 ? (
                  <div className="text-xs text-slate-500 py-4 text-center w-full italic">
                    Heap is empty. Place bids on the Live Auction screen to populate the Max-Heap!
                  </div>
                ) : (
                  heapArray.map((bid, i) => (
                    <div 
                      key={bid.bidId || i}
                      className={`p-3 rounded-xl border shrink-0 text-center w-28 ${
                        i === 0 
                          ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/50' 
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-slate-400 block font-bold">
                        {i === 0 ? 'ROOT [0]' : `Index [${i}]`}
                      </span>
                      <span className="text-xs font-bold text-white block mt-1 truncate">{bid.teamName}</span>
                      <span className="text-sm font-black text-amber-400 font-mono block mt-0.5">{formatCrore(bid.amount)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Operations & Complexity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <strong className="text-white block font-mono text-sm mb-1">insert(bid) / heapifyUp</strong>
                <span className="text-slate-400 block mb-1">Appends bid to end and bubbles up to restore max-heap.</span>
                <span className="text-emerald-400 font-mono font-bold">O(log n) Logarithmic Time</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <strong className="text-white block font-mono text-sm mb-1">extractMax() / heapifyDown</strong>
                <span className="text-slate-400 block mb-1">Removes top bid and sifts root replacement downward.</span>
                <span className="text-emerald-400 font-mono font-bold">O(log n) Logarithmic Time</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <strong className="text-white block font-mono text-sm mb-1">peekMax()</strong>
                <span className="text-slate-400 block mb-1">Accesses current winning bid at index 0 without removal.</span>
                <span className="text-emerald-400 font-mono font-bold">O(1) Instant Lookup</span>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="bg-[#070c18] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <span className="text-slate-500">// Source: src/dsa/PriorityQueue.js</span>
              <pre className="mt-2 text-[11px] leading-relaxed text-sky-300">
{`export class BidPriorityQueue {
  insert(bid) {
    this.heap.push(bid);
    this.heapifyUp(this.heap.length - 1);
  }
  heapifyUp(index) {
    while (index > 0 && this.heap[index].amount > this.heap[this.getParentIndex(index)].amount) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
  }
  peekMax() { return this.heap[0] || null; }
}`}
              </pre>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: SINGLY LINKED LIST */}
      {activeFdsTab === 'linkedList' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#0b1328] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-lg font-black text-white">Singly Linked List (Franchise Squad Rosters)</h3>
              <p className="text-xs text-slate-400">
                Each IPL team maintains its purchased squad via dynamic nodes connected through pointer references.
              </p>
            </div>

            {/* Visual Linked List Chain */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">
                  Active Squad: {sampleTeam.name} ({sampleTeam.squad?.length || 0} Nodes)
                </span>
                <span className="text-slate-400 text-[11px] font-mono">
                  [Node Data | Next →]
                </span>
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto py-3">
                {!sampleTeam.squad || sampleTeam.squad.length === 0 ? (
                  <div className="text-xs text-slate-500 py-4 text-center w-full italic">
                    No players purchased in this squad yet. HEAD points to NULL.
                  </div>
                ) : (
                  sampleTeam.squad.map((player, idx) => (
                    <div key={player.id} className="flex items-center space-x-2 shrink-0">
                      <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-center w-36">
                        <span className="text-[10px] font-mono text-amber-400 font-bold block">
                          {idx === 0 ? 'HEAD NODE' : `Node #${idx + 1}`}
                        </span>
                        <span className="text-xs font-bold text-white block mt-1 truncate">{player.name}</span>
                        <span className="text-[10px] text-slate-400 block">{player.role}</span>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold block mt-1">
                          {formatCrore(player.soldPrice)}
                        </span>
                      </div>

                      {/* Next Pointer Arrow */}
                      <div className="text-slate-500 flex flex-col items-center">
                        <span className="text-[9px] font-mono">next</span>
                        <ArrowRight className="w-5 h-5 text-amber-400" />
                      </div>
                    </div>
                  ))
                )}

                {/* Final NULL terminator */}
                <div className="p-3 bg-slate-900/40 border border-dashed border-slate-800 rounded-xl text-center w-20 shrink-0 text-slate-500 font-mono text-xs">
                  NULL
                </div>
              </div>
            </div>

            {/* Operations & Complexity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <strong className="text-white block font-mono text-sm mb-1">append(player)</strong>
                <span className="text-slate-400 block mb-1">Attaches a newly bought player at the squad tail pointer.</span>
                <span className="text-emerald-400 font-mono font-bold">O(1) with Tail Reference</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <strong className="text-white block font-mono text-sm mb-1">delete(playerId)</strong>
                <span className="text-slate-400 block mb-1">Releases a player by re-pointing previous node to next.</span>
                <span className="text-amber-400 font-mono font-bold">O(n) Node Traversal</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <strong className="text-white block font-mono text-sm mb-1">traverse() / totalSpent()</strong>
                <span className="text-slate-400 block mb-1">Traverses head to tail to sum purse and tally roles.</span>
                <span className="text-amber-400 font-mono font-bold">O(n) Linear Traversal</span>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="bg-[#070c18] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <span className="text-slate-500">// Source: src/dsa/LinkedList.js</span>
              <pre className="mt-2 text-[11px] leading-relaxed text-sky-300">
{`export class SquadLinkedList {
  append(player) {
    const newNode = new SquadNode(player);
    if (!this.head) { this.head = newNode; this.tail = newNode; }
    else { this.tail.next = newNode; this.tail = newNode; }
    this.size++;
  }
  delete(playerId) {
    if (!this.head) return null;
    if (this.head.player.id === playerId) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    let curr = this.head;
    while (curr.next && curr.next.player.id !== playerId) curr = curr.next;
    if (curr.next) { curr.next = curr.next.next; this.size--; return true; }
  }
}`}
              </pre>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: SORTING (MERGESORT VS QUICKSORT) */}
      {activeFdsTab === 'sorting' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#0b1328] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-lg font-black text-white">Sorting Workbench (MergeSort & QuickSort)</h3>
              <p className="text-xs text-slate-400">
                Select an algorithm and attribute to execute genuine sorting and measure comparisons.
              </p>
            </div>

            {/* Interactive Workbench Controls */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Algorithm</label>
                <select
                  value={sortAlgo}
                  onChange={(e) => setSortAlgo(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                >
                  <option value="mergesort">MergeSort (Divide & Conquer)</option>
                  <option value="quicksort">QuickSort (Partitioning)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Sort Key</label>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                >
                  <option value="rating">Player Rating (88-99)</option>
                  <option value="basePrice">Base Price (₹ Cr)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Order</label>
                <select
                  value={sortAscending ? 'asc' : 'desc'}
                  onChange={(e) => setSortAscending(e.target.value === 'asc')}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                >
                  <option value="desc">Descending (High to Low)</option>
                  <option value="asc">Ascending (Low to High)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleRunSort}
                  className="w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute Sort</span>
                </button>
              </div>
            </div>

            {/* Benchmark Results */}
            {sortResult && (
              <div className="bg-slate-900 border border-amber-500/40 rounded-xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <strong className="text-white">{sortResult.algorithm} Finished!</strong>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-300 font-mono">
                    <span>Comparisons: <strong className="text-amber-400">{sortResult.comparisons}</strong></span>
                    <span>Complexity: <strong className="text-sky-400">{sortResult.complexity}</strong></span>
                    <span>Space: <strong className="text-purple-400">{sortResult.spaceComplexity}</strong></span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 overflow-x-auto py-1">
                  {sortResult.sortedArray.slice(0, 8).map((p, idx) => (
                    <div key={p.id} className="bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 text-xs shrink-0 text-center">
                      <span className="text-[10px] text-slate-500 font-mono block">#{idx + 1}</span>
                      <span className="font-bold text-white block">{p.name}</span>
                      <span className="text-amber-400 font-mono text-[11px]">
                        {sortKey === 'rating' ? `★ ${p.rating}` : formatCrore(p.basePrice)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: SEARCHING (LINEAR VS BINARY SEARCH) */}
      {activeFdsTab === 'searching' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#0b1328] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-lg font-black text-white">Searching Duel: Linear Search vs Binary Search</h3>
              <p className="text-xs text-slate-400">
                Compare sequential scanning O(n) against divide-and-conquer binary search O(log n).
              </p>
            </div>

            {/* Input Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchTarget}
                  onChange={(e) => setSearchTarget(e.target.value)}
                  placeholder="Enter exact player name (e.g. Virat Kohli, Pat Cummins, Jasprit Bumrah)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                onClick={handleRunSearch}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shrink-0 active:scale-95 transition-all"
              >
                <Cpu className="w-4 h-4" />
                <span>Run Search Comparison</span>
              </button>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Linear Search Card */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">Linear Search</h4>
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                    Time: O(n)
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Scans every player in the array index by index until match is found.
                </p>

                {linearResult ? (
                  <div className="space-y-2 pt-1 border-t border-slate-800 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Comparisons:</span>
                      <strong className="text-amber-400 font-mono text-sm">{linearResult.comparisons}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Matches Found:</span>
                      <strong className="text-emerald-400 font-bold">{linearResult.matches.length}</strong>
                    </div>
                    <div className="p-2 bg-slate-900 rounded text-[11px] text-slate-300">
                      {linearResult.description}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-600 italic">Click "Run Search Comparison" above.</p>
                )}
              </div>

              {/* Binary Search Card */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">Binary Search</h4>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Time: O(log n)
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Halves the search space at every comparison on sorted names array.
                </p>

                {binaryResult ? (
                  <div className="space-y-2 pt-1 border-t border-slate-800 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Comparisons:</span>
                      <strong className="text-emerald-400 font-mono text-sm">{binaryResult.comparisons}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Found:</span>
                      <strong className="text-white font-bold">{binaryResult.foundPlayer ? 'Yes' : 'No'}</strong>
                    </div>
                    <div className="p-2 bg-slate-900 rounded text-[11px] text-slate-300">
                      {binaryResult.description}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-600 italic">Click "Run Search Comparison" above.</p>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 6: CHEAT SHEET */}
      {activeFdsTab === 'cheatsheet' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#0b1328] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-lg font-black text-white">FDS Mini Project Viva & Complexity Cheat Sheet</h3>
              <p className="text-xs text-slate-400">
                Official reference table of all data structures and algorithms implemented in this IPL Auction Simulator.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-900/90 text-slate-300 font-mono border-b border-slate-800 uppercase text-[11px]">
                  <tr>
                    <th className="p-3">Data Structure / Algorithm</th>
                    <th className="p-3">Application in IPL Auction</th>
                    <th className="p-3">Time (Avg)</th>
                    <th className="p-3">Time (Worst)</th>
                    <th className="p-3">Space Complexity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white font-sans">Array / Vector</td>
                    <td className="p-3 font-sans text-slate-300">Master cricket player catalog & team registries</td>
                    <td className="p-3 text-emerald-400">O(1) Access</td>
                    <td className="p-3 text-amber-400">O(n) Search</td>
                    <td className="p-3 text-sky-400">O(n)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white font-sans">Linear Queue (FIFO)</td>
                    <td className="p-3 font-sans text-slate-300">Orderly sequence of players coming to auction podium</td>
                    <td className="p-3 text-emerald-400">O(1) Enq/Deq</td>
                    <td className="p-3 text-emerald-400">O(1) Enq/Deq</td>
                    <td className="p-3 text-sky-400">O(n)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white font-sans">Priority Queue (Max-Heap)</td>
                    <td className="p-3 font-sans text-slate-300">Tracks live bidding offers; root holds highest bid</td>
                    <td className="p-3 text-emerald-400">O(log n) Insert</td>
                    <td className="p-3 text-emerald-400">O(log n) Extract</td>
                    <td className="p-3 text-sky-400">O(n)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white font-sans">Singly Linked List</td>
                    <td className="p-3 font-sans text-slate-300">Dynamic franchise squad roster management & releases</td>
                    <td className="p-3 text-emerald-400">O(1) Append</td>
                    <td className="p-3 text-amber-400">O(n) Delete/Find</td>
                    <td className="p-3 text-sky-400">O(n)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white font-sans">MergeSort</td>
                    <td className="p-3 font-sans text-slate-300">Stable ranking of players by rating and base price</td>
                    <td className="p-3 text-emerald-400">O(n log n)</td>
                    <td className="p-3 text-emerald-400">O(n log n)</td>
                    <td className="p-3 text-sky-400">O(n)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white font-sans">QuickSort</td>
                    <td className="p-3 font-sans text-slate-300">In-place sorting of player price brackets</td>
                    <td className="p-3 text-emerald-400">O(n log n)</td>
                    <td className="p-3 text-rose-400">O(n²)</td>
                    <td className="p-3 text-sky-400">O(log n)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white font-sans">Binary Search</td>
                    <td className="p-3 font-sans text-slate-300">Logarithmic lookup of players in sorted catalog</td>
                    <td className="p-3 text-emerald-400">O(log n)</td>
                    <td className="p-3 text-emerald-400">O(log n)</td>
                    <td className="p-3 text-sky-400">O(1)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
