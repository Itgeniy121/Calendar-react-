import { NewDate } from "./NewDate";
import { getMonthNumberOfDays } from "./getMonthNumberOfDays";

interface NewMonthProps{
    date?: Date;
    locale?: string;
}

export const NewMonth = (params?: NewMonthProps) =>{
    const date = params?.date ?? new Date()
    const locale = params?.locale ?? 'ru'

    const d = NewDate({date, locale})
    const{months: monthName, year, numberOfMonths, monthIndex} = d

    const getDate = (dayNumber: number) =>{
        return NewDate({date: new Date(year, monthIndex, dayNumber), locale})
    }
    const createMonthDays = () =>{
        const days = []

        for(let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i += 1){
            days[i] = getDate(i + 1)
        }
        return days;
    }
    return{getDate, monthIndex, monthName, year, createMonthDays, numberOfMonths }

}