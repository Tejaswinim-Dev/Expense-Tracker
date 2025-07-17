import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Header() {
  const { mode, toggle } = useTheme();
  return (
    <header className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Personal Expense Tracker</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Track, analyze, export — even offline.</p>
      </div>
      <button
        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
        aria-label="Toggle theme"
        onClick={toggle}
      >
        {mode === 'dark' ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
      </button>
    </header>
  );
}
