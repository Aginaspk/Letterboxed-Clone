import React from 'react'

import { IoMdHeart, IoMdStar } from 'react-icons/io'
import { IoCalendarClearSharp, IoEyeSharp, IoGridSharp, IoMenuSharp } from 'react-icons/io5'

function Guide() {
  return (
    <div className='w-full grid grid-cols-3 gap-2 mb-[10px] pb-10 '>
        <div className='flex relative shadow-[inset_0_1px_0_hsla(0,0%,100%,0.1)] bg-[#445566]  hover:bg-[#00C030] text-[#DDEEFF] text-[13px] graReg px-5 py-4.5 rounded-sm justify-center items-center'>
            <IoEyeSharp size={45} className=' absolute left-5 top-5'/>
            <h1 className='ml-[65px] pt-[5px]'>Keep track of every film you’ve ever watched (or just start from the day you join)</h1>
        </div>
        <div className='flex relative shadow-[inset_0_1px_0_hsla(0,0%,100%,0.1)] bg-[#445566]  hover:bg-[#EE7000] text-[#DDEEFF] text-[13px] graReg px-5 py-4.5 rounded-sm justify-center items-center'>
            <IoMdHeart size={45} className=' absolute left-5 top-6'/>
            <h1 className='ml-[65px] pt-[5px]'>Show some love for your favorite films, lists and reviews with a “like”</h1>
        </div>
        <div className='flex relative shadow-[inset_0_1px_0_hsla(0,0%,100%,0.1)] bg-[#445566]  hover:bg-[#209CE4] text-[#DDEEFF] text-[13px] graReg px-5 py-4.5 rounded-sm justify-center items-center'>
            <IoMenuSharp size={45} className=' absolute left-5 top-5'/>
            <h1 className='ml-[65px] pt-[5px]'>Write and share reviews, and follow friends and other members to read theirs</h1>
        </div>
        <div className='flex relative shadow-[inset_0_1px_0_hsla(0,0%,100%,0.1)] bg-[#445566]  hover:bg-[#00C030] text-[#DDEEFF] text-[13px] graReg px-5 py-4.5 rounded-sm justify-center items-center'>
            <IoMdStar size={50} className=' absolute left-4 top-5'/>
            <h1 className='ml-[65px] pt-[5px]'>Rate each film on a five-star scale (with halves) to record and share your reaction</h1>
        </div>
        <div className='flex relative shadow-[inset_0_1px_0_hsla(0,0%,100%,0.1)] bg-[#445566]  hover:bg-[#EE7000] text-[#DDEEFF] text-[13px] graReg px-5 py-4.5 rounded-sm justify-center items-center'>
            <IoCalendarClearSharp size={40} className=' absolute left-5 top-6'/>
            <h1 className='ml-[65px] pt-[5px]'>Keep a diary of your film watching (and upgrade to <strong>Pro</strong> for comprehensive stats)</h1>
        </div>
        <div className='flex relative shadow-[inset_0_1px_0_hsla(0,0%,100%,0.1)] bg-[#445566]  text-[#DDEEFF] hover:bg-[#209CE4] text-[13px] graReg px-5 py-4.5 rounded-sm justify-center items-center'>
            <IoGridSharp size={40} className=' absolute left-5 top-6'/>
            <h1 className='ml-[65px] pt-[5px]'>Compile and share lists of films on any topic and keep a watchlist of films to see</h1>
        </div>

    </div>
  )
}

export default Guide