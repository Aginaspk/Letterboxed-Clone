import React from 'react'
import { useSelector } from 'react-redux'

function AllTimeCard({ item }) {

    const { isAuth, user } = useSelector(state => state.auth)

    return (
        <div className=''>
            <div className={`flex flex-row items-center h-[110px] rounded-md border-2 transition-all duration-200 overflow-hidden ${isAuth ? "border-transparent hover:border-white" : "border-transparent hover:border-[#00E054]"}`}>
                {item?.movies?.map((movie, index) => {

                    return (<img
                        key={index}
                        className="h-full border border-white/30 rounded-[2px]"
                        style={{ marginLeft: index === 0 ? "0" : "-28px", zIndex: item.movies.length - index }}
                        src={movie?.smallPoster}
                        alt={movie?.title || "Movie poster"}
                    />)
                })}
            </div>
            <div className='w-full'>
                <h3 className='text-[15px] font-bold gra capitalize mt-2 mb-1 tracking-wider '>{item?.title}</h3>
            </div>
            <div className='flex items-center gap-1'>
                <div className='w-[18px] h-[18px] rounded-full overflow-hidden mr-1'>
                    <img className='w-full h-full' src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" alt="" />
                </div>
                <p className='font-bold gra text-[14px] text-[#AABBCC] mr-2'><span className='text-[12px] text-[#667788] font-medium'>Created by </span>{item?.user?.userName}</p>

            </div>

        </div>
    )
}

export default AllTimeCard