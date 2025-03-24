import React from 'react'
import { useSelector } from 'react-redux'

function ViewList() {
  const { isNavHover } = useSelector(state => state.globState)

  return (
    <div className='w-full flex flex-col items-center xl:relative bg-[#14181C] relative '>
      <div className='xl:w-[1200px] w-full xl:h-[600px] overflow-hidden absolute'>
        <div className={`absolute hidden xl:block inset-x-0 top-0 ${isNavHover ? 'h-2/12' : 'h-1/12'} bg-gradient-to-b from-[#14181C] via-[#14181c80] to-transparent`}></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 xl:h-2/3 bg-gradient-to-t from-[#14181C] via-[#14181c80] to-transparent"></div>
        <div className="absolute hidden xl:block inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#14181C] via-[#14181c80] to-transparent"></div>
        <div className="absolute hidden xl:block inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#14181C] via-[#14181c80] to-transparent"></div>
        <img className='w-full h-full object-cover' src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1741239608/movie_glxp8k_ybwd3w.jpg" alt="Movie Image" />
      </div>

      <div className='w-[950px] h-[500px]'></div>
    </div>
  )
}

export default ViewList