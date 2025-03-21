import React, { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../auth/authSlice';

function ProfileDropDown({ user }) {
    const dispatch = useDispatch();
    const [isHover, setIsHover] = useState(false)

    console.log(user)

    const signouUser = async () => {
        try {
            const res = await dispatch(logOutUser()).unwrap()
            alert("success")
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className={`${isHover && "bg-[#8899AA]"} relative px-1 rounded-t-sm mt-[1px] z-50`} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <div className='flex w-full items-center gap-[2px] py-1.5 px-3'>
                <div className='w-[24px] h-[24px] flex items-center rounded-full overflow-hidden border border-[#99AABB] shadow-[0_0_2px_rgba(0,0,0,0.2)] mr-2'>
                    <img className='object-cover' src={user?.pic ? user?.pic : "https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png"} alt="" />
                </div>
                <p className={`text-[13px] tracking-widest font-[795] h-4 text-[#99AABB] ${isHover && "text-white"} cursor-pointer uppercase gra`}>{user.userName}</p>
                <MdKeyboardArrowDown size={20} />
            </div>
            <div className={`w-full rounded-b-sm absolute left-0 bg-[#8899AA]  border-[#2C3440]/15 overflow-hidden ${isHover ? "h-auto  border-t" : "h-0"}`}>
                <div className='w-full py-1'>
                    <li className='border-t-[1px] border-transparent/10 tracking-wider hover:bg-[#667788] text-[#2C3440] hover:text-white gra hover:font-medium text-[12px] py-[5px]'><p className=' px-[15px]'>Home</p></li>
                    <li className='border-t-[1px] border-transparent/10 tracking-wider hover:bg-[#667788] text-[#2C3440] hover:text-white gra hover:font-medium text-[12px] py-[5px]'><p className=' px-[15px]'>Profile</p></li>
                    <li className='border-t-[1px] border-transparent/10 tracking-wider hover:bg-[#667788] text-[#2C3440] hover:text-white gra hover:font-medium text-[12px] py-[5px]'><p className=' px-[15px]'>Filims</p></li>
                    <li className='border-t-[1px] border-transparent/10 tracking-wider hover:bg-[#667788] text-[#2C3440] hover:text-white gra hover:font-medium text-[12px] py-[5px]'><p className=' px-[15px]'>Reviews</p></li>
                    <li className='border-t-[1px] border-transparent/10 tracking-wider hover:bg-[#667788] text-[#2C3440] hover:text-white gra hover:font-medium text-[12px] py-[5px]'><p className=' px-[15px]'>Watchlist</p></li>
                    <li className='border-t-[1px] border-transparent/10 tracking-wider hover:bg-[#667788] text-[#2C3440] hover:text-white gra hover:font-medium text-[12px] py-[5px]'><p className=' px-[15px]'>List</p></li>
                    <li className='border-t-[1px] border-transparent/10 tracking-wider hover:bg-[#667788] text-[#2C3440] hover:text-white gra hover:font-medium text-[12px] py-[5px]'><p className=' px-[15px]'>Likes</p></li>
                    <li className='border-t-[1px] border-transparent/10 tracking-wider hover:bg-[#667788] text-[#2C3440] hover:text-white gra hover:font-medium text-[12px] py-[5px]'><p className=' px-[15px]'>Tags</p></li>
                    <li className='border-t-[1px] border-transparent/10 tracking-wider hover:bg-[#667788] text-[#2C3440] hover:text-white gra hover:font-medium text-[12px] py-[5px]'><p className=' px-[15px]'>Networks</p></li>
                </div>
                <div className='py-1 border-t border-[#2C3440]/15'>
                    <li className='border-t-[1px] border-transparent/10 tracking-wider hover:bg-[#667788] text-[#2C3440] hover:text-white gra hover:font-medium text-[12px] py-[5px]'><p className=' px-[15px]'>Settings</p></li>
                    <li className='border-t-[1px] border-transparent/10 tracking-wider hover:bg-[#667788] text-[#2C3440] hover:text-white gra hover:font-medium text-[12px] py-[5px]'><p className=' px-[15px]' onClick={signouUser}>Sign Out</p></li>

                </div>
            </div>
        </div>
    )
}

export default ProfileDropDown