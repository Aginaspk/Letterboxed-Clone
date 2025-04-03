import React from 'react'
import RatingStar from './RatingStar'
import { HiMenuAlt2 } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

function ReviewCard({ item }) {
  const navigate = useNavigate();
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", { month: "short", day: "2-digit" });
  };

  const date = formatDate(item?.createdAt)

  return (<div onClick={()=>navigate(`/review/${item?._id}`)}>
    <div className='rounded-sm shadow-[inset_0_0_1px_1px_rgba(20,24,28,0.125)] hover:border-2 hover:border-white' >
      <img className='rounded-t-sm' src={item?.movie?.smallPoster} alt="" />
      <div className='w-full rounded-b-sm bg-[#445566] gap-1 h-7 flex items-center px-2'>
        <div className='h-[18px] w-[18px] rounded-full overflow-hidden border border-[#99AABB] shadow-[0_0_2px_rgba(0,0,0,0.2)] '>
          <img src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" className='w-full h-full' alt="" />
        </div>
        <h1 className='text-[12px] pb-[1px] text-[#BBCCDD] font-bold'>{item?.user?.userName}</h1>
      </div>
    </div>
    <div className='h-4 flex items-center justify-between px-[1px]'>
      <div className='flex'>
        <RatingStar rating={item?.rating} />
        <HiMenuAlt2 size={15} className='text-[#556677]' />
      </div>
      <p className='text-[12px] text-[#556677] gra'>{date}</p>
    </div>
  </div>
  )
}

export default ReviewCard