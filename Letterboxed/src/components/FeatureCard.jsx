import React, { useState } from 'react'
import { IoMdEye, IoMdHeart } from 'react-icons/io'


function FeatureCard({item}) {
    const [isHover, setIsHover] = useState(false)
    return (
        <div className='h-[225px] w-[150px] rounded-sm relative flex justify-center items-center cursor-pointer' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <img className='h-full w-full rounded-sm' src={item?.smallPoster} alt="" />
            {isHover &&
                <div className='absolute z-40 bg-black/70 px-6 py-6 rounded-sm' >
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