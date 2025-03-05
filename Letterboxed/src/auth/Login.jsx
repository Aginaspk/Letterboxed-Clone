import React from 'react'
import { LuX } from 'react-icons/lu'

function Login({closeLogin}) {
  return (
    <div className='w-auto pr-5 pl-2 h-[72px] bg-[#14181C] flex gap-4 justify-center items-center xl:ml-28 '>
      <div className='pt-[18px] text-[#667788]'><LuX size={20} className='cursor-pointer' onClick={closeLogin}/></div>
      <div>
        <h1 className='text-[12px] text-[#667788]'>Username</h1>
        <input className='w-[150px] h-[28px] bg-[#2C3440] py-[5px] px-[5px] text-sm rounded-sm' type="text" name="name" id="" />
      </div>
      <div>
        <h1  className='text-[12px] text-[#667788]'>Password</h1>
        <input className='w-[150px] h-[28px] bg-[#2C3440] py-[5px] px-[5px] text-sm rounded-sm' type="password" name="password" id="" />
      </div>
      <div className='pt-3'>
        <button className='px-[12px] text-[12px] rounded-sm font-semibold py-[6px] bg-[#00ac1c] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra'>SIGN IN</button>
      </div>
    </div>
  )
}

export default Login