export function TransactionForm({ onSubmit }) {
  const form = document.createElement('form');
  form.className = "rounded-xl shadow bg-white p-4 grid gap-3 md:grid-cols-4";
  form.innerHTML = `
    <input required name="date" type="date" class="border rounded px-3 py-2" />
    <input required name="desc" placeholder="Descrição" class="border rounded px-3 py-2 md:col-span-2" />
    <input required name="amount" type="number" step="0.01" placeholder="Valor (€)" class="border rounded px-3 py-2" />
    <input name="category" placeholder="Categoria" class="border rounded px-3 py-2 md:col-span-2" />
    <button class="bg-emerald-600 text-white rounded px-4 py-2 md:col-span-2">Adicionar</button>
  `;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    data.amount = parseFloat(data.amount);
    onSubmit?.(data);
    form.reset();
  });
  return form;
}
