import React, { useEffect } from 'react'
import Intro from '../components/Intro'
import FeatureCard from '../components/FeatureCard'
import Guide from '../components/Guide'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies, getOscarsMovies } from '../redux/movieSlice'
import PosterCard from '../components/PosterCard'
import { Link } from 'react-router-dom'
import { getNewReviews, getPopularReviews } from '../redux/reviewSlice'
import ReviewCard from '../components/ReviewCard'
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import PopularReviewCard from '../components/PopularReviewCard'
import { getPopularLists } from '../redux/listsSlice'
import ListCard from '../components/ListCard'
import { getLatestNews } from '../redux/newsSlice'

function Home() {
  const dispatch = useDispatch();

  const { movies, oscars } = useSelector(state => state.movies)
  const { isAuth, user } = useSelector(state => state.auth)
  const { newReviews } = useSelector(state => state.review)
  const { popularReviews } = useSelector(state => state.review)
  const { popLists } = useSelector(state => state.lists)
  const { news, loading } = useSelector(state => state.news);
  const sortedReviews = [...(popularReviews?.data || [])].sort((a, b) => {
    return b.reviewText.length - a.reviewText.length;
  });


  console.log(news)

  useEffect(() => {
    dispatch(getAllMovies())
    dispatch(getOscarsMovies())
    dispatch(getNewReviews())
    dispatch(getPopularReviews())
    dispatch(getPopularLists())
    dispatch(getLatestNews())
  }, [dispatch])

  return (
    <div className={`${isAuth ? 'bg-gradient-to-b from-[#1E252C]/50 via[#1E252C] via-5% to-[#14181C] pt-[30px]' : 'bg-[#14181C]'}`}>
      {!isAuth && <Intro />}

      <div className='w-full flex justify-center'>
        <div className='xl:w-[950px] '>
          {isAuth && <>
            <h1 className='text-[26px] text-center mb-[32px] text-[#AABBCC] tracking-wide font-[200]'>Welcome back, <span className='text-white font-[200]'>{user.userName}.</span> Here’s what we’ve been watching…</h1>
            <p className='text-[15px] text-center mt-[-20px] mb-[35px] text-[#99AABB]'>This homepage will become customized as you <span className='text-white'>follow active members</span> on Letterboxd.</p>
            <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra'>NEW ON LETTERBOXD</h1>
            <div className='grid grid-cols-6 gap-2 pb-[40px]'>
              {newReviews?.data?.map((item, index) => {
                if (index < 6) {
                  return <ReviewCard key={item._id} item={item} />
                }
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
          <p className='mb-2.5 mt-2 text-[#99AABB] text-[15px] pb-[64px] gra'>The nominees for Best Motion Picture of the Year at the 97th Academy Awards, hosted on March 2, 2025. Follow the <Link className='text-[#DDEEFF]' to={"https://www.oscars.org/"}>Oscars</Link>.</p>


          {isAuth && <>
            <h1 className='w-full pb-[5px] border-b mb-[20px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra '>LATTEST NEWS</h1>
            <div className='w-full h-[175px] mb-[96px] flex '>
              <img src={news?.news?.[0]?.image} alt="" className='h-full rounded-l-md' />
              <div className='bg-[#202830] h-full w-full rounded-r-md flex justify-center items-center'>
                <div className='w-[580px]'>
                  <h1 className='gra text-[22px] font-bold tracking-wide mb-[5px]'>{news?.news?.[0]?.title}</h1>
                  <p className='lora text-[17px] font-medium tracking-wide text-[#99AABB]'>{news?.news?.[0]?.news}</p>
                </div>
              </div>
            </div>
          </>}


          <div className={`${!isAuth && 'flex justify-between'} `}>
            <div className={`${!isAuth && 'w-[630px]'}`}>
              <h1 className='w-full pb-[5px] border-b mb-[20px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra '>POPULAR REVIEWS THIS WEEK</h1>

              <Box sx={{ width: "100%", minHeight: 393 }}>
                <Masonry columns={isAuth ? 2 : 1} spacing={3}  >
                  {isAuth ? (sortedReviews?.map((item) => (
                    <PopularReviewCard item={item} key={item._id} />
                  ))) : (popularReviews?.data?.map((item) => (
                    <PopularReviewCard item={item} key={item._id} />
                  )))}
                </Masonry>
              </Box>
            </div>
            <div className={`${!isAuth ? 'w-[230px]' : 'w-full  mt-[64px]'}`}>
              <h1 className='w-full pb-[5px] border-b mb-[20px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra '>POPULAR LIST</h1>
              <div className={`w-full ${isAuth && 'flex gap-14'}`}>
                {popLists?.data?.map((item) => {
                  return <Link to={`/list/${item?._id}`}><div className={`${isAuth ? "w-[256px]" : "w-full"}`}><ListCard item={item} /></div></Link>
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home