"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext<any>(null);

export const AppWrapper = ({children} : {children: React.ReactNode}) => {
  const [chat, setChat] = useState<Object[]>([]);
  const [date, setDate] = useState<Object>({start : "", end : ""});

  useEffect(() => {});

  return (
    <AppContext.Provider value={{chat, setChat, date, setDate}}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
};