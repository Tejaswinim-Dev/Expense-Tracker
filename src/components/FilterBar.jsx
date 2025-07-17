import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { categories } from '../utils/constants';
import { exportCSV, exportJSON } from '../utils/export';
import { FiFilter, FiDownload, FiFileText } from 'react-icons/fi';

export default function FilterBar() {
  const { state, dispatch } = useExpenses();
  const [local, setLocal] = useState(state.filter);

  const handleChange = (e) => setLocal({ ...local, [e.target.name]: e.target.value });
  const apply = () => dispatch({ type: 'SET_FILTER', payload: local });

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow mb-6 flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-2 w-full">
        <select name="category" value={local.category} onChange={handleChange} className="input sm:w-48">
          <option value="All">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input name="search" placeholder="Search description..." value={local.search} onChange={handleChange} className="flex-1 input" />
        <input name="minAmount" type="number" placeholder="Min ₹" value={local.minAmount} onChange={handleChange} className="input w-28" />
        <input name="maxAmount" type="number" placeholder="Max ₹" value={local.maxAmount} onChange={handleChange} className="input w-28" />
        <input name="startDate" type="date" value={local.startDate} onChange={handleChange} className="input" />
        <input name="endDate" type="date" value={local.endDate} onChange={handleChange} className="input" />
      </div>

      <div className="flex gap-2">
        <button onClick={apply} className="btn-primary sm:w-28 inline-flex items-center gap-1"><FiFilter /> Apply</button>
        <button onClick={() => exportCSV(state.expenses)} className="input sm:w-32 inline-flex items-center gap-1"><FiDownload /> Export CSV</button>
        <button onClick={() => exportJSON(state.expenses)} className="input sm:w-32 inline-flex items-center gap-1"><FiFileText /> Export JSON</button>
      </div>
    </div>
  );
}
