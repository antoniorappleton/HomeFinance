export function TransactionsList({ items }) {
  const el = document.createElement('div');
  el.className = "rounded-xl shadow bg-white overflow-hidden";
  el.innerHTML = `
    <table class="w-full text-sm">
      <thead class="bg-gray-50 text-gray-600">
        <tr>
          <th class="text-left p-3">Data</th>
          <th class="text-left p-3">Descrição</th>
          <th class="text-right p-3">Valor</th>
          <th class="text-left p-3">Categoria</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;
  const tbody = el.querySelector('tbody');
  items.forEach(tx => {
    const tr = document.createElement('tr');
    tr.className = "border-t";
    tr.innerHTML = `
      <td class="p-3">${tx.date}</td>
      <td class="p-3">${tx.desc}</td>
      <td class="p-3 text-right ${tx.amount < 0 ? 'text-red-600' : 'text-emerald-600'}">${tx.amount.toLocaleString('pt-PT',{style:'currency',currency:'EUR'})}</td>
      <td class="p-3">${tx.category}</td>
    `;
    tbody.appendChild(tr);
  });
  return el;
}
