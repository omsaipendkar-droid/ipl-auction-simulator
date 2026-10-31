/**
 * Auction Report Export Utility
 * Generates downloadable CSV and comprehensive text reports.
 */

export function downloadAuctionCsv(players, teams) {
  const headers = [
    'Player ID',
    'Player Name',
    'Role',
    'Nationality',
    'Overseas',
    'Rating',
    'Base Price (Cr)',
    'Auction Status',
    'Winning Team',
    'Sold Price (Cr)'
  ];

  const rows = players.map(p => {
    const winningTeam = teams.find(t => t.id === p.soldToTeam);
    return [
      `"${p.id}"`,
      `"${p.name}"`,
      `"${p.role}"`,
      `"${p.country}"`,
      `"${p.isOverseas ? 'Yes' : 'No'}"`,
      p.rating,
      p.basePrice.toFixed(2),
      `"${p.status.toUpperCase()}"`,
      `"${winningTeam ? winningTeam.name : 'N/A'}"`,
      p.soldPrice ? p.soldPrice.toFixed(2) : '0.00'
    ];
  });

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `IPL_Auction_Pro_Report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadSummaryText(players, teams, stats) {
  let text = `========================================================================\n`;
  text += `   IPL AUCTION PRO – CRICKET PLAYER AUCTION SIMULATOR\n`;
  text += `   FDS (Fundamentals of Data Structures) Mini Project Summary Report\n`;
  text += `   Generated on: ${new Date().toLocaleString()}\n`;
  text += `========================================================================\n\n`;

  text += `1. OVERALL AUCTION SUMMARY STATISTICS:\n`;
  text += `------------------------------------------------------------------------\n`;
  text += `Total Franchises:          ${teams.length}\n`;
  text += `Total Players Registered:  ${players.length}\n`;
  text += `Players Sold:              ${stats.totalSold}\n`;
  text += `Players Unsold:            ${stats.totalUnsold}\n`;
  text += `Players Remaining/Queue:   ${stats.totalRemaining}\n`;
  text += `Total Capital Spent:       ₹${stats.totalSpent.toFixed(2)} Crore\n`;
  text += `Most Expensive Player:     ${stats.mostExpensive ? `${stats.mostExpensive.name} (₹${stats.mostExpensive.soldPrice.toFixed(2)} Cr to ${stats.mostExpensiveTeam?.name || 'N/A'})` : 'None'}\n`;
  text += `Highest Spending Team:     ${stats.highestSpendingTeam ? `${stats.highestSpendingTeam.name} (₹${stats.highestSpendingTeam.spent.toFixed(2)} Cr)` : 'None'}\n\n`;

  text += `2. TEAM SQUAD PURSE BREAKDOWNS:\n`;
  text += `------------------------------------------------------------------------\n`;
  teams.forEach(t => {
    const remaining = (t.startingPurse || 120.00) - (t.spent || 0);
    text += `[${t.shortName}] ${t.name}\n`;
    text += `   Spent: ₹${(t.spent || 0).toFixed(2)} Cr | Remaining: ₹${remaining.toFixed(2)} Cr | Players: ${t.squad?.length || 0} (Overseas: ${t.overseasCount || 0})\n`;
    if (t.squad && t.squad.length > 0) {
      t.squad.forEach((p, idx) => {
        text += `     ${idx + 1}. ${p.name} (${p.role}) - ₹${p.soldPrice?.toFixed(2)} Cr [${p.country}]\n`;
      });
    } else {
      text += `     (No players purchased yet)\n`;
    }
    text += `\n`;
  });

  text += `========================================================================\n`;
  text += `FDS CONCEPTS IMPLEMENTED:\n`;
  text += `- Queue: Draft order FIFO management (enqueue & dequeue operations)\n`;
  text += `- Priority Queue (Max Heap): Live bid tracking with O(1) top bid access\n`;
  text += `- Singly Linked List: Dynamic squad roster management with node traversal\n`;
  text += `- MergeSort & QuickSort: Algorithmic sorting by rating and base price\n`;
  text += `- Linear & Binary Search: Player lookups with step-by-step trace\n`;
  text += `========================================================================\n`;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `IPL_Auction_Summary_${new Date().toISOString().slice(0, 10)}.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
