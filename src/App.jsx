import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LiveAuction from './components/LiveAuction';
import TeamsView from './components/TeamsView';
import PlayersView from './components/PlayersView';
import ResultsView from './components/ResultsView';
import FdsConceptsView from './components/FdsConceptsView';

import { TEAMS_DATA, INITIAL_PURSE_CRORES } from './data/teamsData';
import { INITIAL_PLAYERS } from './data/playersData';
import { AuctionQueue } from './dsa/Queue';
import { BidPriorityQueue } from './dsa/PriorityQueue';
import { SquadLinkedList } from './dsa/LinkedList';
import { isAudioEnabled } from './utils/audio';

const STORAGE_KEY = 'IPL_AUCTION_PRO_V2_STORAGE';

export default function App() {
  // Initialize teams with empty squads and 0 spent
  const getInitialTeams = () => {
    return TEAMS_DATA.map(t => ({
      ...t,
      spent: 0,
      squad: [],
      overseasCount: 0,
      startingPurse: 120.00
    }));
  };

  const [teams, setTeams] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.teams && parsed.teams.length > 0) return parsed.teams;
      }
    } catch (e) {
      console.warn('Failed to load saved teams:', e);
    }
    return getInitialTeams();
  });

  const [players, setPlayers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.players && parsed.players.length > 0) return parsed.players;
      }
    } catch (e) {
      console.warn('Failed to load saved players:', e);
    }
    return INITIAL_PLAYERS.map(p => ({
      ...p,
      status: 'upcoming',
      soldPrice: null,
      soldToTeam: null,
      bidHistory: []
    }));
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('dashboard');
  const [soundOn, setSoundOn] = useState(true);

  // Active Live Auction states
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentHighestBid, setCurrentHighestBid] = useState(0);
  const [highestBiddingTeam, setHighestBiddingTeam] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);

  // Data Structure instances (persistent refs)
  const auctionQueueRef = useRef(null);
  const priorityQueueRef = useRef(null);
  const squadListsMapRef = useRef(new Map());

  // Initialize or re-sync Data Structures
  useEffect(() => {
    // 1. Initialize FIFO AuctionQueue with players having status === 'upcoming'
    const upcoming = players.filter(p => p.status === 'upcoming');
    auctionQueueRef.current = new AuctionQueue(upcoming);

    // 2. Initialize PriorityQueue for bids
    priorityQueueRef.current = new BidPriorityQueue();

    // 3. Initialize SquadLinkedList for each team
    teams.forEach(t => {
      squadListsMapRef.current.set(t.id, new SquadLinkedList(t.squad || []));
    });
  }, []);

  // Save progress in Local Storage
  useEffect(() => {
    try {
      const stateToSave = {
        teams,
        players,
        currentPlayerId: currentPlayer?.id || null
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save to local storage:', e);
    }
  }, [teams, players, currentPlayer]);

  // Derived Stats
  const stats = useMemo(() => {
    const totalPlayers = players.length;
    const soldList = players.filter(p => p.status === 'sold');
    const totalSold = soldList.length;
    const totalUnsold = players.filter(p => p.status === 'unsold').length;
    const totalRemaining = players.filter(p => p.status === 'upcoming').length;

    const totalSpent = teams.reduce((acc, t) => acc + (t.spent || 0), 0);

    // Most expensive player
    let mostExpensive = null;
    let mostExpensiveTeam = null;
    if (soldList.length > 0) {
      const sortedSold = [...soldList].sort((a, b) => (b.soldPrice || 0) - (a.soldPrice || 0));
      mostExpensive = sortedSold[0];
      if (mostExpensive) {
        mostExpensiveTeam = teams.find(t => t.id === mostExpensive.soldToTeam);
      }
    }

    // Highest spending team
    const sortedTeams = [...teams].sort((a, b) => (b.spent || 0) - (a.spent || 0));
    const highestSpendingTeam = sortedTeams[0]?.spent > 0 ? sortedTeams[0] : null;

    // Highest bid ever recorded
    const highestBid = mostExpensive ? mostExpensive.soldPrice : currentHighestBid;

    return {
      totalPlayers,
      totalSold,
      totalUnsold,
      totalRemaining,
      totalSpent: Math.round(totalSpent * 100) / 100,
      highestBid: highestBid || 0,
      mostExpensive,
      mostExpensiveTeam,
      highestSpendingTeam,
      currentPlayer
    };
  }, [players, teams, currentHighestBid, currentPlayer]);

  // Advance to Next Player from FIFO Queue
  const handleNextPlayer = () => {
    if (!auctionQueueRef.current) return;

    const nextP = auctionQueueRef.current.dequeue();

    if (nextP) {
      setCurrentPlayer(nextP);
      setCurrentHighestBid(0);
      setHighestBiddingTeam(null);
      setBidHistory([]);
      if (priorityQueueRef.current) {
        priorityQueueRef.current.clear();
      }

      // Update player status in master array to 'bidding'
      setPlayers(prev => prev.map(p => p.id === nextP.id ? { ...p, status: 'bidding' } : p));
      setActiveTab('live');
    } else {
      setCurrentPlayer(null);
      setActiveTab('results');
    }
  };

  // Place a Bid
  const handlePlaceBid = (team, amount) => {
    const newBid = {
      bidId: `${team.id}-${Date.now()}`,
      teamId: team.id,
      teamName: team.name,
      teamShort: team.shortName,
      teamLogo: team.logoSvg,
      amount: amount,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    // 1. Insert into Priority Queue (Max-Heap)
    if (priorityQueueRef.current) {
      priorityQueueRef.current.insert(newBid);
    }

    // 2. Update React State
    setCurrentHighestBid(amount);
    setHighestBiddingTeam(team);
    setBidHistory(prev => [newBid, ...prev]);
  };

  // Mark Player as SOLD
  const handleMarkSold = (player, winningTeam, soldPrice) => {
    const updatedPlayer = {
      ...player,
      status: 'sold',
      soldPrice: soldPrice,
      soldToTeam: winningTeam.id,
      bidHistory: [...bidHistory]
    };

    // 1. Add to team's SquadLinkedList
    let teamList = squadListsMapRef.current.get(winningTeam.id);
    if (!teamList) {
      teamList = new SquadLinkedList();
      squadListsMapRef.current.set(winningTeam.id, teamList);
    }
    teamList.append(updatedPlayer);

    // 2. Update Teams state (deduct purse, increment count)
    setTeams(prev => prev.map(t => {
      if (t.id === winningTeam.id) {
        const newSpent = Math.round(((t.spent || 0) + soldPrice) * 100) / 100;
        const newSquad = [...(t.squad || []), updatedPlayer];
        const newOverseas = updatedPlayer.isOverseas ? (t.overseasCount || 0) + 1 : (t.overseasCount || 0);
        return {
          ...t,
          spent: newSpent,
          squad: newSquad,
          overseasCount: newOverseas
        };
      }
      return t;
    }));

    // 3. Update Players master array
    setPlayers(prev => prev.map(p => p.id === player.id ? updatedPlayer : p));
  };

  // Mark Player as UNSOLD
  const handleMarkUnsold = (player) => {
    const updatedPlayer = {
      ...player,
      status: 'unsold',
      soldPrice: null,
      soldToTeam: null,
      bidHistory: [...bidHistory]
    };

    setPlayers(prev => prev.map(p => p.id === player.id ? updatedPlayer : p));
    setCurrentPlayer(null);
    setCurrentHighestBid(0);
    setHighestBiddingTeam(null);
    setBidHistory([]);
    if (priorityQueueRef.current) {
      priorityQueueRef.current.clear();
    }
  };

  // Release player from squad (Linked List Deletion)
  const handleReleasePlayer = (teamId, playerId) => {
    const playerToRelease = players.find(p => p.id === playerId);
    if (!playerToRelease) return;

    // 1. Remove from team's SquadLinkedList
    const teamList = squadListsMapRef.current.get(teamId);
    if (teamList) {
      teamList.delete(playerId);
    }

    const refundAmount = playerToRelease.soldPrice || 0;

    // 2. Update Teams state
    setTeams(prev => prev.map(t => {
      if (t.id === teamId) {
        const newSpent = Math.max(0, Math.round(((t.spent || 0) - refundAmount) * 100) / 100);
        const newSquad = (t.squad || []).filter(p => p.id !== playerId);
        const newOverseas = playerToRelease.isOverseas ? Math.max(0, (t.overseasCount || 0) - 1) : t.overseasCount;
        return {
          ...t,
          spent: newSpent,
          squad: newSquad,
          overseasCount: newOverseas
        };
      }
      return t;
    }));

    // 3. Reset player status back to upcoming & re-enqueue into FIFO Queue
    const resetPlayer = {
      ...playerToRelease,
      status: 'upcoming',
      soldPrice: null,
      soldToTeam: null,
      bidHistory: []
    };

    if (auctionQueueRef.current) {
      auctionQueueRef.current.enqueue(resetPlayer);
    }

    setPlayers(prev => prev.map(p => p.id === playerId ? resetPlayer : p));
  };

  // Re-Auction all unsold players into the FIFO Queue
  const handleReAuctionUnsold = () => {
    const unsold = players.filter(p => p.status === 'unsold');
    if (unsold.length === 0) return;

    const updated = players.map(p => {
      if (p.status === 'unsold') {
        const resetP = { ...p, status: 'upcoming', soldPrice: null, soldToTeam: null };
        if (auctionQueueRef.current) {
          auctionQueueRef.current.enqueue(resetP);
        }
        return resetP;
      }
      return p;
    });

    setPlayers(updated);
    setActiveTab('live');
    if (!currentPlayer) {
      handleNextPlayer();
    }
  };

  // Reset Entire Auction
  const handleResetAuction = () => {
    if (confirm("Are you sure you want to RESET the entire auction? All budgets and squad rosters will be restored to default ₹120.00 Cr.")) {
      localStorage.removeItem(STORAGE_KEY);
      
      const freshTeams = getInitialTeams();
      const freshPlayers = INITIAL_PLAYERS.map(p => ({
        ...p,
        status: 'upcoming',
        soldPrice: null,
        soldToTeam: null,
        bidHistory: []
      }));

      setTeams(freshTeams);
      setPlayers(freshPlayers);
      setCurrentPlayer(null);
      setCurrentHighestBid(0);
      setHighestBiddingTeam(null);
      setBidHistory([]);

      // Re-create queue and priority queue
      auctionQueueRef.current = new AuctionQueue(freshPlayers);
      priorityQueueRef.current = new BidPriorityQueue();
      squadListsMapRef.current.clear();
      freshTeams.forEach(t => squadListsMapRef.current.set(t.id, new SquadLinkedList()));

      setActiveTab('dashboard');
    }
  };

  // Start Auction from Dashboard
  const handleStartAuction = () => {
    if (!currentPlayer) {
      handleNextPlayer();
    } else {
      setActiveTab('live');
    }
  };

  const upcomingPlayersList = auctionQueueRef.current ? auctionQueueRef.current.toArray() : [];
  const allResolved = stats.totalRemaining === 0 && !currentPlayer;

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Navigation Bar */}
      <Navbar
        stats={stats}
        onResetAuction={handleResetAuction}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        onOpenFdsModal={() => setActiveTab('fds')}
      />

      {/* Main Layout: Sidebar + Active View Content */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          liveAuctionHasPlayer={!!currentPlayer}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              stats={stats}
              teams={teams}
              players={players}
              onStartAuction={handleStartAuction}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'live' && (
            <LiveAuction
              currentPlayer={currentPlayer}
              upcomingPlayers={upcomingPlayersList}
              teams={teams}
              currentHighestBid={currentHighestBid}
              highestBiddingTeam={highestBiddingTeam}
              bidHistory={bidHistory}
              onPlaceBid={handlePlaceBid}
              onMarkSold={handleMarkSold}
              onMarkUnsold={handleMarkUnsold}
              onNextPlayer={handleNextPlayer}
              priorityQueue={priorityQueueRef.current}
              allPlayersResolved={allResolved}
            />
          )}

          {activeTab === 'teams' && (
            <TeamsView
              teams={teams}
              onReleasePlayer={handleReleasePlayer}
            />
          )}

          {activeTab === 'players' && (
            <PlayersView
              players={players}
              teams={teams}
              onInspectFds={() => setActiveTab('fds')}
            />
          )}

          {activeTab === 'results' && (
            <ResultsView
              stats={stats}
              teams={teams}
              players={players}
              onReAuctionUnsold={handleReAuctionUnsold}
              onResetAuction={handleResetAuction}
            />
          )}

          {activeTab === 'fds' && (
            <FdsConceptsView
              players={players}
              teams={teams}
              auctionQueue={auctionQueueRef.current}
              priorityQueue={priorityQueueRef.current}
            />
          )}
        </main>

      </div>

      {/* Professional Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070b19] px-6 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 font-medium">
            <span className="text-amber-400 font-bold">IPL AUCTION PRO</span>
            <span>•</span>
            <span>Where Strategy Meets Cricket – Bid, Build and Conquer!</span>
            <span>•</span>
            <span className="text-sky-400 font-semibold">Second-Year Engineering FDS Mini Project</span>
          </div>
          <p className="text-[11px] text-slate-600">
            Implemented using <strong>Queue (FIFO)</strong>, <strong>Priority Queue (Max-Heap)</strong>, <strong>Singly Linked List</strong>, <strong>MergeSort</strong>, <strong>QuickSort</strong>, and <strong>Binary Search</strong>.
          </p>
          <p className="text-[10px] text-slate-600">
            Built with React.js, Tailwind CSS, Local Storage, Web Audio API and Lucide Icons. Fictional base prices and ratings used for educational simulation.
          </p>
        </div>
      </footer>

    </div>
  );
}
