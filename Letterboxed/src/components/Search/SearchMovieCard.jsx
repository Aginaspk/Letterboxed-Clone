import React from 'react'
import PosterCard from '../PosterCard'

function SearchMovieCard({item}) {
    return (
        <div className='w-full border-b flex border-[#456]/50 pt-[15px] pb-[20px] justify-between'>
            <div className='w-[76px]'>
                <div className='w-[76px] h-[111px]'>
                    <PosterCard item={item}/>
                </div>
            </div>
            <div className='w-[580px]'>
                <div className='flex items-center gap-[5px] mb-[10px]'>
                    <h1 className='text-[24px] intr font-bold'>{item?.title} </h1>
                    <h1 className='text-[#8899AA] gra text-[18px] pt-[7px]'>{item?.releaseYear}</h1>
                </div>
                <div className='mb-[10px]'>
                    <p className='text-[12px] text-[#99AABB]'>{item?.description}</p>
                </div>
                <div className='gra text-[12px] text-[#99AABB]'>
                    Directed by <span className='py-[4px] px-[6px] shadow-[inset_0_1px_rgba(255,255,255,0.05)] text-[#99AABB] bg-[#283038] rounded-sm text-[12px] gra tracking-wide whitespace-nowrap'>{item?.director}</span>
                </div>
            </div>

        </div>
    )
}

export default SearchMovieCard