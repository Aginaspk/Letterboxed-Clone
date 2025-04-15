import React from 'react'
import PosterCard from './PosterCard'
import { TiHeart } from 'react-icons/ti'

function ReviewUser({ item }) {
    return (
        <div className='w-full border-b flex border-[#456]/50 pt-[15px] pb-[20px] gap-20'>
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
                <div className='mb-[15px]'>
                    <p className='text-[16px]  text-[#99AABB] lora'>{item?.reviewText}</p>
                </div>
                <div className='flex'>
                    <TiHeart size={20} className='text-[#778899] mr-1' />
                    <p className='text-[13px] gra text-[#778899]'>{item?.likes?.length} likes</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewUser