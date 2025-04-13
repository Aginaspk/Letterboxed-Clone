import React from 'react'
import { IoChatbox } from 'react-icons/io5'
import { TiHeart } from 'react-icons/ti'
import { useSelector } from 'react-redux'

function Lists({ item }) {
    const { isAuth, user } = useSelector(state => state.auth)

    return (
        <div className='w-auto mb-[25px]'>
            <div className={`flex flex-row items-center h-[230px] rounded-md border-2 transition-all duration-200 overflow-hidden ${isAuth ? "border-transparent hover:border-white" : "border-transparent hover:border-[#00E054]"}`}>
                {item?.movies?.map((movie, index) => {
                    if (index > 5) {
                        return
                    }
                    return (<img
                        key={index}
                        className="h-full border border-white/30 rounded-[2px]"
                        style={{ marginLeft: index === 0 ? "0" : "-116px", zIndex: item.movies.length - index }}
                        src={movie?.smallPoster}
                        alt={movie?.title || "Movie poster"}
                    />)
                })}
            </div>
            <div className='w-full'>
                <h3 className='text-[17px] gra capitalize mt-2 mb-1 tracking-wider '>{item?.title}</h3>
            </div>
            <div className='flex items-center'>
                <div className='w-[18px] h-[18px] rounded-full overflow-hidden mr-1'>
                    <img className='w-full h-full' src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" alt="" />
                </div>
                <p className='gra text-[13px] text-[#AABBCC] mr-2'>{item?.user?.userName}</p>

            </div>
        </div>
    )
}

export default Lists