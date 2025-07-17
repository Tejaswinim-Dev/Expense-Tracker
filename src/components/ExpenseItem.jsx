import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { db } from '../db';
import { categories } from '../utils/constants';
import { FiTrash2, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function ExpenseItem({expense}){
  const {dispatch}=useExpenses();
  const [isEditing,setIsEditing]=useState(false);
  const [form,setForm]=useState({
    amount:expense.amount.toString(),
    category:expense.category,
    description:expense.description ?? '',
    date:new Date(expense.date).toISOString().slice(0,10)
  });
  const [errors,setErrors]=useState({});

  const validate=()=>{
    const e={};
    if(!form.amount || Number(form.amount)<=0) e.amount='Enter positive number';
    if(!form.category) e.category='Select category';
    return e;
  };

  const save=async()=>{
    const errs=validate();
    if(Object.keys(errs).length){setErrors(errs); return;}
    const updated={...expense, amount:parseFloat(form.amount), category:form.category, description:form.description.trim(), date:new Date(form.date).getTime()};
    try{
      await db.expenses.put(updated);
      dispatch({type:'UPDATE_EXPENSE', payload:updated});
      toast.success('Expense updated');
      setIsEditing(false);
    }catch(err){ console.error(err); toast.error('Failed to update'); }
  };

  const remove=async()=>{
    if(!confirm('Delete this expense?')) return;
    try{
      await db.expenses.delete(expense.id);
      dispatch({type:'DELETE_EXPENSE', payload:expense.id});
      dispatch({type:'SET_LAST_DELETED', payload:expense});
      toast.info('Deleted. Click here to undo',{onClick:async()=> {
        const id=await db.expenses.add(expense);
        dispatch({type:'ADD_EXPENSE', payload:{...expense, id}});
        dispatch({type:'SET_LAST_DELETED', payload:null});
      }});
    }catch(err){ console.error(err); toast.error('Failed to delete'); }
  };

  const handleChange=e=> setForm({...form,[e.target.name]:e.target.value});

  if(isEditing){
    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow space-y-3">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium mb-1">Amount (₹)</label>
            <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} className="input"/>
            {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="input">
              <option value="">Select...</option>
              {categories.map(c=> <option key={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium mb-1">Description</label>
            <input name="description" value={form.description} maxLength={120} onChange={handleChange} className="input"/>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} className="input"/>
          </div>
        </div>
        <div className="flex gap-2 justify-end" onKeyDown={(e)=>{if(e.key==='Enter'){save();} if(e.key==='Escape'){setIsEditing(false);}}}>
          <button className="btn-primary inline-flex items-center gap-1" onClick={save}><FiSave/> Save</button>
          <button className="input inline-flex items-center gap-1" onClick={()=> setIsEditing(false)}><FiX/> Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow flex flex-wrap items-start gap-4">
      <div className="flex-1">
        <p className="font-medium">₹{expense.amount.toFixed(2)} <span className="text-xs text-slate-500">({expense.category})</span></p>
        {expense.description && <p className="text-sm text-slate-500">{expense.description}</p>}
      </div>
      <p className="text-xs text-slate-500 w-28 sm:w-32">{new Date(expense.date).toLocaleDateString()}</p>
      <div className="flex gap-2">
        <button className="input inline-flex items-center gap-1" onClick={()=> setIsEditing(true)}><FiEdit2/> Edit</button>
        <button className="input inline-flex items-center gap-1 text-red-600" onClick={remove}><FiTrash2/> Delete</button>
      </div>
    </div>
  );
}
