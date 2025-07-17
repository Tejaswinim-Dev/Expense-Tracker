import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { db } from '../db';
import { categories } from '../utils/constants';
import { FiPlus } from 'react-icons/fi';

export default function ExpenseForm() {
  const { dispatch } = useExpenses();
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.amount || Number(form.amount) <= 0) errs.amount = 'Enter a positive amount';
    if (!form.category) errs.category = 'Select a category';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    const expense = {
      ...form,
      amount: parseFloat(form.amount),
      date: new Date(form.date).getTime(),
      createdAt: Date.now(),
    };
    const id = await db.expenses.add(expense);
    dispatch({ type: 'ADD_EXPENSE', payload: { ...expense, id } });
    setForm({ amount: '', category: '', description: '', date: new Date().toISOString().slice(0, 10) });
    setErrors({});
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Amount (₹)</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            className="w-full input"
          />
          {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full input">
            <option value="">Select...</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Description (optional)</label>
          <input
            name="description"
            type="text"
            maxLength={120}
            value={form.description}
            onChange={handleChange}
            className="w-full input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} className="input" />
        </div>
      </div>
      <div className="text-right">
        <button type="submit" className="btn-primary inline-flex items-center gap-1">
          <FiPlus /> Add Expense
        </button>
      </div>
    </form>
  );
}
