import React, { useEffect } from 'react'
import Intro from '../components/Intro'
import FeatureCard from '../components/FeatureCard'
import Guide from '../components/Guide'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies } from '../redux/movieSlice'

function Home() {
  const dispatch = useDispatch();

  const {movies} = useSelector(state=>state.movies)
  console.log(movies)

  useEffect(()=>{
    dispatch(getAllMovies())
  },[dispatch])
  return (
    <div>
      <Intro />
      <div className='w-full flex justify-center mb-20'>
        <div className='w-[950px]'>
          <div className=' grid grid-cols-6 pb-[40px]'>
            {movies?.data?.map((item) => {
              return <FeatureCard key={item._id} item={item} />
            })}
          </div>
          <h1 className='text-[13px] tracking-[0.075em] gra mt-5 mb-2.5 text-[#99AABB]'>LETTERBOXED LETS YOU...</h1>
          <Guide/>

        </div>
      </div>
    </div>
  )
}

export default Home