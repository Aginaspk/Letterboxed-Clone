import React from 'react'
import { useNavigate } from 'react-router-dom';

function MovieCard({ item }) {
    const navigate = useNavigate();

    return (
        <div>
            <div onClick={() => navigate(`/filims/${item?._id || item?.id}`)} className='rounded-sm shadow-[inset_0_0_1px_1px_rgba(20,24,28,0.125)] relative flex justify-center items-center cursor-pointer'>
                <img className='h-full w-full rounded-sm' src={item?.smallPoster || "https://res.cloudinary.com/dup1lh7xk/image/upload/v1741239684/download_fbxwbd.jpg"} alt="" />
                <div className={`w-full h-full absolute  hover:border-[3px] hover:border-white rounded-sm z-50`}></div>
            </div>
            <h1 className='text-[12px] graReg tracking-wide text-center mt-1 text-[#AABBCC]'>{item?.title}</h1>

        </div>
    )
}

export default MovieCard