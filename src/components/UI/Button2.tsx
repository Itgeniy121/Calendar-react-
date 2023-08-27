import {FC} from 'react'
interface ButtonProps{
  children: React.ReactNode
  onClick: () => void
}
const Button: FC<ButtonProps> = ({children, onClick}) => {
  return (
    <button className='px-[40px] py-[10px] bg-[#739985] rounded-[7px]' onClick={onClick}>{children}</button>
  )
};

export default Button;
