export function Header() {
  const el = document.createElement('header');
  el.className = "px-4 py-3 shadow-md bg-white";
  el.innerHTML = `
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <h1 class="text-xl font-semibold">HomeFinance</h1>
      <nav class="space-x-4">
        <a href="#/" class="hover:underline">Dashboard</a>
        <a href="#/transactions" class="hover:underline">Transações</a>
      </nav>
    </div>
  `;
  return el;
}
