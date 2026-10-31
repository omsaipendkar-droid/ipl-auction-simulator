import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Gavel, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  Pause, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Coins, 
  ShieldAlert, 
  Bot,
  UserCheck,
  History,
  Layers,
  ChevronRight
} from 'lucide-react';
import { formatCrore, getRoleBadgeColor } from '../utils/formatters';
import { 
  playBidSound, 
  playSoldGavelSound, 
  playUnsoldBuzzer, 
  playTickSound, 
  playFanfare 
} from '../utils/audio';

export default function LiveAuction({
  currentPlayer,
  upcomingPlayers,
  teams,
  currentHighestBid,
  highestBiddingTeam,
  bidHistory,
  onPlaceBid,
  onMarkSold,
  onMarkUnsold,
  onNextPlayer,
  priorityQueue,
  allPlayersResolved
}) {
  const [selectedIncrement, setSelectedIncrement] = useState(0.25);
  const [timerSeconds, setTimerSeconds] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isAiBidding, setIsAiBidding] = useState(false);
  const [soldCelebration, setSoldCelebration] = useState(null); // { player, team, amount }

  const timerRef = useRef(null);
  const aiIntervalRef = useRef(null);

  // Next bid calculation
  const nextBidAmount = currentHighestBid === 0 
    ? (currentPlayer ? currentPlayer.basePrice : 2.00)
    : Math.round((currentHighestBid + selectedIncrement) * 100) / 100;

  // Countdown Timer Logic
  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      timerRef.current = setTimeout(() => {
        setTimerSeconds(prev => {
          if (prev <= 4 && prev > 1) {
            playTickSound(520);
          } else if (prev === 1) {
            playTickSound(780);
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isTimerRunning && timerSeconds === 0) {
      setIsTimerRunning(false);
      // Auto trigger sold or unsold if timer reaches zero
      if (highestBiddingTeam && currentPlayer) {
        handleSold();
      }
    }

    return () => clearTimeout(timerRef.current);
  }, [isTimerRunning, timerSeconds, highestBiddingTeam, currentPlayer]);

  // Reset timer whenever a new bid is placed
  useEffect(() => {
    if (currentHighestBid > 0) {
      setTimerSeconds(15);
      setIsTimerRunning(true);
    }
  }, [currentHighestBid]);

  // Reset state when current player changes
  useEffect(() => {
    setTimerSeconds(15);
    setIsTimerRunning(false);
    setSoldCelebration(null);
  }, [currentPlayer?.id]);

  // AI Auto-Bidding Logic
  useEffect(() => {
    if (isAiBidding && currentPlayer && !soldCelebration) {
      aiIntervalRef.current = setInterval(() => {
        // Find eligible teams that can afford next bid and are NOT the current highest bidder
        const eligibleTeams = teams.filter(t => {
          if (highestBiddingTeam && t.id === highestBiddingTeam.id) return false;
          const remainingPurse = 120.00 - (t.spent || 0);
          return remainingPurse >= nextBidAmount;
        });

        if (eligibleTeams.length > 0) {
          // Weighted random selection: pick a team that needs this role
          const randomTeam = eligibleTeams[Math.floor(Math.random() * eligibleTeams.length)];
          handleBid(randomTeam);
        } else {
          // No more bids possible
          setIsAiBidding(false);
        }
      }, 2400);
    }

    return () => clearInterval(aiIntervalRef.current);
  }, [isAiBidding, currentPlayer, highestBiddingTeam, nextBidAmount, teams, soldCelebration]);

  const handleBid = (team) => {
    const remainingPurse = 120.00 - (team.spent || 0);
    if (remainingPurse < nextBidAmount) {
      alert(`Cannot bid: ${team.name} only has ${formatCrore(remainingPurse)} remaining.`);
      return;
    }

    playBidSound();
    onPlaceBid(team, nextBidAmount);
    setTimerSeconds(15);
    setIsTimerRunning(true);
  };

  const handleSold = () => {
    if (!currentPlayer) return;
    if (!highestBiddingTeam) {
      alert("No team has placed a bid yet! Please place a bid or mark player as Unsold.");
      return;
    }

    setIsTimerRunning(false);
    setIsAiBidding(false);
    playSoldGavelSound();
    playFanfare();

    // Trigger fireworks / confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f97316', '#38bdf8', '#ffffff']
    });

    setSoldCelebration({
      player: currentPlayer,
      team: highestBiddingTeam,
      amount: currentHighestBid
    });

    onMarkSold(currentPlayer, highestBiddingTeam, currentHighestBid);
  };

  const handleUnsold = () => {
    if (!currentPlayer) return;
    setIsTimerRunning(false);
    setIsAiBidding(false);
    playUnsoldBuzzer();
    onMarkUnsold(currentPlayer);
  };

  // If all players are completed
  if (allPlayersResolved) {
    return (
      <div className="bg-[#0b1328] border border-amber-500/30 rounded-2xl p-12 text-center space-y-6 max-w-2xl mx-auto my-12 shadow-2xl">
        <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center">
          <Gavel className="w-10 h-10 text-amber-400" />
        </div>
        <h2 className="text-3xl font-black text-white">IPL Auction Completed!</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          All 34 players in the FIFO Auction Queue have been resolved. Check the complete franchise squads and financial records in the Auction Results tab.
        </p>
        <button
          onClick={onNextPlayer}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-sm tracking-wider uppercase shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-orange-300"
        >
          View Final Results
        </button>
      </div>
    );
  }

  // If no player is currently active
  if (!currentPlayer) {
    return (
      <div className="bg-[#0b1328] border border-slate-800 rounded-2xl p-12 text-center space-y-6 max-w-xl mx-auto my-12">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-sky-400 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <h3 className="text-2xl font-black text-white">Auction Draft Pool Ready</h3>
        <p className="text-slate-400 text-sm">
          There are {upcomingPlayers.length} players waiting in the FIFO Queue. Click below to bring the next cricketer to the auction podium.
        </p>
        <button
          onClick={onNextPlayer}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-sm tracking-wider uppercase shadow-xl hover:from-amber-300 hover:to-orange-300 flex items-center space-x-2 mx-auto active:scale-95 transition-all"
        >
          <Gavel className="w-4 h-4 fill-current" />
          <span>Call Next Player to Podium</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Status Bar: Auctioneer Control Bar & Timer */}
      <div className="bg-[#0b1328] border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        
        {/* Left: Auction Status Pill */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>LIVE BIDDING</span>
          </div>
          <span className="text-xs text-slate-400">
            Player in draft set • <strong className="text-amber-400">{upcomingPlayers.length}</strong> remaining in queue
          </span>
        </div>

        {/* Center: Live Countdown Clock */}
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-4 py-1.5 rounded-full border transition-all ${
            timerSeconds <= 5 
              ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse' 
              : 'bg-slate-900 border-slate-700 text-white'
          }`}>
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-sm font-bold">
              {timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}s
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              {timerSeconds <= 5 ? 'GOING THRICE!' : timerSeconds <= 10 ? 'GOING TWICE' : 'GOING ONCE'}
            </span>
          </div>

          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
          >
            {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setTimerSeconds(15)}
            title="Reset 15s Timer"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Right: AI Auto-Bidding Toggle */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setIsAiBidding(!isAiBidding)}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isAiBidding 
                ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/30' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Bot className={`w-4 h-4 ${isAiBidding ? 'animate-bounce' : ''}`} />
            <span>AI Auto-Bidding: {isAiBidding ? 'ON' : 'OFF'}</span>
          </button>
        </div>

      </div>

      {/* SOLD Celebration Modal / Banner */}
      {soldCelebration && (
        <div className="bg-gradient-to-r from-emerald-950 via-[#0a1e1b] to-emerald-950 border-2 border-emerald-500/60 rounded-2xl p-6 shadow-2xl animate-bounce-short">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center p-2">
                <img src={soldCelebration.team.logoSvg} alt={soldCelebration.team.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>HAMMER DOWN • SOLD!</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {soldCelebration.player.name} Sold to {soldCelebration.team.name}!
                </h3>
                <p className="text-sm text-emerald-300 font-mono mt-0.5">
                  Winning Bid: <strong className="text-xl text-amber-300">{formatCrore(soldCelebration.amount)}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={onNextPlayer}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2 active:scale-95 shrink-0"
            >
              <span>Bring Next Player</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Left = Player Profile Card, Right = Bidding War Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Player Profile Card */}
        <div className="lg:col-span-5 bg-[#0a1128] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"></div>

          <div className="space-y-4">
            {/* Header: Nationality, Overseas status & Role */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl" title={currentPlayer.country}>{currentPlayer.flag}</span>
                <span className="text-xs font-semibold text-slate-300">{currentPlayer.country}</span>
                {currentPlayer.isOverseas && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Overseas
                  </span>
                )}
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getRoleBadgeColor(currentPlayer.role)}`}>
                {currentPlayer.role}
              </span>
            </div>

            {/* Player Photo with Stadium Lighting effect */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-700/60 shadow-inner group">
              <img
                src={currentPlayer.image}
                alt={currentPlayer.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image link encounters network issues
                  e.target.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-transparent to-transparent"></div>
              
              {/* Rating Stamp in Corner */}
              <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md border border-amber-500/40 px-2.5 py-1 rounded-xl flex items-center space-x-1 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-black text-amber-300">{currentPlayer.rating}</span>
                <span className="text-[10px] text-slate-400">/100</span>
              </div>

              {/* Player Tagline Badge */}
              {currentPlayer.badge && (
                <div className="absolute bottom-3 left-3 bg-amber-500/90 text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-md">
                  {currentPlayer.badge}
                </div>
              )}
            </div>

            {/* Player Name & Styles */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentPlayer.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-400">
                <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  Bat: <strong className="text-slate-200">{currentPlayer.battingStyle}</strong>
                </span>
                <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  Bowl: <strong className="text-slate-200">{currentPlayer.bowlingStyle}</strong>
                </span>
              </div>
            </div>

            {/* Career Stats Grid */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">IPL Matches</span>
                <span className="text-base font-black text-white">{currentPlayer.stats.matches}</span>
              </div>

              {currentPlayer.stats.runs !== undefined && (
                <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Runs / S.R</span>
                  <span className="text-base font-black text-amber-400">{currentPlayer.stats.runs} <span className="text-[10px] font-normal text-slate-400">({currentPlayer.stats.strikeRate})</span></span>
                </div>
              )}

              {currentPlayer.stats.wickets !== undefined && (
                <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Wickets / Econ</span>
                  <span className="text-base font-black text-emerald-400">{currentPlayer.stats.wickets} <span className="text-[10px] font-normal text-slate-400">({currentPlayer.stats.economy})</span></span>
                </div>
              )}

              {currentPlayer.stats.dismissals !== undefined && (
                <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Dismissals</span>
                  <span className="text-base font-black text-sky-400">{currentPlayer.stats.dismissals}</span>
                </div>
              )}
            </div>

            {/* Base Price Banner */}
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                  Auction Base Price
                </span>
                <span className="text-lg font-black text-amber-400 font-mono">
                  {formatCrore(currentPlayer.basePrice)}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 max-w-[140px] text-right">
                Bidding starts at or above base price
              </span>
            </div>
          </div>

          {/* FIFO Queue Peek: Who's on deck next? */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Next In FIFO Queue:</span>
            </span>
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              {upcomingPlayers.slice(0, 3).map((p, idx) => (
                <div key={p.id} className="flex items-center space-x-2 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800 shrink-0 text-xs">
                  <span className="font-mono text-slate-500 text-[10px]">#{idx + 1}</span>
                  <span className="font-semibold text-slate-300">{p.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{formatCrore(p.basePrice)}</span>
                </div>
              ))}
              {upcomingPlayers.length === 0 && (
                <span className="text-xs text-slate-500 italic">This is the final player in the queue.</span>
              )}
            </div>
          </div>

        </div>

        {/* Right Column (7 cols): Live Bidding War Stage */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Bid Hero Card */}
          <div className="bg-gradient-to-br from-[#0c1630] via-[#0f1d40] to-[#0a1226] border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Left: Bid Details */}
              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-400/90 flex items-center justify-center sm:justify-start space-x-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>CURRENT HIGHEST BID</span>
                </span>
                
                <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight drop-shadow-md">
                  {currentHighestBid === 0 ? (
                    <span className="text-slate-400 text-3xl">Opening at {formatCrore(currentPlayer.basePrice)}</span>
                  ) : (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                      {formatCrore(currentHighestBid)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300">
                  {highestBiddingTeam ? (
                    <span className="flex items-center justify-center sm:justify-start space-x-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Held by: <strong className="text-white font-bold">{highestBiddingTeam.name}</strong></span>
                    </span>
                  ) : (
                    <span className="text-slate-400">Waiting for franchise opening bid...</span>
                  )}
                </p>
              </div>

              {/* Right: Leading Franchise Crest */}
              {highestBiddingTeam ? (
                <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-900/80 border border-amber-500/30 shadow-inner">
                  <img 
                    src={highestBiddingTeam.logoSvg} 
                    alt={highestBiddingTeam.name} 
                    className="w-16 h-16 rounded-full drop-shadow-lg"
                  />
                  <span className="mt-1 text-xs font-black text-white font-mono">
                    {highestBiddingTeam.shortName}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    Rem: {formatCrore(120.00 - highestBiddingTeam.spent)}
                  </span>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-600">
                  <Coins className="w-7 h-7" />
                </div>
              )}

            </div>

            {/* Increment Selection Pills */}
            <div className="mt-5 pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400 font-medium">Increment Step:</span>
                {[0.25, 0.50, 1.00].map(inc => (
                  <button
                    key={inc}
                    onClick={() => setSelectedIncrement(inc)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedIncrement === inc
                        ? 'bg-amber-400 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    +₹{inc.toFixed(2)} Cr
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-300 font-medium">
                Next Required Bid: <strong className="text-amber-400 font-mono text-sm">{formatCrore(nextBidAmount)}</strong>
              </div>
            </div>

          </div>

          {/* Franchise Bidding Matrix (All 10 Franchises) */}
          <div className="bg-[#0a1128] border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Place Franchise Bid (+{formatCrore(selectedIncrement)})</span>
              </h3>
              <span className="text-[11px] text-slate-400">All 10 Real IPL Teams</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {teams.map((team) => {
                const remainingPurse = 120.00 - (team.spent || 0);
                const canAfford = remainingPurse >= nextBidAmount;
                const isCurrentLeader = highestBiddingTeam && highestBiddingTeam.id === team.id;

                return (
                  <button
                    key={team.id}
                    disabled={!canAfford || isCurrentLeader || !!soldCelebration}
                    onClick={() => handleBid(team)}
                    className={`group relative p-2.5 rounded-xl border flex flex-col items-center justify-between transition-all text-center ${
                      isCurrentLeader
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                        : canAfford
                        ? 'bg-slate-900/90 border-slate-800 hover:border-amber-400/80 hover:bg-slate-800/90 active:scale-95 text-slate-200'
                        : 'bg-slate-950/60 border-slate-900 text-slate-600 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <img 
                      src={team.logoSvg} 
                      alt={team.name} 
                      className="w-8 h-8 rounded-full mb-1 transition-transform group-hover:scale-110" 
                    />
                    
                    <span className="font-bold text-xs truncate max-w-full">
                      {team.shortName}
                    </span>

                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {formatCrore(remainingPurse)}
                    </span>

                    {isCurrentLeader ? (
                      <span className="mt-1.5 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                        Leading
                      </span>
                    ) : canAfford ? (
                      <span className="mt-1.5 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-sky-500/20 text-sky-300 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                        Bid {formatCrore(nextBidAmount)}
                      </span>
                    ) : (
                      <span className="mt-1.5 text-[9px] text-rose-500 font-bold">
                        Low Purse
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Auctioneer Decisive Gavel Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* Hammer Down: SOLD Button */}
            <button
              onClick={handleSold}
              disabled={!highestBiddingTeam || !!soldCelebration}
              className={`p-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2.5 transition-all shadow-lg ${
                highestBiddingTeam && !soldCelebration
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/25 active:scale-98'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              }`}
            >
              <Gavel className="w-5 h-5 fill-current" />
              <span>HAMMER DOWN • SOLD ({highestBiddingTeam ? highestBiddingTeam.shortName : 'No Bids'})</span>
            </button>

            {/* Pass / UNSOLD Button */}
            <button
              onClick={handleUnsold}
              disabled={!!soldCelebration}
              className="p-4 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-slate-800 hover:border-rose-600/50 font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all active:scale-98"
            >
              <XCircle className="w-5 h-5 text-rose-400" />
              <span>MARK UNSOLD & PASS</span>
            </button>

          </div>

          {/* Live Bid History Log (Shows real-time Priority Queue activity) */}
          <div className="bg-[#0a1128] border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <History className="w-4 h-4 text-sky-400" />
                <span>Live Bidding History ({bidHistory.length} Offers)</span>
              </span>
              <span className="text-[11px] text-slate-500">Managed via Max-Heap Priority Queue</span>
            </div>

            <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
              {bidHistory.length === 0 ? (
                <div className="text-xs text-slate-500 text-center py-4 italic">
                  No bids recorded for {currentPlayer.name} yet. Place the opening bid!
                </div>
              ) : (
                bidHistory.map((b, idx) => (
                  <div 
                    key={b.id || idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono text-[10px] text-slate-500">#{bidHistory.length - idx}</span>
                      <img src={b.teamLogo} alt={b.teamName} className="w-4 h-4 rounded-full" />
                      <span className="font-bold text-white">{b.teamName}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-bold text-amber-400 text-sm">
                        {formatCrore(b.amount)}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {b.timestamp}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
