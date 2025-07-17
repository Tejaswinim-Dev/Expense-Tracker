import React from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import FilterBar from './components/FilterBar';
import Summary from './components/Summary';
import ExpenseList from './components/ExpenseList';

export default function App() {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Header />
          <ExpenseForm />
          <FilterBar />
          <Summary />
          <ExpenseList />
        </div>
      </ExpenseProvider>
    </ThemeProvider>
  );
}
