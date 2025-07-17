import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { db } from '../db';
import { toast } from 'react-toastify';

const ExpenseContext = createContext();

const initialState = {
  expenses: [],
  filter: { categories: [], search:'', minAmount:'', maxAmount:'', startDate:'', endDate:'' },
  loading: false,
  lastDeleted: null
};

function reducer(state, action) {
  switch(action.type){
    case 'SET_EXPENSES': return {...state, expenses: action.payload};
    case 'ADD_EXPENSE': return {...state, expenses: [action.payload, ...state.expenses]};
    case 'UPDATE_EXPENSE': return {...state, expenses: state.expenses.map(e=> e.id===action.payload.id? action.payload: e)};
    case 'DELETE_EXPENSE': return {...state, expenses: state.expenses.filter(e=> e.id!==action.payload)};
    case 'SET_FILTER': return {...state, filter: action.payload};
    case 'SET_LOADING': return {...state, loading: action.payload};
    case 'SET_LAST_DELETED': return {...state, lastDeleted: action.payload};
    default: return state;
  }
}

export function ExpenseProvider({children}){
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=> {
    const load = async ()=>{
      dispatch({type:'SET_LOADING', payload:true});
      try{
        const data = await db.expenses.toArray();
        dispatch({type:'SET_EXPENSES', payload: data.sort((a,b)=>b.date-a.date)});
      }catch(err){
        console.error(err);
        toast.error('Failed to load data');
      } finally {
        dispatch({type:'SET_LOADING', payload:false});
      }
    };
    load();
  },[]);

  return <ExpenseContext.Provider value={{state, dispatch}}>{children}</ExpenseContext.Provider>;
}

export function useExpenses(){ return useContext(ExpenseContext);}
