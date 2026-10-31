import React from 'react';
import { 
  Trophy, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Flame, 
  Layers, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { isAudioEnabled, setAudioEnabled, playBidSound } from '../utils/audio';
import { formatCrore } from '../utils/formatters';

export default function Navbar({ 
  stats, 
  onResetAuction, 
  soundOn, 
  setSoundOn,
  onOpenFdsModal
}) {
  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setAudioEnabled(next);
    if (next) playBidSound();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070b19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Branding */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-indigo-600 p-0.5 shadow-lg shadow-orange-500/20">
            <div className="w-full h-full bg-[#090f23] rounded-[10px] flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl lg:text-2xl font-black tracking-tight bg-gradient-to-r from-amber-300 via-orange-400 to-sky-400 bg-clip-text text-transparent">
                IPL AUCTION PRO
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                FDS Mini Project
              </span>
            </div>
            <p className="hidden md:block text-xs text-slate-400 font-medium tracking-wide">
              Where Strategy Meets Cricket – Bid, Build and Conquer!
            </p>
          </div>
        </div>

        {/* Center: Live Auction Stats Ticker */}
        <div className="hidden xl:flex items-center space-x-6 bg-slate-900/60 border border-slate-800 px-4 py-1.5 rounded-full text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-400">Sold:</span>
            <span className="font-bold text-emerald-400">{stats.totalSold} / {stats.totalPlayers}</span>
          </div>
          <div className="w-px h-3.5 bg-slate-800"></div>
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">Queue:</span>
            <span className="font-bold text-sky-400">{stats.totalRemaining}</span>
          </div>
          <div className="w-px h-3.5 bg-slate-800"></div>
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">Total Spent:</span>
            <span className="font-bold text-amber-400">{formatCrore(stats.totalSpent)}</span>
          </div>
          <div className="w-px h-3.5 bg-slate-800"></div>
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">Highest Bid:</span>
            <span className="font-bold text-orange-400">{formatCrore(stats.highestBid)}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2.5">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            className={`p-2 rounded-lg border transition-all ${
              soundOn 
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20' 
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset Auction Button */}
          <button
            onClick={onResetAuction}
            title="Reset Auction & Clear Storage"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

      </div>
    </header>
  );
}
