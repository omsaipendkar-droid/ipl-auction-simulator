import React, { useState } from 'react';
import { 
  X, 
  Trophy, 
  MapPin, 
  Coins, 
  Users, 
  Globe2, 
  Trash2, 
  Filter, 
  Layers, 
  Star,
  Sparkles
} from 'lucide-react';
import { formatCrore, getRoleBadgeColor } from '../utils/formatters';

export default function TeamDetailModal({ team, onClose, onReleasePlayer }) {
  const [roleFilter, setRoleFilter] = useState('All');

  if (!team) return null;

  const spent = team.spent || 0;
  const remaining = 120.00 - spent;
  const squad = team.squad || [];

  const filteredSquad = squad.filter(player => {
    if (roleFilter === 'All') return true;
    return player.role === roleFilter;
  });

  const rolesCount = {
    Batsman: squad.filter(p => p.role === 'Batsman').length,
    Bowler: squad.filter(p => p.role === 'Bowler').length,
    'All-Rounder': squad.filter(p => p.role === 'All-Rounder').length,
    Wicketkeeper: squad.filter(p => p.role === 'Wicketkeeper').length,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0b1328] border border-slate-700 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div 
          className="p-6 border-b border-slate-800 flex items-start justify-between relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${team.primaryColor}33, #0b1328 80%)` }}
        >
          <div className="flex items-center space-x-4 z-10">
            <img 
              src={team.logoSvg} 
              alt={team.name} 
              className="w-16 h-16 rounded-full drop-shadow-xl border-2 border-white/20 p-1 bg-slate-900/60"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-black text-white">{team.name}</h3>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-800 text-amber-400">
                  {team.shortName}
                </span>
              </div>
              <p className="text-xs text-slate-300 flex items-center space-x-2 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{team.homeGround}</span>
                <span>•</span>
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>{team.trophies}x IPL Champion</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors z-10 border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Financial & Squad Summary Bar */}
        <div className="bg-slate-900/80 border-b border-slate-800 p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Remaining Purse</span>
            <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">
              {formatCrore(remaining)}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Spent</span>
            <span className="text-base sm:text-lg font-black text-amber-400 font-mono">
              {formatCrore(spent)}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Squad Size</span>
            <span className="text-base sm:text-lg font-black text-white">
              {squad.length} Players
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Overseas / Indian</span>
            <span className="text-base sm:text-lg font-black text-sky-400">
              {team.overseasCount || 0} OS / {squad.length - (team.overseasCount || 0)} IND
            </span>
          </div>
        </div>

        {/* FDS Linked List Node Visualization Banner */}
        <div className="bg-[#090f20] px-6 py-2.5 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-indigo-400 font-medium">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>FDS Structure: <strong>SquadLinkedList</strong></span>
          </div>
          <span className="text-slate-400 text-[11px] font-mono">
            head: {squad[0]?.name || 'null'} → size: {squad.length} nodes
          </span>
        </div>

        {/* Role Filter Tabs */}
        <div className="p-4 border-b border-slate-800 flex items-center space-x-2 overflow-x-auto">
          {['All', 'Batsman', 'Bowler', 'All-Rounder', 'Wicketkeeper'].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                roleFilter === role
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {role} {role !== 'All' ? `(${rolesCount[role] || 0})` : `(${squad.length})`}
            </button>
          ))}
        </div>

        {/* Squad Player List (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {filteredSquad.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Users className="w-12 h-12 mx-auto text-slate-700 mb-2" />
              <p className="text-sm">No players matching the selected role in this squad.</p>
              <p className="text-xs text-slate-600 mt-1">Bid in Live Auction to recruit players!</p>
            </div>
          ) : (
            filteredSquad.map((player, index) => (
              <div 
                key={player.id} 
                className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center space-x-3.5 w-full sm:w-auto">
                  <span className="font-mono text-xs text-slate-500 font-bold">
                    #{index + 1}
                  </span>
                  
                  <img 
                    src={player.image} 
                    alt={player.name} 
                    className="w-11 h-11 rounded-xl object-cover border border-slate-700" 
                  />

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{player.name}</span>
                      <span className="text-sm" title={player.country}>{player.flag}</span>
                      {player.isOverseas && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                          OS
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRoleBadgeColor(player.role)}`}>
                        {player.role}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Rating: {player.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-4 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Sold Price</span>
                    <span className="text-sm font-black text-amber-400 font-mono">
                      {formatCrore(player.soldPrice)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Release ${player.name} back to draft pool and refund ${formatCrore(player.soldPrice)}?`)) {
                        onReleasePlayer(team.id, player.id);
                      }
                    }}
                    title="Release player (Linked List Deletion)"
                    className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 transition-all text-xs font-semibold flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Release</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#090e1f] flex justify-between items-center text-xs text-slate-400">
          <span>{team.description}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
