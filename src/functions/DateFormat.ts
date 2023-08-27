import { NewDate } from "./NewDate";

export const formatDate = (date: Date, format: string) => {
  const d = NewDate({ date });

  return format
    .replace(/\bYYYY\b/, d.year.toString())
    .replace(/\bYYY\b/, d.shortYear)
    .replace(/\bWW\b/, d.week.toString().padStart(2, '0'))
    .replace(/\bW\b/, d.week.toString())
    .replace(/\bDDDD\b/, d.day)
    .replace(/\bDDD\b/, d.shortDay)
    .replace(/\bDD\b/, d.numberOfDay.toString().padStart(2, '0'))
    .replace(/\bD\b/, d.numberOfDay.toString())
    .replace(/\bMMMM\b/, d.months)
    .replace(/\bMMM\b/, d.shortMonths)
    .replace(/\bMM\b/, d.numberOfMonths.toString().padStart(2, '0'))
    .replace(/\bM\b/, d.numberOfMonths.toString());
};