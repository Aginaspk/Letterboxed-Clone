import React from 'react'
import PosterCard from '../PosterCard'

function SearchMovieCard() {
  return (
    <div className='w-full border-b flex border-white/50 pt-[15px] pb-[20px]'>
        <div className=''>
            <div className='w-[76px] h-[111px]'>
                <PosterCard/>
            </div>
        </div>
        <div></div>

    </div>
  )
}

export default SearchMovieCard