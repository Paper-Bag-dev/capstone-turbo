"use client";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext<any>(null);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [chat, setChat] = useState<Object[]>([]);
  const [humidity, setHumidity] = useState(0);
  const [temp, setTemp] = useState(0);
  const [ppm, setPpm] = useState(0);
  const [date, setDate] = useState(() => {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    return {
      start: lastMonth.toISOString().split("T")[0],
      end: today.toISOString().split("T")[0],
    };
  });
  const { data: session, status } = useSession();

  return (
    <AppContext.Provider
      value={{ chat, setChat, date, setDate, session, status, humidity, setHumidity, temp, setTemp, ppm, setPpm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
