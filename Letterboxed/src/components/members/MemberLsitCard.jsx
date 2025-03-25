import React from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'

function MemberLsitCard({item}) {
    return (
        <div className='w-full border-b border-white/15 py-[10px] flex justify-between'>
            <div className='flex items-center gap-2'>
                <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                    <img className='w-full h-full' src={item?.profilePic ? item?.profilePic : "https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png"} alt="" />
                </div>
                <div className='gra text-[15px] font-bold tracking-wider'>{item?.userName}</div>

            </div>
            <div>
                <BsPlusCircleFill size={35} className='text-[#99AABB]' />
            </div>
        </div>
    )
}

export default MemberLsitCard