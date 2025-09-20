import { Header } from '../components/layout/Header.js';
import { Navigation } from '../components/layout/Navigation.js';
import { StatsCard } from '../components/dashboard/StatsCard.js';
import { TransactionsList } from '../components/transactions/TransactionsList.js';
import { TransactionForm } from '../components/forms/TransactionForm.js';
import { sampleData } from '../data/sampleData.js';

export function renderIndex() {
  const page = document.createElement('div');
  page.className = "min-h-screen bg-gray-100";

  const header = Header();
  const main = document.createElement('main');
  main.className = "max-w-6xl mx-auto p-4 grid md:grid-cols-[220px_1fr] gap-4";

  const nav = Navigation();

  const content = document.createElement('section');
  content.className = "space-y-4";

  // cards topo
  const cards = document.createElement('div');
  cards.className = "grid sm:grid-cols-2 lg:grid-cols-4 gap-4";
  cards.append(
    StatsCard({ title: 'Total Investido', value: '€ 12.300' }),
    StatsCard({ title: 'Lucro', value: '€ 1.240' }),
    StatsCard({ title: 'Retorno', value: '10,1%' }),
    StatsCard({ title: 'Objetivos', value: '3 ativos' }),
  );

  // form + lista
  const form = TransactionForm({
    onSubmit: (tx) => {
      sampleData.push({ ...tx, date: tx.date || new Date().toISOString().slice(0,10) });
      rerenderList();
    }
  });

  const listWrap = document.createElement('div');
  let list = TransactionsList({ items: sampleData });
  listWrap.appendChild(list);

  function rerenderList() {
    listWrap.innerHTML = '';
    list = TransactionsList({ items: sampleData });
    listWrap.appendChild(list);
  }

  content.append(cards, form, listWrap);
  main.append(nav, content);
  page.append(header, main);
  return page;
}
