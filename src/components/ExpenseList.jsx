import React from 'react';
import ExpenseItem from './ExpenseItem';
import { useExpenses } from '../context/ExpenseContext';

export default function ExpenseList(){
  const {state}=useExpenses();
  const {expenses, filter}=state;

  const filtered=expenses.filter(e=>{
    const matchCat= !filter.categories.length || filter.categories.includes(e.category);
    const matchSearch= !filter.search || (e.description ?? '').toLowerCase().includes(filter.search.toLowerCase());
    const matchMin= filter.minAmount==='' || e.amount>=Number(filter.minAmount);
    const matchMax= filter.maxAmount==='' || e.amount<=Number(filter.maxAmount);
    const matchStart= !filter.startDate || e.date>= new Date(filter.startDate).getTime();
    const matchEnd= !filter.endDate || e.date<= new Date(filter.endDate).getTime();
    return matchCat && matchSearch && matchMin && matchMax && matchStart && matchEnd;
  });

  if(!filtered.length){
    return <p className="text-center text-slate-500 mt-8">{expenses.length? 'No matching expenses.':'No expenses yet. Start by adding one!'}</p>;
  }

  return <div className="space-y-2">{filtered.map(exp=> <ExpenseItem key={exp.id} expense={exp}/> )}</div>;
}
