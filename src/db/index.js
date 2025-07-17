import Dexie from 'dexie';
export const db = new Dexie('expense_tracker');
db.version(1).stores({
  expenses: '++id, amount, category, description, date, createdAt'
});
