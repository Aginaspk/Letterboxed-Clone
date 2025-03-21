import React from 'react'
import { IoMdEye, IoMdHeart } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { PiSquaresFourFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

function PopMovieCard({ filim }) {
    const navigate = useNavigate();
    const { isAuth, user } = useSelector(state => state.auth)

    return (
        <div className='' onClick={()=>navigate(`/filims/${filim?._id}`)}>
            <div className={`h-[345px] w-[230px] shadow-[inset_0_0_1px_1px_rgba(20,24,28,0.25)] relative `}>
                <img className='h-full  rounded-md border border-white/15 ' src={filim?.smallPoster} alt="" />
                <div className={`w-full h-full top-0 absolute  hover:border-[3px] ${isAuth ? "hover:border-white" : "hover:border-[#00E054]"} rounded-sm z-50`}></div>

            </div>
            <div className='flex w-full justify-center gap-2 pt-2 pb-[5px]'>
                <div className='flex items-center gap-[2px]'>
                    <IoMdEye size={16} className='text-[#00C030] mb-[2px] ' />
                    <h1 className='gra text-[#667788] gra text-[12px]'>{filim?.likeCount}</h1>

                </div>
                <div className='flex items-center gap-[2px]'>
                    <PiSquaresFourFill size={15} className='text-[#40BCF4] mb-[2px]' />
                    <h1 className='gra text-[#667788] gra text-[12px]'>00</h1>

                </div>
                <div className='flex items-center gap-[2px]'>
                    <IoMdHeart size={14} className='text-[#FF9010] mb-[1px]' />
                    <h1 className='gra text-[#667788] gra text-[12px]'>{filim?.viewCount}</h1>
                </div>
            </div>
        </div>
    )
}

export default PopMovieCard