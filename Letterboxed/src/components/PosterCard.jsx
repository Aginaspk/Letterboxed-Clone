import React from 'react'
import { useSelector } from 'react-redux'

function PosterCard({item}) {
  const { isAuth, user } = useSelector(state => state.auth)

  return (
    <div className='rounded-sm shadow-[inset_0_0_1px_1px_rgba(20,24,28,0.125)] relative flex justify-center items-center cursor-pointer'>
                <img className='h-full w-full rounded-sm' src={item?.smallPoster} alt="" />
                <div className={`w-full h-full absolute  hover:border-[3px] ${isAuth ? "hover:border-white" : "hover:border-[#00E054]"} rounded-sm z-50`}></div>
            </div>
  )
}

export default PosterCard