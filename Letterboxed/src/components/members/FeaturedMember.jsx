import React from 'react'
import PosterCard from '../PosterCard'

function FeaturedMember({item}) {
    const arr = [1,2,3,4,5]
  return (
    <div className='w-[175px] flex flex-col items-center'>
        <div className='w-[150px] h-[150px] rounded-full overflow-hidden mb-2'>
            <img src={item?.profilePic ? item?.profilePic : "https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png"} className='w-full h-full' alt="" />
        </div>
        <div className='gra text-[15px] font-bold tracking-wider'>{item?.userName}</div>
        <p className='text-[12px] text-[#8899AA] mb-1.5 font-semibold tracking-wide'>{item?.totalWatched} movies · {item?.reviewCount} reviews</p>
        <div className='w-full grid grid-cols-5 h-[50px] gap-1'>
            {arr.map((item)=>{
                return <PosterCard key={item} item={item}/>
            })}
        </div>
    </div>
  )
}

export default FeaturedMember