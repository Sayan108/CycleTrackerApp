// src/hooks/useReproductiveTracker/dateUtils.ts

export const addDays = (d: Date, days: number) => {
  const n = new Date(d);
  n.setDate(n.getDate() + days);
  return n;
};

export const diffDays = (a: Date, b: Date) =>
  Math.floor((b.getTime() - a.getTime()) / 86400000);

export const isBetween = (d: Date, start: Date, end: Date) =>
  d >= start && d <= end;
