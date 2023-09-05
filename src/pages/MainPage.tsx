import Calendar from "../modules/calendar/Calendar";
import { useState } from "react";

const MainPage = (): JSX.Element => {
  const [selectedDate, selectDate] = useState(new Date());
  return (
    <div className='w-full h-[100vh] flex-col items-center flex justify-start'>
      <h1 className='nunito text-[32px] mt-[50px]'>Календарь</h1>
      <Calendar selectDate={selectDate} selectedDate={selectedDate} />
    </div>
  );
};

export default MainPage;
