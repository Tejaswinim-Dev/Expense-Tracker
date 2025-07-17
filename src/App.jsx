import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ExpenseProvider, useExpenses } from './context/ExpenseContext';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import FilterBar from './components/FilterBar';
import Summary from './components/Summary';
import ExpenseList from './components/ExpenseList';
import LoadingSpinner from './components/LoadingSpinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Inner(){
  // shortcuts
  React.useEffect(()=>{
    const handler=e=>{
      if(e.key==='/' && !e.target.closest('input,textarea,select')){
        const search=document.querySelector('input[name="search"]'); search&&search.focus(); e.preventDefault();
      }
      if(e.key==='Escape'){
        const openPopover=document.activeElement.closest('[role="dialog"],[role="listbox"]'); if(openPopover){ openPopover.dispatchEvent(new Event('close',{bubbles:true})); }
      }
    };
    window.addEventListener('keydown',handler);
    return ()=> window.removeEventListener('keydown',handler);
  },[]);
  const {state}=useExpenses();
  return (
    <>
      {state.loading && <LoadingSpinner/>}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Header/>
        <ExpenseForm/>
        <FilterBar/>
        <div id="export-area" className="space-y-6">
          <Summary/>
          <ExpenseList/>
        </div>
      </div>
    </>
  );
}

export default function App(){
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <Inner/>
        <ToastContainer position="bottom-right" theme="colored"/>
      </ExpenseProvider>
    </ThemeProvider>
  );
}
