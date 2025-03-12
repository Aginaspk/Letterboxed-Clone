import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

function ProfileDropDown({user}) {
    return (
        <div className='w-[120px] relative'>
            <div className='flex w-full items-center gap-[1px] h-[30px]'>
                <div className='w-[24px] h-[24px] flex items-center rounded-full overflow-hidden border border-[#99AABB] shadow-[0_0_2px_rgba(0,0,0,0.2)] mr-2'>
                    <img className='object-cover' src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" alt="" />
                </div>
                <p className='text-[13px] tracking-widest font-[795] h-4 text-[#99AABB] hover:text-white cursor-pointer uppercase gra'>{user.userName}</p>
                <MdKeyboardArrowDown size={20}/>
            </div>
            <div className='w-full absolute bg-[#8899AA]'>
                <div className='w-full'>
                    <li className='border-t-[1px] border-transparent/10 pt-[5px] mt-[3px]'><p className='text-[#2C3440] px-[15px] py-[4px] text-[12px]'>Home</p></li>
                    <li className='border-t-[1px] border-transparent/10 pt-[5px] mt-[3px]'><p className='text-[#2C3440] px-[15px] py-[4px] text-[12px]'>Home</p></li>
                    <li className='border-t-[1px] border-transparent/10 pt-[5px] mt-[3px]'><p className='text-[#2C3440] px-[15px] py-[4px] text-[12px]'>Home</p></li>
                    <li className='border-t-[1px] border-transparent/10 pt-[5px] mt-[3px]'><p className='text-[#2C3440] px-[15px] py-[4px] text-[12px]'>Home</p></li>
                    <li className='border-t-[1px] border-transparent/10 pt-[5px] mt-[3px]'><p className='text-[#2C3440] px-[15px] py-[4px] text-[12px]'>Home</p></li>
                    <li className='border-t-[1px] border-transparent/10 pt-[5px] mt-[3px]'><p className='text-[#2C3440] px-[15px] py-[4px] text-[12px]'>Home</p></li>
                    <li className='border-t-[1px] border-transparent/10 pt-[5px] mt-[3px]'><p className='text-[#2C3440] px-[15px] py-[4px] text-[12px]'>Home</p></li>
                    <li className='border-t-[1px] border-transparent/10 pt-[5px] mt-[3px]'><p className='text-[#2C3440] px-[15px] py-[4px] text-[12px]'>Home</p></li>
                    <li className='border-t-[1px] border-transparent/10 pt-[5px] mt-[3px]'><p className='text-[#2C3440] px-[15px] py-[4px] text-[12px]'>Home</p></li>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default ProfileDropDown