import React from 'react';
import { 
  LayoutDashboard, 
  Gavel, 
  ShieldCheck, 
  Users, 
  Award, 
  Binary,
  Flame,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, liveAuctionHasPlayer }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      color: 'text-amber-400'
    },
    {
      id: 'live',
      label: 'Live Auction',
      icon: Gavel,
      badge: liveAuctionHasPlayer ? 'LIVE' : null,
      badgeColor: 'bg-rose-500 animate-pulse text-white',
      color: 'text-rose-400'
    },
    {
      id: 'teams',
      label: 'IPL Teams (10)',
      icon: ShieldCheck,
      badge: null,
      color: 'text-sky-400'
    },
    {
      id: 'players',
      label: 'Player Catalogue',
      icon: Users,
      badge: null,
      color: 'text-indigo-400'
    },
    {
      id: 'results',
      label: 'Auction Results',
      icon: Award,
      badge: null,
      color: 'text-emerald-400'
    },
    {
      id: 'fds',
      label: 'FDS Concepts',
      icon: Binary,
      badge: 'Mini Project',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
      color: 'text-amber-300'
    }
  ];

  return (
    <aside className="w-full lg:w-64 bg-[#090f23]/95 border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Navigation Section */}
        <div>
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Navigation Menu
          </div>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-transparent border-l-4 border-amber-400 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? item.color : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100 text-amber-400' : 'text-slate-600'}`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick FDS Highlight Card in Sidebar */}
        <div className="hidden lg:block p-3.5 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-800/40 shadow-inner">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold mb-1.5">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>FDS Mini Project Core</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Powered by genuine data structures: <strong>Queue</strong> (Draft order), <strong>Max-Heap</strong> (Bidding), <strong>Linked List</strong> (Squads), and <strong>Sorting/Searching</strong> algorithms.
          </p>
          <button
            onClick={() => setActiveTab('fds')}
            className="mt-2.5 text-[11px] font-bold text-amber-400 hover:text-amber-300 underline inline-flex items-center space-x-1"
          >
            <span>Inspect Data Structures</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800/60 text-center">
        <p className="text-[11px] text-slate-500 font-medium">
          Second-Year Engineering FDS
        </p>
        <p className="text-[10px] text-slate-600">
          IPL Mega Auction Engine v2.0
        </p>
      </div>
    </aside>
  );
}
