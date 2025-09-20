export function renderNotFound() {
  const el = document.createElement('div');
  el.className = "min-h-screen grid place-items-center";
  el.innerHTML = `
    <div class="text-center">
      <div class="text-4xl font-bold mb-2">404</div>
      <p class="text-gray-600 mb-4">Página não encontrada</p>
      <a href="#/" class="text-emerald-700 underline">Voltar ao início</a>
    </div>
  `;
  return el;
}
