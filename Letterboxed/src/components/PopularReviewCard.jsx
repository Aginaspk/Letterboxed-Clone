import React, { useEffect, useRef, useState } from 'react'
import RatingStar from './RatingStar'
import { IoChatbox } from 'react-icons/io5'
import { TiHeart } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

function PopularReviewCard({ item }) {
    const navigate = useNavigate()
    const parRef = useRef(null);
    const [isMax, setIsMax] = useState(350)
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div onClick={()=>navigate(`/review/${item?._id}`)} className='border-b border-[#2C3440] pb-5 mx-[16px] mb-[32px]'>
            <div className='flex gap-5 mb-5'>
                <div className='h-[120px] w-[80px] shadow-[rgba(20,24,28,0.25)_0px_0px_1px_1px_inset] border-[#FFEEDD] hover:border-2 hover:border-white hover:rounded-sm '>
                    <img className='h-full w-full rounded-sm' src={item?.movie?.smallPoster} alt="" /></div>
                <div className='flex items-end'>
                    <div className='flex flex-col items-start gap-1.5' >
                        <div className='flex justify-center items-center gap-[6px]'>
                            <div className='h-[24px] w-[24px] rounded-full overflow-hidden  border-[#99AABB] shadow-[0_0_2px_rgba(0,0,0,0.2)] '>
                                <img src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" className='w-full h-full ' alt="" />
                                
                            </div>
                            <h1 className='text-[12px] pb-[1px] text-[#AABBCC] font-bold'>{item?.user?.userName}</h1>
                        </div>
                        <div className='flex gap-1'>
                            <h1 className='text-[22px] intr font-bold'>{item?.movie?.title}</h1>
                            <h1 className='text-[18px] flex items-center text-[#8899AA] pt-[3px] gra font-[100]'>{item?.movie?.releaseYear}</h1>
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
                    <div className='flex'>
                        <TiHeart size={20} className='text-[#778899] mr-1' />
                        <p className='text-[13px] gra text-[#778899] font-semibold mr-3'>Like Review</p>
                        <p className='text-[13px] gra text-[#778899]'>{item?.likes?.length} likes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularReviewCard