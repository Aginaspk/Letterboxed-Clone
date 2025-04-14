import React from 'react'
import { TbLockSquareRoundedFilled } from "react-icons/tb"
import { useDispatch } from 'react-redux'
import { blockControll, getAllMemebrs } from '../../redux/admin/adminMemebrSlice';
function MemebrsCard({ item }) {
    const dispatch = useDispatch();

    const blockHandler = async () => {
        try {
            const res = await dispatch(blockControll(item._id)).unwrap();
            dispatch(getAllMemebrs());
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-full border-b border-white/15 py-[10px] flex justify-between'>
            <div className='flex items-center gap-2'>
                <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                    <img className='w-full h-full' src={item?.profilePic ? item?.profilePic : "https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png"} alt="" />
                </div>
                <div className='gra text-[15px] font-bold tracking-wider'>{item?.userName}</div>

            </div>
            <div>
                <TbLockSquareRoundedFilled onClick={blockHandler} size={35} className={`${item?.isBlocked ? "text-red-500" : "text-[#99AABB]"}`} />
            </div>
        </div>
    )
}

export default MemebrsCard