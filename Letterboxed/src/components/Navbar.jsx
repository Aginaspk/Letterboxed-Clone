import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNavHover } from '../redux/globalSlices';
import Login from '../auth/Login';

function Navbar() {
  const dispatch = useDispatch();
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const closeLogin = () =>{
    setIsLoginOpen(false)
  }

  return (
    <div className='xl:h-[72px] h-[50px] w-full flex justify-center xl:bg-transparent bg-[#14181C] absolute top-0 nav z-50' onMouseEnter={() => dispatch(setNavHover(true))} onMouseLeave={() => dispatch(setNavHover(false))}>
      <div className='flex xl:gap-8 items-center '>
        <div className="w-[250px] h-[32px] flex items-center">
          <img className='w-full h-full object-cover' src="https://a.ltrbxd.com/logos/letterboxd-logo-h-neg-rgb.svg" alt="" />
        </div>

        <div className='gra list-none xl:flex items-center xl:gap-5 hidden text-[#D8E0E8] pt-[2px]'>
          {isLoginOpen ? <Login closeLogin={closeLogin}/> : (
            <>
              <li className='text-[13px] tracking-widest font-[795] h-4 hover:text-white cursor-pointer' onClick={()=>setIsLoginOpen(true)}>SIGN IN</li>
              <li className='text-[13px] tracking-widest font-[795] h-4 hover:text-white cursor-pointer'>CREATE ACCOUNT</li>
              <li className='text-[13px] tracking-widest font-[795] h-4 hover:text-white cursor-pointer'>FILIMS</li>
              <li className='text-[13px] tracking-widest font-[795] h-4 hover:text-white cursor-pointer'>LISTS</li>
              <li className='text-[13px] tracking-widest font-[795] h-4 hover:text-white cursor-pointer'>MEMBERS</li>
              <li className='text-[13px] tracking-widest font-[795] h-4 hover:text-white cursor-pointer'>JOURNAL</li>
              <li className='flex items-center mt-1'><input className='bg-[#BFC1C2]/30 w-[140px] h-[30px] rounded-3xl' type="text" /></li>
            </>
          )}


        </div>
      </div>
    </div>
  )
}

export default Navbar