import React, { useState } from 'react'
import { LuX } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { loginUser } from './authSlice';

function Login({ closeLogin }) {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  })

  const getUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser(userData)).unwrap();
      alert("suucess");
      closeLogin();
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div className='w-auto rounded-b-sm pr-5 pl-2 h-[72px] bg-[#14181C] flex gap-4 justify-center items-center xl:ml-28 '>
      <div className='pt-[18px] text-[#667788]'><LuX size={20} className='cursor-pointer' onClick={closeLogin} /></div>
      <form className='flex gap-4 justify-center items-center' action="" onSubmit={handleLogin}>
        <div>
          <h1 className='text-[12px] text-[#667788]'>Username</h1>
          <input className='w-[150px] h-[28px] bg-[#2C3440] focus:text-[#2C3440] focus:bg-white py-[5px] px-[5px] text-sm rounded-sm' type="text"
            name="userName"
            id=""
            onChange={getUserData} />
        </div>
        <div>
          <div className='flex justify-between'>
            <h1 className='text-[12px] text-[#667788]'>Password</h1>
            <h1 className='text-[11px] text-[#00e050] hover:text-white cursor-pointer tracking-wide'>Forgotten?</h1>
          </div>
          <input className='w-[150px] h-[28px] bg-[#2C3440] py-[5px] px-[5px] text-sm focus:text-[#2C3440] rounded-sm focus:bg-white' type="password"
            name="password"
            id=""
            onChange={getUserData} />
        </div>
        <div className='flex pt-3.5 gap-[5px] items-center'>
          <input type="checkbox" className='checkbox h-3.5 w-3.5 rounded-[2px] bg-[#2c3440] border-0 checked:bg-[#2c3440] checked:text-[#89a]' />
          <p className='text-[12px] text-[#667788] gra pt-[3px]'>Remember me</p>
        </div>
        <div className='pt-3'>
          <button type='submit' className='px-[12px] text-[12px] rounded-sm font-semibold py-[6px] bg-[#00ac1c] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra' >SIGN IN</button>
        </div>
      </form>
    </div>
  )
}

export default Login