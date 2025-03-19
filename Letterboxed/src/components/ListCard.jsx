import React from 'react'
import { IoChatbox } from 'react-icons/io5'
import { TiHeart } from 'react-icons/ti'
import { useSelector } from 'react-redux'

function ListCard({ item }) {

    const { isAuth, user } = useSelector(state => state.auth)

    return (
        <div className='w-auto mb-[25px]'>
            <div className={`${isAuth ? "w-[256px]" : "w-full"} flex flex-row items-center h-[110px] rounded-sm ${isAuth ? "hover:border-2 hover:border-white" : "hover:border-2 hover:border-[#00E054]"}`}>
                {item?.movies?.map((movie, index) => (
                    <img
                        key={index}
                        className="h-full border border-white/30 rounded-[2px]"
                        style={{ marginLeft: index === 0 ? "0" : isAuth ? "-27px" : "-33px", zIndex: item.movies.length - index }}
                        src={movie?.smallPoster}
                        alt={movie?.title || "Movie poster"}
                    /> 
                ))}
            </div>
            <div className='w-full'>
                <h3 className='text-[14px] font-extrabold gra capitalize mt-2 mb-1 tracking-wider '>{item?.title}</h3>
            </div>
            <div className='flex items-center'>
                <div className='w-[18px] h-[18px] rounded-full overflow-hidden mr-1'>
                    <img className='w-full h-full' src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" alt="" />
                </div>
                <p className='font-bold gra text-[14px] text-[#AABBCC] mr-2'>{item?.user?.userName}</p>
                <div className='relative text-[#667788] mr-1.5 tracking-wider'>
                    <TiHeart size={21} className='absolute' />
                    <p className='pl-[20px] text-[14px] font-extralight'>{item?.likes.length}</p>
                </div>
                <div className='relative text-[#667788] mr-1.5'>
                    <IoChatbox size={16} className='absolute top-[3px]' />
                    <p className='pl-4.5 text-[14px] font-extralight'>{item?.comments.length}</p>
                </div>

            </div>
        </div>
    )
}

export default ListCard