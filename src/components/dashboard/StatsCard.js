export function StatsCard({ title, value, subtitle }) {
  const card = document.createElement('div');
  card.className = "rounded-xl shadow p-4 bg-white";
  card.innerHTML = `
    <div class="text-sm text-gray-500">${title}</div>
    <div class="text-2xl font-semibold mt-1">${value}</div>
    ${subtitle ? `<div class="text-xs text-gray-400 mt-1">${subtitle}</div>` : ''}
  `;
  return card;
}
