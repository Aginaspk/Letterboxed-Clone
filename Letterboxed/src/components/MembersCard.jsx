import React from 'react'
import { BsPlusCircleFill } from "react-icons/bs";

function MembersCard({ item }) {
    return (
        <div className='h-[60px] w-full border-b border-white/15 py-[10px] flex items-center justify-between px-1'>
            <div className='flex'>
                <div className='h-[40px] w-[40px] rounded-full overflow-hidden mr-2.5'>
                    <img className='h-full w-full' src={item?.profilePic ? item?.profilePic : "https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png"} alt="" />
                </div>
                <div className='pt-[2px]'>
                    <h2 className='gra text-[15px] font-bold tracking-wider'>{item?.userName}</h2>
                    <p className='text-[12px] text-[#667788]'>{item?.reviewCount} reviews</p>
                </div>
            </div>
            <div>
                <BsPlusCircleFill size={35} className='text-[#99AABB]' />
            </div>

        </div>
    )
}

export default MembersCard