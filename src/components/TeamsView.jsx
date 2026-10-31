import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Coins, 
  Users, 
  Trophy, 
  ChevronRight, 
  MapPin, 
  Flame,
  Globe2
} from 'lucide-react';
import { formatCrore } from '../utils/formatters';
import TeamDetailModal from './TeamDetailModal';

export default function TeamsView({ teams, onReleasePlayer }) {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <ShieldCheck className="w-7 h-7 text-sky-400" />
            <span>IPL Franchises ({teams.length})</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official 10 IPL Teams with ₹120.00 Cr purse. Managed with <strong>SquadLinkedList</strong> data structures.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800">
          <span className="text-slate-400">Total Teams Budget:</span>
          <strong className="text-amber-400 font-mono font-bold">₹1,200.00 Cr</strong>
        </div>
      </div>

      {/* 10 Franchise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teams.map((team) => {
          const spent = team.spent || 0;
          const remaining = 120.00 - spent;
          const squad = team.squad || [];
          const overseas = team.overseasCount || 0;
          const percentSpent = Math.min(100, (spent / 120.00) * 100);

          return (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className="bg-[#0b1328] border border-slate-800/80 hover:border-amber-500/50 rounded-2xl p-5 shadow-lg hover:shadow-amber-500/10 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Team Top Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={team.logoSvg}
                      alt={team.name}
                      className="w-12 h-12 rounded-full p-1 bg-slate-900 border border-slate-700 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h3 className="font-black text-white text-base group-hover:text-amber-300 transition-colors">
                        {team.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <span className="font-mono font-bold text-amber-400">{team.shortName}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Trophy className="w-3 h-3 text-amber-400" />
                          <span>{team.trophies}x</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="p-2 rounded-xl bg-slate-900 group-hover:bg-amber-400 group-hover:text-slate-950 text-slate-400 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Home Ground & Bio */}
                <p className="text-[11px] text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {team.description}
                </p>

                {/* Purse Progress Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Purse Remaining:</span>
                    <span className="font-mono font-bold text-emerald-400">{formatCrore(remaining)}</span>
                  </div>

                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentSpent}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Spent: {formatCrore(spent)}</span>
                    <span>Cap: ₹120.00 Cr</span>
                  </div>
                </div>
              </div>

              {/* Squad Footnote */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-400" />
                  <span>Squad: <strong className="text-white">{squad.length}</strong> Players</span>
                </span>

                <span className="text-purple-400 font-medium text-[11px] flex items-center space-x-1">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>{overseas} Overseas</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Details Modal */}
      {selectedTeam && (
        <TeamDetailModal
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onReleasePlayer={(teamId, playerId) => {
            onReleasePlayer(teamId, playerId);
            // Refresh modal reference
            const updated = teams.find(t => t.id === teamId);
            setSelectedTeam(updated);
          }}
        />
      )}

    </div>
  );
}
