import React, { useEffect, useRef, useState } from 'react';
import { FiDownload, FiFileText, FiFilter } from 'react-icons/fi';
import { useExpenses } from '../context/ExpenseContext';
import { categories } from '../utils/constants';
import { exportCSV, exportJSON } from '../utils/export';
import { exportPDF } from '../utils/pdf';

export default function FilterBar() {
  const { state, dispatch } = useExpenses();
  const [local, setLocal] = useState(state.filter);

  /* ── Category dropdown pop-over ── */
  const [open, setOpen] = useState(false);
  const pop = useRef(null);
  useEffect(() => {
    const close = (e) => open && !pop.current?.contains(e.target) && setOpen(false);
    addEventListener('pointerdown', close);
    return () => removeEventListener('pointerdown', close);
  }, [open]);

  const patch = (x) => setLocal({ ...local, ...x });
  const toggleCat = (c) =>
    patch({
      categories: local.categories.includes(c)
        ? local.categories.filter((x) => x !== c)
        : [...local.categories, c],
    });

  /* ── commit to global state ── */
  const apply = () => dispatch({ type: 'SET_FILTER', payload: local });

  return (
    <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT column – form */}
        <div className="flex-1 grid gap-4">
          {/* row 1: category + search side-by-side on lg */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Category */}
            <div className="relative" ref={pop}>
              <button
                className="input w-full flex justify-between items-center"
                onClick={() => setOpen(!open)}
                aria-haspopup="listbox"
                aria-expanded={open}
              >
                {local.categories.length ? `${local.categories.length} selected` : 'All Categories'}
                <span aria-hidden>▾</span>
              </button>
              {open && (
                <ul
                  role="listbox"
                  className="absolute z-20 mt-1 w-full bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-md shadow-lg max-h-48 overflow-auto p-2 space-y-1"
                >
                  {categories.map((c) => (
                    <li key={c} className="flex items-center gap-2">
                      <input
                        id={`cat-${c}`}
                        type="checkbox"
                        checked={local.categories.includes(c)}
                        onChange={() => toggleCat(c)}
                      />
                      <label htmlFor={`cat-${c}`} className="select-none">
                        {c}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Search */}
            <input
              name="search"
              placeholder="Search description…"
              value={local.search}
              onChange={(e) => patch({ search: e.target.value })}
              className="input w-full"
            />
          </div>

          {/* row 2: Min / Max */}
          <div className="grid gap-4 lg:grid-cols-2">
            <input
              name="minAmount"
              type="number"
              placeholder="Min ₹"
              value={local.minAmount}
              onChange={(e) => patch({ minAmount: e.target.value })}
              className="input w-full text-right"
            />
            <input
              name="maxAmount"
              type="number"
              placeholder="Max ₹"
              value={local.maxAmount}
              onChange={(e) => patch({ maxAmount: e.target.value })}
              className="input w-full text-right"
            />
          </div>

          {/* row 3: From / To */}
          <div className="grid gap-4 lg:grid-cols-2">
            <input
              name="startDate"
              type="date"
              value={local.startDate}
              onChange={(e) => patch({ startDate: e.target.value })}
              className="input w-full"
            />
            <input
              name="endDate"
              type="date"
              value={local.endDate}
              onChange={(e) => patch({ endDate: e.target.value })}
              className="input w-full"
            />
          </div>
        </div>

        {/* RIGHT column – actions */}
        <div className="flex flex-col gap-4 w-full lg:w-auto">
          <button
            onClick={apply}
            className="btn-primary flex items-center justify-center gap-2 text-lg py-3"
          >
            <FiFilter /> Apply
          </button>

          <div className="flex gap-4">
            <button
              onClick={() => exportCSV(state.expenses)}
              className="input flex flex-col items-center gap-1 px-6 py-3"
            >
              <FiDownload className="text-xl" />
              Export CSV
            </button>
            <button
              onClick={() => exportJSON(state.expenses)}
              className="input flex flex-col items-center gap-1 px-6 py-3"
            >
              <FiFileText className="text-xl" />
              Export JSON
            </button>
            <button onClick={exportPDF} className="input flex flex-col items-center gap-1 px-6 py-3">
              📄
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
