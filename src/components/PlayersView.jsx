import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Layers, 
  ShieldCheck,
  Binary
} from 'lucide-react';
import { formatCrore, getRoleBadgeColor } from '../utils/formatters';
import { mergeSort, quickSort } from '../dsa/Sorting';
import { linearSearch } from '../dsa/Searching';

export default function PlayersView({ players, teams, onInspectFds }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [nationalityFilter, setNationalityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('rating-desc'); // 'rating-desc' | 'rating-asc' | 'price-desc' | 'price-asc' | 'name-asc'
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Sorting & Searching using FDS algorithms!
  const { processedPlayers, fdsMetrics } = useMemo(() => {
    let result = [...players];
    let comparisons = 0;
    let algorithmUsed = 'Direct Filtering';

    // 1. Search using Linear Search Algorithm from FDS
    if (searchTerm.trim().length > 0) {
      const searchRes = linearSearch(result, searchTerm);
      result = searchRes.matches;
      comparisons += searchRes.comparisons;
      algorithmUsed = `Linear Search (O(n), ${searchRes.comparisons} comparisons)`;
    }

    // 2. Filter by Role
    if (roleFilter !== 'All') {
      result = result.filter(p => p.role === roleFilter);
    }

    // 3. Filter by Nationality
    if (nationalityFilter === 'Indian') {
      result = result.filter(p => !p.isOverseas);
    } else if (nationalityFilter === 'Overseas') {
      result = result.filter(p => p.isOverseas);
    }

    // 4. Filter by Auction Status
    if (statusFilter !== 'All') {
      result = result.filter(p => p.status === statusFilter);
    }

    // 5. Explicit FDS Sorting with MergeSort / QuickSort
    if (sortBy === 'rating-desc') {
      const sortRes = mergeSort(result, 'rating', false);
      result = sortRes.sortedArray;
      comparisons += sortRes.comparisons;
      algorithmUsed += (algorithmUsed ? ' + ' : '') + `MergeSort by Rating (${sortRes.comparisons} comparisons)`;
    } else if (sortBy === 'rating-asc') {
      const sortRes = mergeSort(result, 'rating', true);
      result = sortRes.sortedArray;
      comparisons += sortRes.comparisons;
      algorithmUsed += (algorithmUsed ? ' + ' : '') + `MergeSort by Rating (${sortRes.comparisons} comparisons)`;
    } else if (sortBy === 'price-desc') {
      const sortRes = quickSort(result, 'basePrice', false);
      result = sortRes.sortedArray;
      comparisons += sortRes.comparisons;
      algorithmUsed += (algorithmUsed ? ' + ' : '') + `QuickSort by Price (${sortRes.comparisons} comparisons)`;
    } else if (sortBy === 'price-asc') {
      const sortRes = quickSort(result, 'basePrice', true);
      result = sortRes.sortedArray;
      comparisons += sortRes.comparisons;
      algorithmUsed += (algorithmUsed ? ' + ' : '') + `QuickSort by Price (${sortRes.comparisons} comparisons)`;
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return {
      processedPlayers: result,
      fdsMetrics: { comparisons, algorithmUsed }
    };
  }, [players, searchTerm, roleFilter, nationalityFilter, statusFilter, sortBy]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <Users className="w-7 h-7 text-indigo-400" />
            <span>Cricket Players Catalogue ({players.length})</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real international and Indian cricket stars with fictional auction parameters.
          </p>
        </div>

        {/* FDS Algorithm Indicator Badge */}
        <div className="flex items-center space-x-2 bg-indigo-950/60 border border-indigo-800/60 px-3 py-1.5 rounded-xl text-xs text-indigo-300">
          <Binary className="w-4 h-4 text-amber-400" />
          <span className="truncate max-w-xs">{fdsMetrics.algorithmUsed}</span>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-[#0b1328] border border-slate-800 rounded-2xl p-4 space-y-3.5">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search players by name (e.g. Virat, Bumrah, Buttler, Rashid)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          
          {/* Playing Role */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Roles</option>
              <option value="Batsman">Batsmen</option>
              <option value="Bowler">Bowlers</option>
              <option value="All-Rounder">All-Rounders</option>
              <option value="Wicketkeeper">Wicketkeepers</option>
            </select>
          </div>

          {/* Nationality */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Nationality
            </label>
            <select
              value={nationalityFilter}
              onChange={(e) => setNationalityFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Players</option>
              <option value="Indian">Indian Players (17)</option>
              <option value="Overseas">Overseas Players (17)</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Auction Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Statuses</option>
              <option value="sold">Sold</option>
              <option value="unsold">Unsold</option>
              <option value="upcoming">Upcoming (Queue)</option>
            </select>
          </div>

          {/* Sort By (FDS algorithms) */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              FDS Sorting Order
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="rating-desc">Rating: Highest First (MergeSort)</option>
              <option value="rating-asc">Rating: Lowest First (MergeSort)</option>
              <option value="price-desc">Base Price: Highest First (QuickSort)</option>
              <option value="price-asc">Base Price: Lowest First (QuickSort)</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>

        </div>

      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {processedPlayers.map((player) => {
          const winningTeam = teams.find(t => t.id === player.soldToTeam);

          return (
            <div
              key={player.id}
              onClick={() => setSelectedPlayer(player)}
              className="bg-[#0b1328] border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg transition-all hover:-translate-y-1 group flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Photo & Overlay */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1328] via-transparent to-transparent"></div>

                  {/* Status Ribbon */}
                  <div className="absolute top-2.5 left-2.5">
                    {player.status === 'sold' ? (
                      <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/90 text-slate-950 shadow-md">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Sold ({winningTeam ? winningTeam.shortName : ''})</span>
                      </span>
                    ) : player.status === 'unsold' ? (
                      <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/90 text-white shadow-md">
                        <XCircle className="w-3 h-3" />
                        <span>Unsold</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-500/80 text-slate-950 shadow-md">
                        <Clock className="w-3 h-3" />
                        <span>In Queue</span>
                      </span>
                    )}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-amber-500/40 text-[11px] font-black text-amber-400">
                    ★ {player.rating}
                  </div>
                </div>

                {/* Player Card Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center space-x-1">
                      <span>{player.flag}</span>
                      <span>{player.country}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRoleBadgeColor(player.role)}`}>
                      {player.role}
                    </span>
                  </div>

                  <h3 className="font-black text-white text-base truncate group-hover:text-amber-400 transition-colors">
                    {player.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-400">Base Price:</span>
                    <span className="font-mono font-bold text-white">{formatCrore(player.basePrice)}</span>
                  </div>

                  {player.status === 'sold' && player.soldPrice && (
                    <div className="flex items-center justify-between text-xs pt-0.5 text-emerald-400">
                      <span className="font-semibold">Sold At:</span>
                      <span className="font-mono font-black">{formatCrore(player.soldPrice)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
                <span>{player.battingStyle.split(' ')[0]} Bat</span>
                <span className="text-amber-400 font-semibold text-[10px]">View Details →</span>
              </div>
            </div>
          );
        })}
      </div>

      {processedPlayers.length === 0 && (
        <div className="bg-[#0b1328] border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <p className="text-base font-bold text-white mb-1">No players match the chosen filters</p>
          <p className="text-xs">Try resetting your search query or role/nationality filter.</p>
        </div>
      )}

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0b1328] border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={selectedPlayer.image} 
                  alt={selectedPlayer.name} 
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-600" 
                />
                <div>
                  <h3 className="text-xl font-black text-white">{selectedPlayer.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center space-x-1.5 mt-0.5">
                    <span>{selectedPlayer.flag}</span>
                    <span>{selectedPlayer.country}</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold">Rating {selectedPlayer.rating}/100</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlayer(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Playing Role:</span>
                <strong className="text-white">{selectedPlayer.role}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Batting Style:</span>
                <strong className="text-white">{selectedPlayer.battingStyle}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Bowling Style:</span>
                <strong className="text-white">{selectedPlayer.bowlingStyle}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Base Price:</span>
                <strong className="text-amber-400 font-mono">{formatCrore(selectedPlayer.basePrice)}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Current Status:</span>
                <strong className="uppercase font-bold text-sky-400">{selectedPlayer.status}</strong>
              </div>
            </div>

            {selectedPlayer.status === 'sold' && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs flex justify-between items-center text-emerald-300">
                <span>Sold to {teams.find(t => t.id === selectedPlayer.soldToTeam)?.name || 'Franchise'}</span>
                <strong className="text-sm font-mono font-black">{formatCrore(selectedPlayer.soldPrice)}</strong>
              </div>
            )}

            <button
              onClick={() => setSelectedPlayer(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
