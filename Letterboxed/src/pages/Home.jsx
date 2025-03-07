import React, { useEffect } from 'react'
import Intro from '../components/Intro'
import FeatureCard from '../components/FeatureCard'
import Guide from '../components/Guide'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies, getOscarsMovies } from '../redux/movieSlice'
import PosterCard from '../components/PosterCard'
import { Link } from 'react-router-dom'

function Home() {
  const dispatch = useDispatch();

  const {movies,oscars} = useSelector(state=>state.movies)
  console.log(movies)

  useEffect(()=>{
    dispatch(getAllMovies())
    dispatch(getOscarsMovies())
  },[dispatch])


  return (
    <div>
      <Intro />
      <div className='w-full flex justify-center mb-20'>
        <div className='w-[950px]'>
          <div className='grid grid-cols-6 gap-2 pb-[40px]'>
            {movies?.data?.map((item) => {
              return <FeatureCard key={item._id} item={item} />
            })}
          </div>
          <h1 className='text-[13px] tracking-[0.075em] gra mt-5 mb-2.5 text-[#99AABB]'>LETTERBOXED LETS YOU...</h1>
          <Guide/>

          <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra'>AND THE OSCAR GOES TO...</h1>
          <div className='grid grid-cols-10 gap-1 my-[3px]'>
            {oscars?.data?.map((item)=>{
              return <PosterCard key={item._id} item={item}/>
            })}
          </div>
          <p className='mb-2.5 mt-2 text-[#99AABB] text-[15px] gra'>The nominees for Best Motion Picture of the Year at the 97th Academy Awards, hosted on March 2, 2025. Follow the <Link className='text-[#DDEEFF]' to={"https://www.oscars.org/"}>Oscars</Link>.</p>

        </div>
      </div>
    </div>
  )
}

export default Home