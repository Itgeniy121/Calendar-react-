import React from "react";
import { NewDate } from "../../../functions/NewDate";
import { NewMonth } from "../../../functions/NewMonth";
import { getNamesOfMonths } from "../../../functions/getNamesOfMonths";
import { getWeekDaysNames } from "../../../functions/getNamesOfWeekdays";
import { getMonthNumberOfDays } from "../../../functions/getMonthNumberOfDays";
interface useCalendarProps {
  locale?: string;
  selectedDate: Date;
  firstDay: number;
}

export const useCalendar = ({
  firstDay = 2,
  locale = "ru",
  selectedDate: date,
}: useCalendarProps) => {
  const [mode, setMode] = React.useState<"days" | "months" | "years">("days");
  const [selectedDay, setSelectedDay] = React.useState(NewDate({ date }));
  const [selectedMonth, setSelectedMonth] = React.useState(
    NewMonth({
      date: new Date(selectedDay.year, selectedDay.monthIndex),
      locale,
    })
  );
  const getIntrvalForYears = (year: number) => {
    const startYear = Math.floor(year / 10) * 10;
    return [...Array(10)].map((_, index) => startYear + index);
  };

  const daysInWeek = 7;
  const [selectedYear, setSelectedYear] = React.useState(selectedDay.year);
  const [selectedYearsInterval, setSelectedYearsInterval] = React.useState(
    getIntrvalForYears(selectedDay.year)
  );
  const monthsNames = React.useMemo(() => getNamesOfMonths(locale), []);
  const weekDaysNames = React.useMemo(
    () => getWeekDaysNames(firstDay, locale),
    []
  );
  const days = React.useMemo(
    () => selectedMonth.createMonthDays(),
    [selectedMonth, selectedYear]
  );

  const calendarDays = React.useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(
      selectedMonth.monthIndex,
      selectedYear
    );

    const prevMonthDays = NewMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();
    const nextMonthDays = NewMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();
    const firstWeekDay = days[0];
    const lastDay = days[monthNumberOfDays - 1];
    const shiftDay = firstDay - 1;

    const numberOfPrevDays =
      firstWeekDay.numberDayInWeek - 1 - shiftDay < 0
        ? 7 - (firstDay - firstWeekDay.numberDayInWeek)
        : firstWeekDay.numberDayInWeek - 1 - shiftDay;

    const numberOfNextDays =
      daysInWeek - lastDay.numberDayInWeek + shiftDay > 6
        ? daysInWeek - lastDay.numberDayInWeek - (daysInWeek - shiftDay)
        : daysInWeek - lastDay.numberDayInWeek + shiftDay;

    const totalDaysInCalendar =
      days.length + numberOfNextDays + numberOfPrevDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }
    for (
      let i = numberOfPrevDays;
      i < totalDaysInCalendar - numberOfNextDays;
      i += 1
    ) {
      result[i] = days[i - numberOfPrevDays];
    }
    for (
      let i = totalDaysInCalendar - numberOfNextDays;
      i < totalDaysInCalendar;
      i += 1
    ) {
      result[i] = nextMonthDays[i - totalDaysInCalendar + numberOfNextDays];
    }
    return result;
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

  const onClickArrow = (direction: "right" | "left") => {
    if (mode === "years" && direction === "left") {
      return setSelectedYearsInterval(
        getIntrvalForYears(selectedYearsInterval[0] - 10)
      );
    }

    if (mode === "years" && direction === "right") {
      return setSelectedYearsInterval(
        getIntrvalForYears(selectedYearsInterval[0] + 10)
      );
    }

    if (mode === "months" && direction === "left") {
      const year = selectedYear - 1;
      if (!selectedYearsInterval.includes(year))
        setSelectedYearsInterval(getIntrvalForYears(year));
      return setSelectedYear(selectedYear - 1);
    }

    if (mode === "months" && direction === "right") {
      const year = selectedYear + 1;
      if (!selectedYearsInterval.includes(year))
        setSelectedYearsInterval(getIntrvalForYears(year));
      return setSelectedYear(selectedYear + 1);
    }

    if (mode === "days") {
      const monthIndex =
        direction === "left"
          ? selectedMonth.monthIndex - 1
          : selectedMonth.monthIndex + 1;
      if (monthIndex === -1) {
        const year = selectedYear - 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year))
          setSelectedYearsInterval(getIntrvalForYears(year));
        return setSelectedMonth(
          NewMonth({ date: new Date(selectedYear - 1, 11), locale })
        );
      }

      if (monthIndex === 12) {
        const year = selectedYear + 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year))
          setSelectedYearsInterval(getIntrvalForYears(year));
        return setSelectedMonth(NewMonth({ date: new Date(year, 0), locale }));
      }

      setSelectedMonth(
        NewMonth({ date: new Date(selectedYear, monthIndex), locale })
      );
    }
  };

  return {
    state: {
      mode,
      calendarDays,
      weekDaysNames,
      monthsNames,
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedYearsInterval,
    },
    functions: {
      setMode,
      onClickArrow,
      setSelectedDay,
    },
  };
};
