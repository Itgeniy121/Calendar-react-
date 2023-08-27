import { FC,useState } from "react";
import { useCalendar } from "./hooks/useCalendar";
import left from "../../static/left.png";
import right from "../../static/right.png";
import { checkIsToday } from "../../functions/checkDate";
import { checkDateIsEqual } from "../../functions/checkEqual";
import Button2 from "../../components/UI/Button2";
import toast from "react-hot-toast";
interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstDay?: number;
  sendTask: (value: string) => void;
}
const Calendar: FC<CalendarProps> = ({
  locale = "ru",
  selectedDate,
  selectDate,
  firstDay = 2,
  sendTask,
}) => {
  const [currentDay, setCurrentDay] = useState<string>("");
  const createTask = () => {
    if (currentDay === "") {
      toast.error("Сначала выберите дату");
    } else {
      sendTask(currentDay);
      toast.success("Вы успешно записались на прием");
    }
  };

  const { state, functions } = useCalendar({ firstDay, selectedDate, locale });

  return (
    <div className='w-[450px] h-[300px] mt-[200px]'>
      <div className='flex flex-row justify-between items-center w-full h-[55px] bg-[#739985] rounded-t-[10px]'>
        <img
          src={left}
          alt='arrow'
          className='w-[40px] h-[40px] cursor-pointer'
          onClick={() => functions.onClickArrow("left")}
        />
        {state.mode === "days" && (
          <div>
            {state.monthsNames[state.selectedMonth.monthIndex].months}{" "}
            {state.selectedYear}
          </div>
        )}
        {state.mode === "months" && (
          <div
            className='cursor-pointer'
            onClick={() => functions.setMode("days")}
          >
            {state.selectedYear}
          </div>
        )}
        {state.mode === "years" && (
          <div
            className='cursor-pointer'
            onClick={() => functions.setMode("months")}
          >
            {state.selectedYearsInterval[0]}{" "}
            {state.selectedYearsInterval[state.selectedYear]}
          </div>
        )}
        <img
          src={right}
          alt='arrow'
          className='w-[40px] h-[40px] cursor-pointer'
          onClick={() => functions.onClickArrow("right")}
        />
      </div>
      <div className='bg-[#CFCFCF]'>
        {state.mode === "days" && (
          <>
            <div className='calendar__week__names'>
              {state.weekDaysNames.map(weekDaysName => (
                <div key={weekDaysName.shortDay}>{weekDaysName.shortDay}</div>
              ))}
            </div>
            <div className='calendar__days'>
              {state.calendarDays.map(day => {
                const isToday = checkIsToday(day.date);
                const isSelected = checkDateIsEqual(
                  day.date,
                  state.selectedDay.date
                );
                const isAdditionalDay =
                  day.monthIndex !== state.selectedMonth.monthIndex;
                return (
                  <div
                    onClick={() => {
                      functions.setSelectedDay(day);
                      selectDate(day.date);
                      setCurrentDay(day.date.toLocaleDateString());
                    }}
                    className={[
                      "day",
                      isToday ? "selectedDay" : "",
                      isSelected ? "selectedDay" : "",
                      isAdditionalDay ? "addtitionalDay" : "",
                    ].join(" ")}
                    key={`${day.numberOfDay}-${day.monthIndex}`}
                  >
                    {day.numberOfDay}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className='w-[450px] h-[80px] flex flex-col items-center justify-between mt-[20px]'>
        <p>{currentDay}</p>
        <Button2 onClick={createTask}>
          <p className='nunito text-[#FFFFFF]'>Записаться</p>
        </Button2>
      </div>
    </div>
  );
};

export default Calendar;
