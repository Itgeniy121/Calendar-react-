import { weekNumber } from "./getWeek";

interface NewDateProps {
  date?: Date;
  locale?: string;
}

export const NewDate = (params: NewDateProps) => {
  const locale = params.locale ?? "ru";

  const date = params.date ?? new Date();
  const timestamp = date.getTime();
  const numberOfDay = date.getDate();
  const day = date.toLocaleDateString(locale, { weekday: "long" });
  const numberDayInWeek = date.getDay() + 1;
  const shortDay = date.toLocaleDateString(locale, { weekday: "short" });
  const year = date.getFullYear();
  const shortYear = date.toLocaleDateString(locale, { year: "2-digit" });
  const months = date.toLocaleDateString(locale, { month: "long" });
  const shortMonths = date.toLocaleDateString(locale, { month: "short" });
  const numberOfMonths = date.getMonth() + 1;
  const monthIndex = date.getMonth();
  const week = weekNumber(date)
  return{date, timestamp, numberOfDay, day, numberDayInWeek, shortDay, year, shortYear, months, shortMonths, numberOfMonths, monthIndex, week}
};
