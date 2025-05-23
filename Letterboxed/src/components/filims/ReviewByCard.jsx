import React, { useRef, useState } from 'react'
import RatingStar from '../RatingStar'
import { IoChatbox } from 'react-icons/io5'
import { TiHeart } from 'react-icons/ti'

function ReviewByCard({ item }) {
  const parRef = useRef(null);
  const [isMax, setIsMax] = useState(350)
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className='border-b border-[#2C3440] pb-5 mx-[16px] mb-[32px] flex gap-6'>
      <div className='w-[10%]'>
        <div className='h-[40px] w-[40px] rounded-full overflow-hidden  border-[#99AABB] shadow-[0_0_2px_rgba(0,0,0,0.2)] '>
          <img src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" className='w-full h-full ' alt="" />

        </div>
      </div>
      <div>
        <div className='flex gap-5 mb-5'>
          <div className='flex items-end'>
            <div className='flex  gap-1.5' >
              <div className='flex justify-center items-center gap-[6px]'>

                <h1 className='text-[14px] pb-[1px] text-[#AABBCC] font-bold gra'><span className='text-[12px] gra text-[#778899] font-bold mr-1 pt-[1px]'>Review By </span>{item?.user?.userName}</h1>
              </div>
              <div className='flex items-center'>
                <RatingStar rating={item?.rating} color={"#00C030"} />
                <div className='ml-[7px] flex items-center gap-0.5'><IoChatbox size={16} className='text-[#667788] pt-[2px]' /><p className='text-[12px]'>{item?.comments?.length}</p></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-3'>

            <div className='text-[17px] lora pb-2.5  text-[#99AABB]'>
              {isExpanded ? item?.reviewText : item?.reviewText.slice(0, isMax)}
              {item?.reviewText.length > isMax && !isExpanded && <span>...</span>}
              {!isExpanded && <span className={`text-[#DDEEFF] lora cursor-pointer ${item?.reviewText.length <= isMax && 'hidden'}`} onClick={() => setIsExpanded(true)}>more</span>}
            </div>
            <div className='flex justify-start'>
              <TiHeart size={20} className='text-[#778899] mr-1' />
              <p className='text-[13px] gra text-[#778899] font-semibold mr-3'>Like Review</p>
              <p className='text-[13px] gra text-[#778899]'>{item?.likes?.length} likes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewByCard