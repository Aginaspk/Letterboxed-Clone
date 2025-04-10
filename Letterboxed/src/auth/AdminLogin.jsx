import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAdmin } from './authSlice'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [adminInput, setAdminInput] = useState({
        userName: "",
        password: ""
    })

    const loginAdminHandle = async (e) => {
        e.preventDefault()
        console.log(adminInput)
        try {
            const res = await dispatch(loginAdmin(adminInput)).unwrap();
            navigate('/admin-home',{ replace: true })
        } catch (error) {
            alert(error)
            
        }
    }
    return (
        <div className='w-full flex flex-col items-center py-[30px]'>
            <h1 className='text-[#AABBCC] text-[26px] mb-[12px]'>Admin Login</h1>
            <p className='gra text-[#AABBCC] mb-[12px] tracking-wider'>WELOCME BACK ADMIN</p>
            <form onSubmit={loginAdminHandle} className='w-[360px] px-5 pt-5 pb-[25px] flex flex-col items-start border border-[#32373C] rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.25)]' action="">
                <div className='flex flex-col mb-5 w-full'>
                    <label className='text-[13px] text-white mb-[5px] graReg' htmlFor="">Username</label>
                    <input onChange={(e) => setAdminInput({ ...adminInput, [e.target.name]: e.target.value })} className='bg-[#2C3440] focus:bg-white focus:text-black h-[37px] shadow-[inset_0_-1px_#456] p-2.5 w-full rounded-sm'
                        type="text"
                        name="userName"
                        id="userName" />
                </div>
                <div className='flex flex-col mb-5 w-full'>
                    <label className='text-[13px] text-white mb-[5px] graReg' htmlFor="">Password</label>
                    <input onChange={(e) => setAdminInput({ ...adminInput, [e.target.name]: e.target.value })} className='bg-[#2C3440] focus:bg-white focus:text-black h-[37px] shadow-[inset_0_-1px_#456] p-2.5 w-full rounded-sm'
                        type="password"
                        name="password"
                        id="password" />
                </div>
                <div className='w-full flex justify-end pt-2.5'>
                    <button type='submit' className='px-[12px] pt-[9px] pb-[8px] text-[12px] rounded-sm font-semibold py-[6px] bg-[#00ac1c] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra' >Login</button>

                </div>
            </form>
        </div>
    )
}

export default AdminLogin