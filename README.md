# IPL AUCTION PRO – Cricket Player Auction Simulator
> *"Where Strategy Meets Cricket – Bid, Build and Conquer!"*
> 
> **Second-Year Engineering FDS (Fundamentals of Data Structures) Mini Project**

A comprehensive, fully functional, visually attractive and interactive web application simulating the high-stakes Indian Premier League (IPL) mega auction. Built specifically to demonstrate genuine Fundamentals of Data Structures (FDS) concepts in a real-world sports bidding environment.

---

## 🌟 Key Highlights & Features

### 1. Modern Sports Broadcast UI & Theme
* **Dark Navy & Black Stadium Arena**: High-contrast, stadium lighting atmosphere.
* **Gold, Orange & Electric Blue Highlights**: Premium sports television dashboard aesthetics.
* **Web Audio API Sound Engine**: Zero external audio files required! Synthesized auctioneer gavel hammer strikes, crisp bidding sound chimes, 15-second countdown warning ticks, unsold buzzers, and triumphant fanfare.
* **Canvas Confetti Visual Celebrations**: Multi-colored celebratory particle explosions upon every confirmed "HAMMER DOWN: SOLD".
* **Fully Responsive**: Optimized for laptop monitors, tablets, and mobile devices.

### 2. 10 Official IPL Franchises
* **Mumbai Indians (MI)** (5x Champions)
* **Chennai Super Kings (CSK)** (5x Champions)
* **Royal Challengers Bengaluru (RCB)**
* **Kolkata Knight Riders (KKR)** (3x Champions)
* **Sunrisers Hyderabad (SRH)** (1x Champions)
* **Rajasthan Royals (RR)** (1x Champions)
* **Delhi Capitals (DC)**
* **Punjab Kings (PBKS)**
* **Gujarat Titans (GT)** (1x Champions)
* **Lucknow Super Giants (LSG)**

Each franchise is equipped with:
* High-res stylized franchise logo crest.
* Starting purse of **₹120.00 Crore** (educational simulation budget).
* Real-time budget tracking (spent vs remaining purse).
* Squad breakdown by role (Batsmen, Bowlers, All-rounders, Wicketkeepers).
* Foreign player tally (Overseas vs Indian ratio).

### 3. 34 Real World-Class Cricket Players
* **17 Indian Stars**: Virat Kohli, Rohit Sharma, MS Dhoni, Jasprit Bumrah, Hardik Pandya, Suryakumar Yadav, Shubman Gill, Rishabh Pant, KL Rahul, Ravindra Jadeja, Sanju Samson, Yashasvi Jaiswal, Ruturaj Gaikwad, Mohammed Siraj, Kuldeep Yadav, Rinku Singh, Arshdeep Singh.
* **17 Overseas Stars**: Jos Buttler, Travis Head, David Warner, Pat Cummins, Mitchell Starc, Glenn Maxwell, Andre Russell, Sunil Narine, Rashid Khan, Nicholas Pooran, Heinrich Klaasen, Kagiso Rabada, Phil Salt, Faf du Plessis, Liam Livingstone, Trent Boult, Quinton de Kock.
* Each card includes: Cricket action photo, Country flag emoji, Playing role badge, Batting style, Bowling style, Career IPL stats, Base price (₹0.50 Cr - ₹2.00 Cr), and Player rating (88-99).

### 4. Interactive Live Auction System
* **Countdown Clock & Warning**: 15-second ticker with *"Going Once... Going Twice... Going Thrice!"* tension indicators.
* **Priority Queue Live Podium**: Glowing display of current highest bid and leading franchise.
* **Bid Increment Buttons**: Instant +₹0.25 Cr, +₹0.50 Cr, or +₹1.00 Cr raises.
* **All 10 Team Bid Pads**: One-click franchise bidding with automated budget checks (prevents overbidding/negative budgets).
* **AI Auto-Bidding Mode**: Autonomous competing franchise bidding algorithm simulates electrifying television auction battles.
* **Auctioneer Gavel Controls**:
  * `HAMMER DOWN • SOLD`: Deducts purse, inserts player into winning franchise's Singly Linked List, updates stats, triggers confetti and gavel strike sound.
  * `MARK UNSOLD & PASS`: Records player as unsold, sounds stadium buzzer, and advances to next player.
  * `CALL NEXT PLAYER`: Dequeues the next player from the FIFO Auction Queue.
* **Upcoming Queue Preview**: Real-time strip showing cricketers on deck next.

### 5. Final Results & Report Export
* **Awards Podium**: Most Expensive Player of the Auction, Biggest Spender Franchise, and Total Draft Balance.
* **Downloadable Reports**:
  * Export structured **CSV Spreadsheet** with all player prices, statuses, and teams.
  * Export comprehensive **Text Report (`.txt`)** with complete team-wise squads and budget analysis.
* **Unsold Player Recovery**: Option to re-enqueue unsold players into the draft queue for second-round bidding.
* **Reset Auction**: Full reset restoring all ₹120.00 Cr purses and resetting local storage.

---

## 🔬 Fundamentals of Data Structures (FDS) Implementation

| Data Structure / Algorithm | Application in IPL Auction | Time Complexity | File Path |
| :--- | :--- | :--- | :--- |
| **Linear Queue (FIFO)** | Orderly sequence of players appearing for auction (Enqueue, Dequeue, Peek) | $O(1)$ Enqueue / Dequeue | `src/dsa/Queue.js` |
| **Priority Queue (Max-Heap)** | Real-time bidding offers; root index 0 always holds the highest bid | $O(\log n)$ Insert / Extract | `src/dsa/PriorityQueue.js` |
| **Singly Linked List** | Dynamic franchise squad rosters; supports node insertion, traversal, and release | $O(1)$ Append, $O(n)$ Delete | `src/dsa/LinkedList.js` |
| **MergeSort** | Divide-and-conquer stable ranking of players by rating (High to Low / Low to High) | $O(n \log n)$ All Cases | `src/dsa/Sorting.js` |
| **QuickSort** | In-place partition-based sorting of players by auction base price brackets | $O(n \log n)$ Avg, $O(n^2)$ Worst | `src/dsa/Sorting.js` |
| **Linear Search** | Sequential player lookup scanning from index 0 to $n-1$ | $O(n)$ Linear | `src/dsa/Searching.js` |
| **Binary Search** | Logarithmic lookup on alphabetically sorted player names | $O(\log n)$ Halving intervals | `src/dsa/Searching.js` |

> 💡 **Dedicated FDS Concepts Section in UI**: An interactive laboratory tab where users can inspect the active FIFO queue nodes, view the binary heap array, see linked list pointer chains, run sorting comparisons, and duel Linear Search vs Binary Search with live comparison counters!

---

## 🛠️ Technology Stack

* **Frontend Framework**: React.js 19
* **Build Tool**: Vite 8
* **Styling**: Tailwind CSS v4 (with custom sports gradients, animations, and glow utilities)
* **Icons**: Lucide React
* **Sound Synthesizer**: Web Audio API (Hardware audio synthesis without external MP3 files)
* **Celebrations**: Canvas Confetti
* **Persistence**: Browser Local Storage (auto-saves after every bid and sale)

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18.0.0 or later)
* npm (v9.0.0 or later)

### Installation
1. Clone or navigate to the project directory:
   ```bash
   cd ipl-auction-simulator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Run automated FDS test verification:
   ```bash
   node test/fds-verification.test.js
   ```

---

## 📂 Project Structure

```
ipl-auction-simulator/
├── index.html                   # HTML entry point with Plus Jakarta Sans & sports title
├── package.json                 # Project dependencies & build scripts
├── vite.config.js               # Vite 8 + Tailwind CSS plugin configuration
├── test/
│   └── fds-verification.test.js # Automated unit tests for Queue, Heap, Linked List, Sort, Search
├── src/
│   ├── main.jsx                 # React root renderer
│   ├── App.jsx                  # Root state coordinator with Local Storage sync
│   ├── index.css                # Tailwind CSS v4 imports & custom sports glow utilities
│   ├── data/
│   │   ├── teamsData.js         # 10 Official IPL Franchises (MI, CSK, RCB, KKR, SRH, RR, DC, PBKS, GT, LSG)
│   │   └── playersData.js       # 34 Real Cricket Stars (17 Indian + 17 Overseas)
│   ├── dsa/
│   │   ├── Queue.js             # FIFO Linear Queue (Draft order)
│   │   ├── PriorityQueue.js     # Max-Heap Priority Queue (Bidding engine)
│   │   ├── LinkedList.js        # Singly Linked List (Team squad rosters)
│   │   ├── Sorting.js           # MergeSort & QuickSort algorithms
│   │   └── Searching.js         # Linear Search & Binary Search algorithms with trace
│   ├── utils/
│   │   ├── audio.js             # Web Audio API sound synthesizer (gavel, tick, bid, fanfare)
│   │   ├── formatters.js        # Crore formatting (₹X.XX Cr) & role badge colors
│   │   └── exportReport.js      # CSV and text report generation & download
│   └── components/
│       ├── Navbar.jsx           # Top navigation with live stats ticker & sound toggle
│       ├── Sidebar.jsx          # Sidebar menu with tab links & FDS mini-project badge
│       ├── Dashboard.jsx        # 8 key statistics, purse leaderboard, animated Start Auction
│       ├── LiveAuction.jsx      # Flagship auction screen: podium, countdown, 10 team pads, AI bidding
│       ├── TeamsView.jsx        # Grid of all 10 IPL franchises with purse meters
│       ├── TeamDetailModal.jsx  # Squad viewer with role filters and Linked List release
│       ├── PlayersView.jsx      # Player catalogue with FDS search & sorting filters
│       ├── ResultsView.jsx      # Final Hall of Fame, CSV/TXT export & unsold recovery
│       └── FdsConceptsView.jsx  # Interactive FDS lab with live visualizations & viva cheat sheet
```

---

## 🏆 Academic Declaration

* **Project Title**: IPL AUCTION PRO – Cricket Player Auction Simulator
* **Subtitle**: *"Where Strategy Meets Cricket – Bid, Build and Conquer!"*
* **Course**: Fundamentals of Data Structures (FDS) Mini Project
* **Level**: Second-Year Computer Engineering / IT
* **License**: MIT
