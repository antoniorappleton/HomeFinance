export function Navigation() {
  const el = document.createElement('aside');
  el.className = "p-4 bg-gray-50 border-r min-w-56";
  el.innerHTML = `
    <ul class="space-y-2">
      <li><a href="#/" class="block py-2 px-3 rounded hover:bg-gray-100">🏠 Dashboard</a></li>
      <li><a href="#/transactions" class="block py-2 px-3 rounded hover:bg-gray-100">📒 Transações</a></li>
    </ul>
  `;
  return el;
}
