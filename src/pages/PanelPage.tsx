import Header from "../components/Header";
import { FC } from "react";

interface panelProps {
  task: string;
}
const PanelPage: FC<panelProps> = ({ task }) => {
  return (
    <div className='w-full h-[100vh] flex-col items-center flex justify-start'>
      <Header />
      <div className='w-[300px] h-[500px] mt-[40px] flex flex-col justify-start items-center'>
        <h1 className='nunito2'>Активные записи</h1>
        <p className='mt-[30px]'>{task}</p>
      </div>
    </div>
  );
};

export default PanelPage;
