import Header from "../components/Header";
import Calendar from "../modules/calendar/Calendar";
import { useState } from "react";
import { FC } from "react";
interface pageProps {
  sendTask: (value: string) => void;
}
const CalendarPage: FC<pageProps> = ({ sendTask }) => {
  const [selectedDate, selectDate] = useState(new Date());
  const routeTask = (value: string) => {
    sendTask(value);
  };
  return (
    <div className='w-full h-[100vh] flex-col items-center flex justify-start'>
      <Header selectedDate={selectedDate} />
      <h1 className='nunito text-[32px] mt-[50px]'>Календарь для записи</h1>
      <Calendar
        sendTask={routeTask}
        selectDate={selectDate}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CalendarPage;
