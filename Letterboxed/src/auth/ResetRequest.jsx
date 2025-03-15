import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendResetEmail } from './authSlice';
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function ResetRequest() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [email, setEmail] = useState({ email: "" });
    const [isSend, setIsSend] = useState(false)
    const { loading } = useSelector(state => state.auth)


    const getEmail = (e) => {
        setEmail({ email: e.target.value })
        console.log(email)
    }
    const handleResetEmail = async () => {
        try {
            const res = await dispatch(sendResetEmail(email)).unwrap();
            alert("password chnaged successfully")
            navigate('/')
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className='w-[430px]  flex flex-col items-center bg-[#445566] rounded-lg'>
            <div className='w-full flex flex-col items-center px-10 pt-10'>
                <img className='w-[60px]' src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1741941122/icons8-letterboxd-100_nrn3iv.png" alt="" />
                <h1 className='gra text-white text-[20px] mt-[2px] font-black'>Reset Password</h1>
            </div>
            {!isSend ? <><div className='w-full px-10'>
                <p className='text-[13px] tracking-wide text-center text-[#AABBCC] mt-3 gra'>Enter your email below, and we’ll send you a message with your username and a link to reset your password.</p>
            </div>
                <div className='w-full py-10 flex flex-col gap-1 px-10'>
                    <p className='text-[13px] tracking-wide text-[#AABBCC] gra'>Email address</p>
                    <input className='w-full h-[36px] px-3 py-1.5 bg-[#CCDDEE] rounded-[2px] focus:bg-white focus:text-[#567]' onChange={getEmail} type="text" name="" id="" />
                </div>
                <div className='bg-[#00ac1c] px-10 rounded-b-lg hover:bg-[#009D1A] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] w-full text-center text-[14px] gra tracking-wider py-[18px] font-bold'
                    onClick={handleResetEmail}>
                    {loading ? "Loading..." : "SEND REQUEST"}
                </div></> :
                <div className='w-full'>
                    <div className='w-full pb-10 pt-5 px-10 flex flex-col items-center'>
                        <IoCheckmarkCircleSharp size={40} className='text-[#AABBCC]' />
                        <p className='text-[13px] tracking-wide text-center text-[#CCDDEE] mt-3 gra'>If the provided address belongs to an account, you will receive a link to reset your password.</p>
                    </div>
                    <div className='border-t hover:bg-[#334455] border-[#AABBCC]/5 px-10 rounded-b-lg text-[#CCDDEE] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] w-full text-center text-[14px] gra tracking-wider py-[15px] font-medium' 
                    onClick={()=>navigate('/')}>
                        Sign In
                    </div>
                </div>}
        </div>
    )
}

export default ResetRequest