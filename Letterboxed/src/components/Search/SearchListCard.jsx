import React from 'react'
import { useSelector } from 'react-redux';

function SearchListCard() {
    const { isAuth, user } = useSelector(state => state.auth)

    const arr = [1, 2, 3, 4, 5]
    return (
        <div className='w-full border-b flex border-[#456]/50 pt-[15px] pb-[20px] justify-between'>
            <div className='w-[256px]'>
                <div className={` flex w-full flex-row items-center h-[111px] rounded-sm border-2 transition-all duration-200 overflow-hidden ${isAuth ? "border-transparent hover:border-white" : "border-transparent hover:border-[#00E054]"}`}>
                    {arr.map((movie, index) => {
                        if (index > 5) {
                            return;
                        }
                        return (<img
                            key={index}
                            className="h-full border border-white/30 rounded-[2px]"
                            style={{ marginLeft: index === 0 ? "0" : "-27px", zIndex: arr.length - index }}
                            src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1741239684/download_fbxwbd.jpg"
                            alt={movie?.title || "Movie poster"}
                        />)
                    })}
                </div>
            </div>
            <div className='w-[405px]'>
                <h1 className='text-[20px] gra font-bold tracking-wider'>Rinshad Collection </h1>
                <div className='flex items-center gap-2 mb-[10px]'>
                    <div className='h-[24px] w-[24px] rounded-full overflow-hidden  border-[#99AABB] shadow-[0_0_2px_rgba(0,0,0,0.2)]'>
                        <img src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" className='w-full h-full ' alt="" />

                    </div>
                    <h1 className='text-[12px] pb-[1px] text-[#AABBCC] font-bold pt-[1px]'>Dryad2op</h1>
                </div>


            </div>
        </div>
    )
}

export default SearchListCard