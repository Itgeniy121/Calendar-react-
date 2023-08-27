import {FC} from 'react'
interface ButtonProps{
  children: React.ReactNode
  onClick: () => void
}
const Button: FC<ButtonProps> = ({children, onClick}) => {
  return (
    <button className='px-[60px] py-[15px] bg-[#75D6A1] rounded-[7px]' onClick={onClick}>{children}</button>
  )
};

export default Button;
