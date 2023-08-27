import { FC } from "react";
import leftArrow from "../static/leftArrow.png"
import Button from "./UI/Button";
import { useNavigate } from "react-router-dom";
interface HeaderProps{
    selectedDate?: Date;
}

const Header: FC<HeaderProps> = () => {
    const navigate = useNavigate()
    const routeToPanel = () =>{
        navigate('/panel')
    }
    const routeToMain = () =>{
        navigate('/')
    }
  return (
    <div className="w-full h-[80px] bg-[#739985] flex justify-between flex-row items-center px-[30px]">
        <div className="flex flex-row items-center justify-between h-full w-[150px]">
            <img src={leftArrow} alt="arrow" className="w-[40px] h-[40px] cursor-pointer" onClick={routeToMain}/>
        </div>
        <div>
            <Button onClick={routeToPanel}><p className="nunito text-[#FFFFFF]">Админ панель</p></Button>
        </div>
    </div>
  )
};

export default Header;
