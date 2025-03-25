import React from 'react'

function CommentCard({item}) {
    return (
        <div className='w-full flex py-[15px] border-b border-[#456]/50 '>
            <div className='flex w-[30%] gap-1'>
                <div className='w-[24px] h-[24px] rounded-full overflow-hidden mr-1'>
                    <img className='w-full h-full' src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" alt="" />
                </div>
                <p className='font-bold gra text-[14px] text-[#AABBCC] mr-2'><span className='text-[11px] text-[#667788] font-medium'></span>{item?.user?.userName}</p>
            </div>
            <div>
                <p className='text-[13px] text-[#99AABB]'>Created at {item?.createdAt.split("T")[0]}</p>
                <p className='text-[13px] text-[#99AABB] mt-[15px]'>{item?.comment}</p>
            </div>

        </div>
    )
}

export default CommentCard