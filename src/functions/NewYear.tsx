import { NewDate } from "./NewDate";
import { NewMonth } from "./NewMonth";


interface NewYearProps{
    year?: number;
    locale?: string;
    monthNumber?: number;
}

export const NewYear = (params: NewYearProps) =>{
    const locale = params?.locale ?? 'ru'

    const count = 12
    const today = NewDate({locale: 'ru'})
    const year = params?.year ?? today.year
    const monthNumber = params?.monthNumber ?? today.numberOfMonths
    const month = NewMonth({date: new Date(year, monthNumber - 1), locale})
    const getMonthDays = (monthIndex: number) =>{
        return NewMonth({date: new Date(year, monthIndex), locale}).createMonthDays();
    }

    const createYearMonths = () =>{
        const months = []
        for(let i = 0; i < count - 1; i += 1){
            months[i] = getMonthDays(i)
        }
        return months
    }

    return {
        createYearMonths, month, year, 
    }
}