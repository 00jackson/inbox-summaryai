// lib/useSummaryHistory.ts

import { useEffect, useState } from "react";

export type SummaryEntry = {
  id: string;
  mode: "daily" | "weekly";
  createdAt: string;
  content: string;
};

const STORAGE_KEY = "inbox-summary-history";

export function useSummaryHistory() {
  const [history, setHistory] = useState<SummaryEntry[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      setHistory(JSON.parse(raw));
    }
  }, []);

  const saveSummary = (mode: "daily" | "weekly", content: string) => {
    const newEntry: SummaryEntry = {
      id: Date.now().toString(),
      mode,
      createdAt: new Date().toISOString(),
      content,
    };
    const updated = [newEntry, ...history].slice(0, 10); // keep last 10
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { history, saveSummary };
}