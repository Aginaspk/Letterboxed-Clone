import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PosterCard({item}) {
  const { isAuth, user } = useSelector(state => state.auth)
  const navigate = useNavigate();

  return (
    <div onClick={()=>navigate(`/filims/${item?._id || item?.id}`)} className='rounded-sm shadow-[inset_0_0_1px_1px_rgba(20,24,28,0.125)] relative flex justify-center items-center cursor-pointer'>
                <img className='h-full w-full rounded-sm' src={item?.smallPoster || "https://res.cloudinary.com/dup1lh7xk/image/upload/v1741239684/download_fbxwbd.jpg"} alt="" />
                <div className={`w-full h-full absolute  hover:border-[3px] ${isAuth ? "hover:border-white" : "hover:border-[#00E054]"} rounded-sm z-50`}></div>
            </div>
  )
}

export default PosterCard