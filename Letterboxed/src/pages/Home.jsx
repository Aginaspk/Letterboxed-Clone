import React, { useEffect } from 'react'
import Intro from '../components/Intro'
import FeatureCard from '../components/FeatureCard'
import Guide from '../components/Guide'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies, getOscarsMovies } from '../redux/movieSlice'
import PosterCard from '../components/PosterCard'
import { Link } from 'react-router-dom'
import { getNewReviews } from '../redux/reviewSlice'
import ReviewCard from '../components/ReviewCard'

function Home() {
  const dispatch = useDispatch();

  const { movies, oscars } = useSelector(state => state.movies)
  const { isAuth, user } = useSelector(state => state.auth)
  const { newReviews } = useSelector(state => state.review)

  console.log(newReviews)

  useEffect(() => {
    dispatch(getAllMovies())
    dispatch(getOscarsMovies())
    dispatch(getNewReviews())
  }, [dispatch])


  return (
    <div className={`${isAuth ? 'bg-gradient-to-b from-[#1E252C]/50 via[#1E252C] via-5% to-[#14181C] pt-[30px]' : 'bg-[#14181C]'}`}>
      {!isAuth && <Intro />}

      <div className='w-full flex justify-center'>
        <div className='w-[950px]'>
          {isAuth && <>
            <h1 className='text-[26px] text-center mb-[32px] text-[#AABBCC] tracking-wide font-[200]'>Welcome back, <span className='text-white font-[200]'>{user.userName}.</span> Here’s what we’ve been watching…</h1>
            <p className='text-[15px] text-center mt-[-20px] mb-[35px] text-[#99AABB]'>This homepage will become customized as you <span className='text-white'>follow active members</span> on Letterboxd.</p>
            <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra'>NEW ON LETTERBOXD</h1>
            <div className='grid grid-cols-6 gap-2 pb-[40px]'>
              {newReviews?.data?.map((item) => {
                return <ReviewCard key={item._id} item={item} />
              })}
            </div>
            <img className='w-full mb-[40px]' src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1741588121/pro-950_qrg5h9.png" alt="" />
            </>}
          <h1 className={`${!isAuth && 'hidden'} w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra ${!isAuth && "hidden"}`}>POPULAR ON LETTERBOXD</h1>

          <div className='grid grid-cols-6 gap-2 pb-[40px]'>
            {movies?.data?.map((item) => {
              return <FeatureCard key={item._id} item={item} />
            })}
          </div>
          {!isAuth && <><h1 className='text-[13px] tracking-[0.075em] gra mt-5 mb-2.5 text-[#99AABB]'>LETTERBOXD LETS YOU...</h1>
            <Guide /></>}

          <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra'>AND THE OSCAR GOES TO...</h1>
          <div className='grid grid-cols-10 gap-1 my-[3px]'>
            {oscars?.data?.map((item) => {
              return <PosterCard key={item._id} item={item} />
            })}
          </div>
          <p className='mb-2.5 mt-2 text-[#99AABB] text-[15px] gra'>The nominees for Best Motion Picture of the Year at the 97th Academy Awards, hosted on March 2, 2025. Follow the <Link className='text-[#DDEEFF]' to={"https://www.oscars.org/"}>Oscars</Link>.</p>

        </div>
      </div>
    </div>
  )
}

export default Home