import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
const MainPage = (): JSX.Element => {
  const navigate = useNavigate();
  const routeToPanel = () => {
    navigate("/panel");
  };
  const routeToCalendar = () => {
    navigate("/calendar");
  };

  return (
    <div className='fullscreen center flex-col'>
      <div className='center h-[150px] flex-col !justify-between'>
        <Button onClick={routeToPanel}>Админ панель</Button>
        <Button onClick={routeToCalendar}>Календарь для записи</Button>
      </div>
    </div>
  );
};

export default MainPage;
