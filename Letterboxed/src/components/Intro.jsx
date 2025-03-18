import React from 'react'
import { useSelector } from 'react-redux'
import { FaAndroid, FaApple } from 'react-icons/fa'

function Intro() {
    const { isNavHover } = useSelector(state => state.globState)
    return (
        <div className='w-full flex flex-col items-center xl:relative xl:h-screen xl:mb-[64px]'>
            <div className='xl:w-[1200px] w-full xl:h-[600px] overflow-hidden relative'>
                <div className={`absolute hidden xl:block inset-x-0 top-0 ${isNavHover ? 'h-2/12' : 'h-1/12'} bg-gradient-to-b from-[#14181C] via-[#14181c80] to-transparent`}></div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 xl:h-1/3 bg-gradient-to-t from-[#14181C] via-[#14181c80] to-transparent"></div>
                <div className="absolute hidden xl:block inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#14181C] via-[#14181c80] to-transparent"></div>
                <div className="absolute hidden xl:block inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#14181C] via-[#14181c80] to-transparent"></div>
                <div className='xl:hidden flex justify-center w-full h-[32px] absolute  bottom-3 '>
                    <img className='h-full w-[250px] object-cover' src="https://a.ltrbxd.com/logos/letterboxd-logo-h-neg-rgb.svg" alt="" />
                </div>

                <img className='w-full h-full object-cover' src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1741239608/movie_glxp8k_ybwd3w.jpg" alt="Movie Image" />
            </div>
            <div className='text-white xl:absolute z-30 xl:bottom-7 flex flex-col items-center gap-10 '>
                <div className='intr hidden xl:flex flex-col items-center text-[20px] xl:text-[40px] xl:font-black xl:leading-10'>
                    <h1>Track films you’ve watched.</h1>
                    <h1>Save those you want to see.</h1>
                    <h1>Tell your friends what’s good.</h1>
                </div>
                <div className=' flex xl:hidden flex-col items-center text-[20px]'>
                    <h1>Track films you’ve watched.</h1>
                    <h1>Save those you want to see.</h1>
                    <h1>Tell your friends what’s good.</h1>
                </div>
                <button className='bg-[#00ac1c] gra px-6 h-[42px] rounded-sm text-[1.2rem] font-bold'>Get started — it‘s free!</button>
                <div className='flex flex-col xl:flex-row gap-2 items-center  text-[17px] text-[#778899] tracking-wide'>
                    <h1 className='gra'>The social network for film lovers.</h1>
                    <div className='flex gra gap-0.5 '>
                        <h1>Also available on</h1>
                        <FaApple size={20} className='mb-2' />
                        <FaAndroid size={20} className='mb-[2px]' />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Intro