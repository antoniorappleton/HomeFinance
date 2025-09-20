// ====== helpers ======
const eur = n => n.toLocaleString('pt-PT',{style:'currency',currency:'EUR'});
const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));

// ====== dados de exemplo (podes ligar a fontes reais depois) ======
const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const incomes  = [300, 1200, 1300, 200,  150,  180,  240,  180,  260,  300,  400,  500];
const expenses = [100,   0,    0,  350,  450,  600,  120,  180,  220, 1200,  0,    0];
const balance  = incomes.map((v,i)=>v-(expenses[i]||0)).reduce((acc,v,i)=>{acc.push((acc[i-1]||0)+v);return acc},[]);

// distribuição de despesas (pizza)
const pieLabels = ["Casa","Carros","Lazer e Entretenimento","Outras Despesas","Alimentação"];
const pieValues = [35.3, 28.4, 11.4, 23.7, 1.2];

// KPIs simples
const kpi = {
  income: incomes.slice(-1)[0]*5,         // exemplo: somatório/demonstrativo
  expense: expenses.slice(-1)[0]*5,
  savings: 6023,
  balance: 46.26
};

// metas
const goalMonthlyTarget = 500;
const goalMonthlySaved = 860.43;
const emergencySaved = 6023;
const emergencyMonthlyNeed = 1203.21;

// ====== pinta KPIs e metas ======
document.getElementById('kpi-income').textContent  = eur(kpi.income);
document.getElementById('kpi-expense').textContent = eur(kpi.expense);
document.getElementById('kpi-savings').textContent = eur(kpi.savings);
document.getElementById('kpi-balance').textContent = eur(kpi.balance);

document.getElementById('kpi-income-trend').textContent  = '+0% vs mês anterior';
document.getElementById('kpi-expense-trend').textContent = '+0% vs mês anterior';
document.getElementById('kpi-savings-trend').textContent = '+415.38% vs mês anterior';
document.getElementById('kpi-balance-note').textContent  = ' ';

document.getElementById('goal-saved').textContent = eur(goalMonthlySaved);
document.getElementById('emergency-saved').textContent = eur(emergencySaved);
document.getElementById('regular-expenses').textContent = eur(674.53);
document.getElementById('regular-expenses-badge').textContent = 'Normal';

const goalPct = clamp((goalMonthlySaved/goalMonthlyTarget)*100, 0, 300);
document.getElementById('goal-progress').style.width = `${goalPct}%`;
document.getElementById('goal-hint').textContent = `${goalPct.toFixed(1)}% da meta`;

const emergencyMonths = emergencySaved / emergencyMonthlyNeed;
document.getElementById('emergency-progress').style.width = `${clamp(emergencyMonths*10,0,100)}%`;
document.getElementById('emergency-hint').textContent = `${emergencyMonths.toFixed(1)} meses de despesas`;

// ====== cores util ======
const green = getComputedStyle(document.documentElement).getPropertyValue('--income') || '#16a34a';
const red   = getComputedStyle(document.documentElement).getPropertyValue('--expense') || '#ef4444';
const blue  = getComputedStyle(document.documentElement).getPropertyValue('--savings') || '#2563eb';
const bal   = getComputedStyle(document.documentElement).getPropertyValue('--balance') || '#065f46';

// ====== Chart 1: Análise Temporal (barras + linha cumulativa) ======
const timeCtx = document.getElementById('timeChart').getContext('2d');
new Chart(timeCtx, {
  type: 'bar',
  data: {
    labels: months,
    datasets: [
      {
        type: 'bar',
        label: 'Receitas',
        data: incomes,
        borderWidth: 0,
        backgroundColor: '#16a34a55',
        hoverBackgroundColor: '#16a34a88'
      },
      {
        type: 'bar',
        label: 'Despesas',
        data: expenses.map(v=>-v), // barras negativas (visuais)
        borderWidth: 0,
        backgroundColor: '#ef444455',
        hoverBackgroundColor: '#ef444488'
      },
      {
        type: 'line',
        label: 'Saldo acumulado',
        data: balance,
        tension: 0.35,
        borderColor: bal.trim() || '#065f46',
        pointRadius: 3,
        pointHoverRadius: 5,
        yAxisID: 'y2'
      }
    ]
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: {
          callback: v => eur(v)
        }
      },
      y2: {
        position: 'right',
        grid: { display: false },
        ticks: { callback: v => eur(v) }
      },
      x: { grid: { display:false } }
    },
    plugins: {
      legend: { labels: { boxWidth: 12, usePointStyle: true } },
      tooltip: {
        callbacks: {
          label: ctx => {
            const v = ctx.raw;
            const name = ctx.dataset.label || '';
            return `${name}: ${eur(v)}`;
          }
        }
      }
    }
  }
});

// ====== Chart 2: Pizza de Despesas ======
const pieCtx = document.getElementById('pieChart').getContext('2d');
new Chart(pieCtx, {
  type: 'pie',
  data: {
    labels: pieLabels,
    datasets: [{
      data: pieValues,
      backgroundColor: [
        '#ef4444', '#16a34a', '#2563eb', '#1f2937', '#f59e0b'
      ]
    }]
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.formattedValue}%`
        }
      }
    }
  }
});
