import React, { useState } from 'react'
import { LuX } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { registerUser } from './authSlice'

function Register({ isOpen, onClose }) {
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState({
        userName: "",
        email: "",
        password: ""
    })

    const getUserInfo = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await dispatch(registerUser(userInfo)).unwrap();
            alert("success")
            onClose();
        } catch (error) {
            alert(error)
        }
    }


    return (
        <dialog open={isOpen} id="my_modal_3" className="modal bg-black/80">
            <div className=" bg-[#445566] relative rounded-sm">
                <form method="dialog">
                    <button className="absolute right-3 top-5" onClick={onClose}><LuX className='text-[#99AABB] hover:text-white' size={30} /></button>
                </form>
                <div className='w-[420px] px-[36px] py-[25px]'>
                    <h1 className='text-[#99AABB] mb-5 text-[15px] gra'>JOIN LETTERBOXD</h1>
                    <form action=""  onSubmit={handleRegister}>
                        <div className='w-full mb-[15px]'>
                            <h1 className='mb-[5px] text-[12px] antialiased tracking-wider font-[600]'>Email address</h1>
                            <input className='w-full px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#CCDDEE] h-[35px]'
                                type="text"
                                name="email"
                                id=""
                                onChange={getUserInfo} />
                        </div>
                        <div className='w-full mb-[15px]'>
                            <h1 className='mb-[5px] text-[12px] antialiased tracking-wider font-[600]'>Username</h1>
                            <input className='px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#CCDDEE] h-[35px]'
                                type="text"
                                name="userName"
                                id=""
                                onChange={getUserInfo} />
                        </div>
                        <div className='w-full mb-[15px]'>
                            <h1 className='mb-[5px] text-[12px] antialiased tracking-wider font-[600]'>Password</h1>
                            <input className='px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#CCDDEE] h-[35px]'
                                type="password"
                                name='password'
                                onChange={getUserInfo} />
                        </div>
                        <div className='flex w-full relative mb-[15px]'>
                            <input type="checkbox" className=" absolute checkbox rounded-[2px] w-5 h-5 bg-[#cde] checked:bg-[#cde] checked:text-[#567] " />
                            <p className='text-sm gra pl-[30px] mb-[5px] text-[#BBCCDD]'>I’m at least 16 years old and accept the Terms and Use</p>
                        </div>
                        <div className='flex w-full relative mb-[15px]'>
                            <input type="checkbox" className="absolute checkbox rounded-[2px] w-5 h-5 bg-[#cde] checked:bg-[#cde] checked:text-[#567] " />
                            <p className='text-sm gra pl-[30px] mb-[5px] text-[#BBCCDD]'>I accept the Privacy Policy  and consent to the processing of my personal information in accordance with it.</p>
                        </div>
                        <div className='w-full'>
                            <button type='submit'
                                className='px-[12px] tracking-widest text-[13px] rounded-sm font-semibold py-[6px] bg-[#00ac1c] hover:bg-[#009D1A] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra'>SIGN UP</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default Register