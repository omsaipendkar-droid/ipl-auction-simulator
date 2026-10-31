import React from 'react';
import { 
  Award, 
  Download, 
  FileText, 
  Trophy, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  Coins, 
  RotateCcw,
  Sparkles,
  Users,
  ChevronDown
} from 'lucide-react';
import { formatCrore, getRoleBadgeColor } from '../utils/formatters';
import { downloadAuctionCsv, downloadSummaryText } from '../utils/exportReport';

export default function ResultsView({ 
  stats, 
  teams, 
  players, 
  onReAuctionUnsold,
  onResetAuction 
}) {
  const unsoldPlayers = players.filter(p => p.status === 'unsold');

  return (
    <div className="space-y-8">
      
      {/* Header & Export Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <Award className="w-8 h-8 text-amber-400" />
            <span>IPL Auction Final Results & Hall of Fame</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete financial records, franchise squads and official auction summary report.
          </p>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => downloadAuctionCsv(players, teams)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-bold transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => downloadSummaryText(players, teams, stats)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20 text-xs font-bold transition-all active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Download Report (.txt)</span>
          </button>
        </div>
      </div>

      {/* Hall of Fame Awards Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Most Expensive Player */}
        <div className="bg-gradient-to-br from-[#121c38] via-[#0f172e] to-[#0a1020] border-2 border-amber-500/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
              <Trophy className="w-4 h-4" />
              <span>RECORD BUY OF AUCTION</span>
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold">
              #1 Bid
            </span>
          </div>

          {stats.mostExpensive ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3.5">
                <img 
                  src={stats.mostExpensive.image} 
                  alt={stats.mostExpensive.name} 
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400/60"
                />
                <div>
                  <h3 className="text-lg font-black text-white">{stats.mostExpensive.name}</h3>
                  <p className="text-xs text-slate-400">{stats.mostExpensive.country} • {stats.mostExpensive.role}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Winning Franchise:</span>
                <strong className="text-xs text-white">{stats.mostExpensiveTeam?.name || 'Franchise'}</strong>
              </div>

              <div className="text-2xl font-black text-amber-400 font-mono">
                {formatCrore(stats.mostExpensive.soldPrice)}
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 py-6 text-center">
              No players sold yet. Run live auction to record sales!
            </div>
          )}
        </div>

        {/* Highest Spending Team */}
        <div className="bg-gradient-to-br from-[#131733] via-[#0d1428] to-[#090e1c] border-2 border-purple-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center space-x-1.5">
              <Coins className="w-4 h-4" />
              <span>BIGGEST SPENDER</span>
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold">
              Aggressive
            </span>
          </div>

          {stats.highestSpendingTeam && stats.highestSpendingTeam.spent > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3.5">
                <img 
                  src={stats.highestSpendingTeam.logoSvg} 
                  alt={stats.highestSpendingTeam.name} 
                  className="w-14 h-14 rounded-2xl p-1 bg-slate-900 border border-purple-500/40"
                />
                <div>
                  <h3 className="text-lg font-black text-white">{stats.highestSpendingTeam.name}</h3>
                  <p className="text-xs text-slate-400">{stats.highestSpendingTeam.squad?.length || 0} Players Recruited</p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Purse Remaining:</span>
                <strong className="text-emerald-400 font-mono">{formatCrore(120.00 - stats.highestSpendingTeam.spent)}</strong>
              </div>

              <div className="text-2xl font-black text-purple-400 font-mono">
                {formatCrore(stats.highestSpendingTeam.spent)} Spent
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 py-6 text-center">
              All teams currently at starting budget of ₹120.00 Cr.
            </div>
          )}
        </div>

        {/* Overall Auction Balance Summary */}
        <div className="bg-gradient-to-br from-[#0e1d2c] via-[#0a1523] to-[#070e18] border-2 border-sky-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4" />
              <span>DRAFT COMPLETION</span>
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono font-bold">
              Summary
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Total Players Sold:</span>
              <strong className="text-emerald-400 font-bold">{stats.totalSold} / {players.length}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Total Unsold Players:</span>
              <strong className="text-rose-400 font-bold">{stats.totalUnsold}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Waiting in Queue:</span>
              <strong className="text-amber-400 font-bold">{stats.totalRemaining}</strong>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-400">Total Capital Spent:</span>
              <strong className="text-lg font-black text-amber-400 font-mono">{formatCrore(stats.totalSpent)}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Unsold Players Recovery Section */}
      {unsoldPlayers.length > 0 && (
        <div className="bg-[#0b1328] border border-rose-500/30 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-rose-400" />
                <span>Unsold Players Pool ({unsoldPlayers.length})</span>
              </h3>
              <p className="text-xs text-slate-400">
                Players passed without meeting reserve base price. Can be enqueued for a 2nd round.
              </p>
            </div>

            <button
              onClick={onReAuctionUnsold}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Re-Enqueue All Unsold Into Draft</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {unsoldPlayers.map((p) => (
              <div key={p.id} className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-center">
                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-full mx-auto mb-1.5 object-cover grayscale" />
                <span className="text-xs font-bold text-white block truncate">{p.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">{formatCrore(p.basePrice)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complete All 10 Franchises Final Squads Accordion / Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-white flex items-center space-x-2">
          <Users className="w-6 h-6 text-sky-400" />
          <span>Final Squad Rosters – All 10 IPL Franchises</span>
        </h3>

        <div className="space-y-4">
          {teams.map((team) => {
            const squad = team.squad || [];
            const remaining = 120.00 - (team.spent || 0);

            return (
              <div key={team.id} className="bg-[#0b1328] border border-slate-800 rounded-2xl p-5 space-y-4">
                
                {/* Team Summary Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <img src={team.logoSvg} alt={team.name} className="w-10 h-10 rounded-full p-0.5 bg-slate-900 border border-slate-700" />
                    <div>
                      <h4 className="font-black text-white text-base">{team.name} ({team.shortName})</h4>
                      <p className="text-xs text-slate-400">
                        Squad Size: <strong className="text-white">{squad.length}</strong> players • Overseas: <strong className="text-purple-400">{team.overseasCount || 0}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Spent</span>
                      <span className="font-mono font-black text-amber-400">{formatCrore(team.spent || 0)}</span>
                    </div>
                    <div className="w-px h-6 bg-slate-800"></div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Remaining</span>
                      <span className="font-mono font-black text-emerald-400">{formatCrore(remaining)}</span>
                    </div>
                  </div>
                </div>

                {/* Squad Players Table / Pills */}
                {squad.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-2">
                    No players purchased by {team.name} in this simulation yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {squad.map((player, idx) => (
                      <div key={player.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs">
                        <div className="flex items-center space-x-2.5 truncate">
                          <span className="text-[10px] font-mono text-slate-500 font-bold">#{idx + 1}</span>
                          <span className="text-sm">{player.flag}</span>
                          <span className="font-bold text-white truncate">{player.name}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold border ${getRoleBadgeColor(player.role)}`}>
                            {player.role}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-amber-400 shrink-0 ml-2">
                          {formatCrore(player.soldPrice)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
