/**
 * Formatting Utilities for IPL Auction
 */

export function formatCrore(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0.00 Cr';
  const val = Number(amount);
  return `₹${val.toFixed(2)} Cr`;
}

export function formatNumber(num) {
  if (num === null || num === undefined) return '0';
  return Number(num).toLocaleString('en-IN');
}

export function getRoleBadgeColor(role) {
  switch (role) {
    case 'Batsman':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'Bowler':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'All-Rounder':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'Wicketkeeper':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    default:
      return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
}
