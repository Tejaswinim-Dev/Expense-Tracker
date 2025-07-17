import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { db } from '../db';

const ExpenseContext = createContext();

const initialState = {
  expenses: [],
  filter: {
    category: 'All',
    search: '',
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [action.payload, ...state.expenses] };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((e) => (e.id === action.payload.id ? action.payload : e)),
      };
    case 'DELETE_EXPENSE':
      return { ...state, expenses: state.expenses.filter((e) => e.id !== action.payload) };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    db.expenses.toArray().then((data) =>
      dispatch({
        type: 'SET_EXPENSES',
        payload: data.sort((a, b) => b.date - a.date),
      }),
    );
  }, []);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}
