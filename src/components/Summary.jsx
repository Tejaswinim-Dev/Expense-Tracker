import React, { useMemo } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const COLORS=['#ea580c','#0284c7','#059669','#9333ea','#f59e0b','#ef4444','#14b8a6'];

export default function Summary(){
  const { state, dispatch } = useExpenses();
  const { expenses, filter } = state;

  const filtered = useMemo(()=> expenses.filter(e=>{
    const catMatch = !filter.categories.length || filter.categories.includes(e.category);
    const searchMatch = !filter.search || (e.description ?? '').toLowerCase().includes(filter.search.toLowerCase());
    const minMatch = filter.minAmount==='' || e.amount >= Number(filter.minAmount);
    const maxMatch = filter.maxAmount==='' || e.amount <= Number(filter.maxAmount);
    const startMatch = !filter.startDate || e.date >= new Date(filter.startDate).getTime();
    const endMatch = !filter.endDate || e.date <= new Date(filter.endDate).getTime();
    return catMatch && searchMatch && minMatch && maxMatch && startMatch && endMatch;
  }), [expenses, filter]);

  const total = filtered.reduce((s,e)=> s+e.amount,0);
  const avg = filtered.length ? total / filtered.length : 0;

  const byCat = filtered.reduce((a,e)=>{a[e.category]=(a[e.category]||0)+e.amount; return a;}, {});
  const pieData = Object.entries(byCat).map(([k,v])=>({name:k,value:v}));

  const byDate = filtered.reduce((a,e)=>{const d=new Date(e.date).toLocaleDateString(); a[d]=(a[d]||0)+e.amount; return a;},{});
  const lineData = Object.entries(byDate).sort(([a],[b])=> new Date(a)-new Date(b)).map(([d,v])=>({date:d,amount:v}));

  const byMonth = filtered.reduce((a,e)=>{ const d=new Date(e.date); const key=`${d.getFullYear()}-${d.getMonth()+1}`; a[key]=(a[key]||0)+e.amount; return a;}, {});
  const monthData = Object.entries(byMonth).sort(([a],[b])=> new Date(a)-new Date(b)).map(([m,v])=>({month:m,amount:v}));

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="font-semibold">Summary</h2>
        <button onClick={()=>window.print()} className="input inline-flex items-center gap-1" aria-label="Print">🖨️ Print</button>
      </div>
      <p>Total Spend: <span className="font-medium">₹{total.toFixed(2)}</span></p>
      <p>Transactions: <span className="font-medium">{filtered.length}</span></p>
      <p>Average Expense: <span className="font-medium">₹{avg.toFixed(2)}</span></p>

      {filtered.length>0 && (
        <div className="grid auto-rows-[16rem] gap-6 mt-6 sm:grid-cols-2 xl:grid-cols-3">
          <div className="w-full h-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="80%"
                  onClick={(d)=>{
                    const cat = d.name;
                    const nextCats = filter.categories.includes(cat) ? [] : [cat];
                    dispatch({ type:'SET_FILTER', payload:{...filter, categories: nextCats} });
                  }}
                >
                  {pieData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full h-full">
            <ResponsiveContainer>
              <LineChart data={lineData}>
                <XAxis dataKey="date"/><YAxis/><CartesianGrid strokeDasharray="3 3"/><Tooltip/>
                <Line type="monotone" dataKey="amount" strokeWidth={2}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Monthly trend */}
          <div className="w-full lg:col-span-2 h-full">
            <ResponsiveContainer>
              <LineChart data={monthData}>
                <XAxis dataKey="month"/><YAxis/><CartesianGrid strokeDasharray="3 3"/><Tooltip/>
                <Line type="monotone" dataKey="amount" strokeWidth={2}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
