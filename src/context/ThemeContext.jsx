import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [mode, setMode] = useState(() => localStorage.getItem('theme') ?? (prefersDark ? 'dark':'light'));

  useEffect(()=> {
    const root = document.documentElement;
    mode === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem('theme', mode);
  },[mode]);

  return <ThemeContext.Provider value={{mode, toggle:()=> setMode(m=>m==='dark'?'light':'dark')}}>{children}</ThemeContext.Provider>;
}
export function useTheme(){ return useContext(ThemeContext);}
