import React from 'react'
import PosterCard from '../PosterCard'

function SearchMovieCard() {
    return (
        <div className='w-full border-b flex border-[#456]/50 pt-[15px] pb-[20px] justify-between'>
            <div className='w-[76px]'>
                <div className='w-[76px] h-[111px]'>
                    <PosterCard />
                </div>
            </div>
            <div className='w-[580px]'>
                <div className='flex items-center gap-[5px] mb-[10px]'>
                    <h1 className='text-[24px] intr font-bold'>Dead Poets Society </h1>
                    <h1 className='text-[#8899AA] gra text-[18px] pt-[7px]'>1998</h1>
                </div>
                <div className='mb-[10px]'>
                    <p className='text-[12px] text-[#99AABB]'>Alternative titles: Quái Nhân Deadpool, 死侍1, Deadpool: 1, Deadpool 1, Дэдпул, 死侍, דדפול, เดดพูล, ددپول, Дедпул, 데드풀, デッドプール, 惡棍英雄：死侍, ديدبول, დედპული, ഡെഡ്പൂള്‍, Dedpūls, 死侍：不死現身, Dedpul</p>
                </div>
                <div className='gra text-[12px] text-[#99AABB]'>
                    Directed by <span className='py-[4px] px-[6px] shadow-[inset_0_1px_rgba(255,255,255,0.05)] text-[#99AABB] bg-[#283038] rounded-sm text-[12px] gra tracking-wide whitespace-nowrap'>Dryad</span>
                </div>
            </div>

        </div>
    )
}

export default SearchMovieCard