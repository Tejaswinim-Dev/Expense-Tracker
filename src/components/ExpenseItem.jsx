import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { db } from '../db';
import { categories } from '../utils/constants';
import {
  FiTrash2,
  FiEdit2,
  FiSave,
  FiX,
} from 'react-icons/fi';

export default function ExpenseItem({ expense }) {
  const { dispatch } = useExpenses();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    amount: expense.amount.toString(),
    category: expense.category,
    description: expense.description ?? '',
    date: new Date(expense.date).toISOString().slice(0, 10),
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const out = {};
    if (!form.amount || Number(form.amount) <= 0)
      out.amount = 'Enter a positive number';
    if (!form.category) out.category = 'Pick a category';
    return out;
  };

  const save = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const updated = {
      ...expense,
      amount: parseFloat(form.amount),
      category: form.category,
      description: form.description.trim(),
      date: new Date(form.date).getTime(),
    };

    await db.expenses.put(updated);
    dispatch({ type: 'UPDATE_EXPENSE', payload: updated });
    setIsEditing(false);
  };

  const remove = async () => {
    if (confirm('Delete this expense?')) {
      await db.expenses.delete(expense.id);
      dispatch({ type: 'DELETE_EXPENSE', payload: expense.id });
    }
  };

  /* ---------- render ---------- */

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow space-y-3">
        {/* amount + category */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium mb-1">Amount (₹)</label>
            <input
              className="input w-full"
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-xs font-medium mb-1">Category</label>
            <select
              className="input w-full"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select…</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>
        </div>

        {/* description + date */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium mb-1">
              Description
            </label>
            <input
              className="input w-full"
              value={form.description}
              maxLength={120}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Date</label>
            <input
              className="input"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
        </div>

        {/* action buttons */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={save}
            className="btn-primary inline-flex items-center gap-1"
          >
            <FiSave /> Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="input inline-flex items-center gap-1"
          >
            <FiX /> Cancel
          </button>
        </div>
      </div>
    );
  }

  /* ---------- normal (read-only) view ---------- */
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow flex items-center gap-4">
      <div className="flex-1">
        <p className="font-medium">
          ₹{expense.amount.toFixed(2)}{' '}
          <span className="text-xs text-slate-500">({expense.category})</span>
        </p>
        {expense.description && (
          <p className="text-sm text-slate-500">{expense.description}</p>
        )}
      </div>

      <p className="text-xs text-slate-500 w-28">
        {new Date(expense.date).toLocaleDateString()}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="input inline-flex items-center gap-1"
        >
          <FiEdit2 /> Edit
        </button>
        <button
          onClick={remove}
          className="input inline-flex items-center gap-1 text-red-600"
        >
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
}
