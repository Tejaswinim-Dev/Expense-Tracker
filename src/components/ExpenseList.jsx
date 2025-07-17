import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList() {
  const { state } = useExpenses();
  const { expenses, filter } = state;

  const filtered = expenses.filter(e => {
    const matchCategory = filter.category === 'All' || e.category === filter.category;
    const matchSearch = !filter.search || (e.description ?? '').toLowerCase().includes(filter.search.toLowerCase());
    const matchMin = filter.minAmount === '' || e.amount >= Number(filter.minAmount);
    const matchMax = filter.maxAmount === '' || e.amount <= Number(filter.maxAmount);
    const matchStart = !filter.startDate || e.date >= new Date(filter.startDate).getTime();
    const matchEnd = !filter.endDate || e.date <= new Date(filter.endDate).getTime();
    return matchCategory && matchSearch && matchMin && matchMax && matchStart && matchEnd;
  });

  if (!filtered.length) {
    return <p className="text-center text-slate-500 mt-8">
      {expenses.length ? 'No expenses match your criteria.' : 'No expenses yet. Start by adding one!'}
    </p>;
  }

  return <div className="space-y-2">
    {filtered.map(expense => <ExpenseItem key={expense.id} expense={expense} />)}
  </div>;
}
