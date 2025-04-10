import React from 'react'
import PosterCard from '../PosterCard'
import { TiHeart } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

function ReviewCard({item}) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/review/${item._id}`)} className='w-full border-b flex border-[#456]/50 pt-[15px] pb-[20px] gap-20'>
            <div className='w-[76px]'>
                <div className='w-[76px] h-[111px]'>
                    <PosterCard item={item?.movie} />
                </div>
            </div>
            <div className='w-[580px]'>
                <div className='flex items-center gap-[5px] mb-[10px]'>
                    <h1 className='text-[24px] intr font-bold'>{item?.movie?.title}</h1>
                    <h1 className='text-[#8899AA] gra text-[18px] pt-[7px]'>{item?.movie?.releaseYear}</h1>
                </div>
                <div className='flex items-center gap-2 mb-[10px]'>
                    <div className='h-[24px] w-[24px] rounded-full overflow-hidden  border-[#99AABB] shadow-[0_0_2px_rgba(0,0,0,0.2)]'>
                        <img src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" className='w-full h-full ' alt="" />

                    </div>
                    <h1 className='text-[12px] pb-[1px] text-[#AABBCC] font-bold pt-[1px]'>{item?.user?.userName}</h1>
                </div>
                <div className='mb-[15px]'>
                    <p className='text-[16px]  text-[#99AABB] lora'>{item?.reviewText}</p>
                </div>
                <div className='flex'>
                    <TiHeart size={20} className='text-[#778899] mr-1' />
                    <p className='text-[13px] gra text-[#778899] font-semibold mr-3'>Like Review</p>
                    <p className='text-[13px] gra text-[#778899]'>{item?.likes?.length} likes</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard