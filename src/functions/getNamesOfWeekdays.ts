import { NewDate } from "./NewDate";

export const getWeekDaysNames = (
  firstWeekDay: number = 4,
  locale: string = "default"
) => {
  const weekDaysNames: {
    day: ReturnType<typeof NewDate>["day"];
    shortDay: ReturnType<typeof NewDate>["shortDay"];
  }[] = Array.from({ length: 7 });

  const date = new Date();

  weekDaysNames.forEach((_, i) => {
    const { day, numberDayInWeek, shortDay } = NewDate({
      locale,
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i),
    });

    weekDaysNames[numberDayInWeek - 1] = { day, shortDay };
  });

  return [
    ...weekDaysNames.slice(firstWeekDay - 1),
    ...weekDaysNames.slice(0, firstWeekDay - 1),
  ];
};
