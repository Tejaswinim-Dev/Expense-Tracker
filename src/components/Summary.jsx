import React, { useMemo } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#ea580c','#0284c7','#059669','#9333ea','#f59e0b','#ef4444','#14b8a6'];

export default function Summary() {
  const { state } = useExpenses();
  const { expenses, filter } = state;

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchCategory = filter.category === 'All' || e.category === filter.category;
      const matchSearch = !filter.search || (e.description ?? '').toLowerCase().includes(filter.search.toLowerCase());
      const matchMin = filter.minAmount === '' || e.amount >= Number(filter.minAmount);
      const matchMax = filter.maxAmount === '' || e.amount <= Number(filter.maxAmount);
      const matchStart = !filter.startDate || e.date >= new Date(filter.startDate).getTime();
      const matchEnd = !filter.endDate || e.date <= new Date(filter.endDate).getTime();
      return matchCategory && matchSearch && matchMin && matchMax && matchStart && matchEnd;
    });
  }, [expenses, filter]);

  const total = filtered.reduce((s,e)=> s+e.amount,0);
  const average = filtered.length ? total/filtered.length : 0;
  const byCategory = filtered.reduce((acc,e)=>{
    acc[e.category] = (acc[e.category]||0)+e.amount; return acc;
  },{});
  const byDate = filtered.reduce((acc,e)=>{
    const key = new Date(e.date).toLocaleDateString();
    acc[key] = (acc[key]||0)+e.amount; return acc;
  },{});

  const catData = Object.entries(byCategory).map(([k,v])=>({name:k,value:v}));
  const lineData = Object.entries(byDate)
    .sort(([a],[b])=> new Date(a)-new Date(b))
    .map(([d,v])=>({date:d, amount:v}));

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-6">
      <h2 className="font-semibold mb-2">Summary</h2>
      <p>Total Spend: <span className="font-medium">₹{total.toFixed(2)}</span></p>
      <p>Transactions: <span className="font-medium">{filtered.length}</span></p>
      <p>Average Expense: <span className="font-medium">₹{average.toFixed(2)}</span></p>

      {/* Charts */}
      {filtered.length > 0 && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie */}
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={catData} dataKey="value" nameKey="name" outerRadius="80%">
                  {catData.map((_,idx)=> <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Line */}
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={lineData}>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line type="monotone" dataKey="amount" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
