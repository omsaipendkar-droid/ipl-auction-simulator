import React from 'react';
import { 
  Trophy, 
  Users, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Coins, 
  Flame, 
  Play, 
  ArrowRight,
  ShieldCheck,
  Star,
  Zap,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { formatCrore, getRoleBadgeColor } from '../utils/formatters';

export default function Dashboard({ 
  stats, 
  teams, 
  players, 
  onStartAuction, 
  onNavigate 
}) {
  const isAuctionStarted = stats.totalSold > 0 || stats.totalUnsold > 0 || stats.currentPlayer;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Banner with Animated Start Auction Button */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0c142d] via-[#141b38] to-[#0d1730] border border-amber-500/20 p-6 sm:p-8 shadow-2xl">
        {/* Subtle decorative stadium grid lights */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>OFFICIAL IPL SIMULATION STAGE</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              IPL Mega Auction <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">Simulator</span>
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Experience the adrenaline-pumping IPL bidding war where 10 elite franchises compete for 34 world-class cricketers. Built as a second-year <strong>Fundamentals of Data Structures (FDS)</strong> mini project.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center space-x-1.5 bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Starting Purse: ₹120.00 Cr / team</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span>Real 10 IPL Franchises</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>FDS Data Structures Active</span>
              </span>
            </div>
          </div>

          {/* Large Action Button */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={onStartAuction}
              className="relative group px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-black text-base sm:text-lg tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 hover:from-amber-300 hover:to-orange-300 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95 transition-all transform hover:-translate-y-0.5 flex items-center space-x-3"
            >
              <div className="w-9 h-9 rounded-full bg-slate-950/20 flex items-center justify-center">
                <Play className="w-5 h-5 text-slate-950 fill-current" />
              </div>
              <span>{isAuctionStarted ? 'CONTINUE LIVE AUCTION' : 'START MEGA AUCTION'}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-[11px] text-slate-400 font-medium">
              {stats.totalRemaining} players waiting in the Auction Queue
            </p>
          </div>
        </div>
      </div>

      {/* 8 Essential Dashboard Metrics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <span>Auction Performance Overview</span>
          </h3>
          <span className="text-xs text-slate-400">Live synchronized metrics</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Teams */}
          <div className="bg-[#0b1328] border border-slate-800/80 rounded-xl p-4.5 hover:border-sky-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total IPL Teams</span>
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white">{teams.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">₹1,200.00 Cr Combined Budget</p>
          </div>

          {/* Total Players */}
          <div className="bg-[#0b1328] border border-slate-800/80 rounded-xl p-4.5 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Pool</span>
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white">{players.length} Players</div>
            <p className="text-[11px] text-slate-400 mt-1">17 Indian + 17 Overseas Stars</p>
          </div>

          {/* Players Sold */}
          <div className="bg-[#0b1328] border border-slate-800/80 rounded-xl p-4.5 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Players Sold</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-emerald-400">{stats.totalSold}</div>
            <p className="text-[11px] text-slate-400 mt-1">{((stats.totalSold / players.length) * 100).toFixed(0)}% of auction pool resolved</p>
          </div>

          {/* Unsold Players */}
          <div className="bg-[#0b1328] border border-slate-800/80 rounded-xl p-4.5 hover:border-rose-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Unsold Players</span>
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                <XCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-rose-400">{stats.totalUnsold}</div>
            <p className="text-[11px] text-slate-400 mt-1">Available for re-auctioning</p>
          </div>

          {/* Total Auction Spending */}
          <div className="bg-[#0b1328] border border-slate-800/80 rounded-xl p-4.5 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Money Spent</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Coins className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-amber-400">{formatCrore(stats.totalSpent)}</div>
            <p className="text-[11px] text-slate-400 mt-1">Out of ₹1,200 Cr total budget</p>
          </div>

          {/* Current Highest Bid */}
          <div className="bg-[#0b1328] border border-slate-800/80 rounded-xl p-4.5 hover:border-orange-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Current Highest Bid</span>
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-orange-400">{formatCrore(stats.highestBid)}</div>
            <p className="text-[11px] text-slate-400 mt-1">Peak bid offer recorded</p>
          </div>

          {/* Most Expensive Player */}
          <div className="bg-[#0b1328] border border-slate-800/80 rounded-xl p-4.5 hover:border-yellow-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Most Expensive Player</span>
              <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400">
                <Star className="w-4 h-4" />
              </div>
            </div>
            <div className="text-lg font-black text-white truncate">
              {stats.mostExpensive ? stats.mostExpensive.name : 'Awaiting Sales'}
            </div>
            <p className="text-[11px] text-amber-400 font-semibold mt-1">
              {stats.mostExpensive ? `${formatCrore(stats.mostExpensive.soldPrice)} (${stats.mostExpensiveTeam?.shortName || ''})` : 'No sales yet'}
            </p>
          </div>

          {/* Highest Spending Team */}
          <div className="bg-[#0b1328] border border-slate-800/80 rounded-xl p-4.5 hover:border-purple-500/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Highest Spender</span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Trophy className="w-4 h-4" />
              </div>
            </div>
            <div className="text-lg font-black text-white truncate">
              {stats.highestSpendingTeam ? stats.highestSpendingTeam.name : 'Even Start'}
            </div>
            <p className="text-[11px] text-purple-400 font-semibold mt-1">
              {stats.highestSpendingTeam ? `${formatCrore(stats.highestSpendingTeam.spent)} Spent` : '₹120.00 Cr each'}
            </p>
          </div>

        </div>
      </div>

      {/* Two Column Section: Franchise Purse Status & Quick Role Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left (2 cols): Franchise Purse Leaderboard */}
        <div className="lg:col-span-2 bg-[#0a1024] border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Coins className="w-5 h-5 text-amber-400" />
                <span>Franchise Purse Tracker (₹120.00 Cr Budget)</span>
              </h3>
              <p className="text-xs text-slate-400">Real-time expenditure and remaining balances</p>
            </div>
            <button
              onClick={() => onNavigate('teams')}
              className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center space-x-1"
            >
              <span>View All Squads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {teams.map((team) => {
              const spent = team.spent || 0;
              const remaining = 120.00 - spent;
              const spentPercent = Math.min(100, (spent / 120.00) * 100);

              return (
                <div key={team.id} className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-3 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center space-x-2.5">
                      <img src={team.logoSvg} alt={team.name} className="w-6 h-6 rounded-full" />
                      <span className="font-bold text-white">{team.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {team.shortName}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-slate-400">
                        Squad: <strong className="text-white">{team.squad?.length || 0}</strong> ({team.overseasCount || 0} OS)
                      </span>
                      <span className="text-slate-400">
                        Remaining: <strong className="text-emerald-400 font-mono">{formatCrore(remaining)}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden flex">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                      style={{ width: `${spentPercent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (1 col): Fast Actions & FDS Highlights */}
        <div className="space-y-6">
          
          {/* Quick Launch Card */}
          <div className="bg-gradient-to-br from-[#121c38] to-[#0d152c] border border-amber-500/30 rounded-2xl p-6 text-center space-y-4 shadow-lg">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Zap className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg font-black text-white">Live Bidding Stage</h4>
              <p className="text-xs text-slate-300 mt-1">
                Enter the auction hall, place incremental bids for all 10 franchises, or trigger AI counter-bidding.
              </p>
            </div>
            <button
              onClick={onStartAuction}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm tracking-wider uppercase transition-all shadow-md active:scale-95"
            >
              Enter Auction Hall
            </button>
          </div>

          {/* FDS Core Architecture Card */}
          <div className="bg-[#0b1328] border border-indigo-900/50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center space-x-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>FDS Implementation</span>
              </h4>
              <button
                onClick={() => onNavigate('fds')}
                className="text-[11px] font-bold text-amber-400 hover:underline"
              >
                Open Visualizer
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-300 font-medium">1. FIFO Queue</span>
                <span className="font-mono text-amber-400 text-[11px] font-bold">Draft Pool</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-300 font-medium">2. Max-Heap / Priority Q</span>
                <span className="font-mono text-sky-400 text-[11px] font-bold">Live Bidding</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-300 font-medium">3. Singly Linked List</span>
                <span className="font-mono text-emerald-400 text-[11px] font-bold">Team Squads</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-300 font-medium">4. MergeSort & QuickSort</span>
                <span className="font-mono text-purple-400 text-[11px] font-bold">Rating/Price</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-300 font-medium">5. Binary & Linear Search</span>
                <span className="font-mono text-rose-400 text-[11px] font-bold">Player Lookup</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
