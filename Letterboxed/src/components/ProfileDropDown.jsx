import React from 'react'
import { LuUserRound } from 'react-icons/lu'
import { MdKeyboardArrowDown } from 'react-icons/md'

function ProfileDropDown({user}) {
    return (
        <div>
            <div className='flex items-center gap-[1px]'>
                <div className='w-[24px] h-[24px] flex items-center rounded-full overflow-hidden border border-[#99AABB] shadow-[0_0_2px_rgba(0,0,0,0.2)] mr-2'>
                    <img className='object-cover' src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" alt="" />
                </div>
                <p className='text-[13px] tracking-widest font-[795] h-4 text-[#99AABB] hover:text-white cursor-pointer uppercase gra'>{user.userName}</p>
                <MdKeyboardArrowDown size={20}/>
            </div>
        </div>
    )
}

export default ProfileDropDown