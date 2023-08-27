import { NewDate } from "./NewDate";

export const getNamesOfMonths = (locale: string = "ru") => {
  const monthsNames: {
    months: ReturnType<typeof NewDate>["months"];
    shortMonths: ReturnType<typeof NewDate>["shortMonths"];
    monthIndex: ReturnType<typeof NewDate>["monthIndex"];
    date: ReturnType<typeof NewDate>["date"];
  }[] = Array.from({ length: 12 });

  const d = new Date();

  monthsNames.forEach((_, i) => {
    const { months, monthIndex, shortMonths, date } = NewDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + i, d.getDate()),
    });
    monthsNames[monthIndex] = { months, monthIndex, shortMonths, date };
  });

  return monthsNames;
};
