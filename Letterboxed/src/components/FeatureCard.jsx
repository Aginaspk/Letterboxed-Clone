import React, { useState } from 'react'
import { IoMdEye, IoMdHeart } from 'react-icons/io'
import { useSelector } from 'react-redux'


function FeatureCard({item}) {
    const [isHover, setIsHover] = useState(false)
    const { isAuth, user } = useSelector(state => state.auth)

    return (
        <div className='rounded-sm shadow-[inset_0_0_1px_1px_rgba(20,24,28,0.125)] relative flex justify-center items-center cursor-pointer' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <img className='h-full w-full rounded-sm' src={item?.smallPoster} alt="" />
            <div className={`w-full h-full absolute  hover:border-[3px] ${isAuth ? "hover:border-white" : "hover:border-[#00E054]"} rounded-sm z-50`}></div>
            {isHover && !isAuth &&
                <div className='absolute z-40 bg-black/70 p-8 rounded-[2px]' >
                    <div className='flex flex-col items-center'>
                        <IoMdEye size={40} className='text-[#00C030] ' />
                        <h1 className='gra text-white text-2xl'>00.00</h1>

                    </div>
                    <div className='flex flex-col items-center'>
                        <IoMdHeart size={38} className='text-[#FF9010] ' />
                        <h1 className='gra text-white text-2xl'>00.00</h1>
                    </div>
                </div>}
        </div>
    )
}

export default FeatureCard