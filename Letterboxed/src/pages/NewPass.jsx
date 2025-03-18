import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNewPassword } from '../auth/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function NewPass() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState({
        password: "",
        confirmPassword: ""
    })

    const getPass = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    const handleNewPass = async (e) => {
        e.preventDefault();
        try {
            const res = await dispatch(setNewPassword({password,token})).unwrap();
            toast.success("password changed successfully")
            navigate('/');
        } catch (error) {
            toast.success(error)
        }

    }
    return (
        <div className='w-full flex flex-col items-center py-[30px]'>
            <h1 className='text-[#AABBCC] text-[26px] mb-[12px]'>Reset Password</h1>
            <p className='gra text-[#AABBCC] mb-[12px] tracking-wider'>Reset the Letterboxd password for ‘dryad2op’…</p>
            <form onSubmit={handleNewPass} className='w-[360px] px-5 pt-5 pb-[25px] flex flex-col items-start border border-[#32373C] rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.25)]' action="">
                <div className='flex flex-col mb-5 w-full'>
                    <label className='text-[13px] text-white mb-[5px] gra' htmlFor="">New Password</label>
                    <input className='bg-[#2C3440] focus:bg-white focus:text-black h-[37px] shadow-[inset_0_-1px_#456] p-2.5 w-full rounded-sm'
                        type="password"
                        name="password"
                        id="password"
                        onChange={getPass} />
                </div>
                <div className='flex flex-col mb-5 w-full'>
                    <label className='text-[13px] text-white mb-[5px] gra' htmlFor="">Confirn Password</label>
                    <input className='bg-[#2C3440] focus:bg-white focus:text-black h-[37px] shadow-[inset_0_-1px_#456] p-2.5 w-full rounded-sm'
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={getPass} />
                </div>
                <div className='w-full flex justify-end pt-2.5'>
                    <button type='submit' className='px-[12px] pt-[9px] pb-[8px] text-[12px] rounded-sm font-semibold py-[6px] bg-[#00ac1c] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra' >RESET PASSWORD</button>

                </div>
            </form>
        </div>
    )
}

export default NewPass