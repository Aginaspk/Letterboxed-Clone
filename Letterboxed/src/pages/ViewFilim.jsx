import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieById } from '../redux/movieSlice'
import { useParams } from 'react-router-dom'
import Cast from '../components/filims/Cast'
import UserActivityBar from '../components/filims/UserActivityBar'
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import { getAvgRating, getPopReviewsById } from '../redux/reviewSlice'
import { Box, Rating, Stack } from '@mui/material'
import { Masonry } from '@mui/lab'
import PopularReviewCard from '../components/PopularReviewCard'
import ReviewByCard from '../components/filims/ReviewByCard'


function ViewFilim() {
  const dispatch = useDispatch()
  const { filim } = useParams();
  const { isNavHover } = useSelector(state => state.globState)
  const { movie } = useSelector(state => state.movies)
  const { avg } = useSelector(state => state.review)
  const { popReviewById } = useSelector(state => state.review)

  useEffect(() => {
    dispatch(getMovieById(filim))
    dispatch(getAvgRating(filim))
    dispatch(getPopReviewsById(filim))
  }, [dispatch])
  useEffect(() => {
    window.scroll(0, 0);
  }, [])

  return (
    <div className='w-full flex flex-col items-center xl:relative bg-[#14181C] relative '>
      <div className='xl:w-[1200px] w-full xl:h-[600px] overflow-hidden absolute'>
        <div className={`absolute hidden xl:block inset-x-0 top-0 ${isNavHover ? 'h-2/12' : 'h-1/12'} bg-gradient-to-b from-[#14181C] via-[#14181c80] to-transparent`}></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 xl:h-2/3 bg-gradient-to-t from-[#14181C] via-[#14181c80] to-transparent"></div>
        <div className="absolute hidden xl:block inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#14181C] via-[#14181c80] to-transparent"></div>
        <div className="absolute hidden xl:block inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#14181C] via-[#14181c80] to-transparent"></div>
        <img className='w-full h-full object-cover' src={movie?.data?.bigPoster ? movie?.data?.bigPoster : "https://res.cloudinary.com/dup1lh7xk/image/upload/v1741239608/movie_glxp8k_ybwd3w.jpg"} alt="Movie Image" />
      </div>



      <div className='w-[950px] h-[500px]'></div>


      <div className='w-[950px] z-50 flex'>
        <div className='w-[230px] mr-[50px] '>
          <div className='h-[345px] w-full shadow-[inset_0_0_1px_1px_rgba(20,24,28,0.25)]'>
            <img className='h-full w-full rounded-md border border-white/15' src={movie?.data?.smallPoster} alt="" />
          </div>
          <img src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1742539950/file-1730249020574_qp5ijo.png" alt="" className='mb-[50px] mt-[20px]' />

        </div>


        <div>
          <div className='flex flex-wrap items-center gap-x-[10px] gap-y-0 mb-[20px]'>
            <h1 className='text-[32px] lora font-black tracking-wide'>{movie?.data?.title}</h1>
            <div className='flex gap-[10px]'>
              <h2 className='text-[17px] mt-2 gra text-[#DDEEFF] tracking-wider font-light underline'>{movie?.data?.releaseYear}</h2>
              <p className='text-[17px] mt-2 gra text-[#99AABB] tracking-wider font-light'>Directed by <span className='text-[#DDEEFF] underline tracking-wider'>{movie?.data?.director}</span></p>
            </div>


          </div>
          <div className='w-[670px] flex justify-between'>
            <div className='w-[390px]'>
              <h4 className='graReg uppercase text-[13px] tracking-wider mb-[10px] text-[#99AABB]'>{movie?.data?.smallDescription ? movie?.data?.smallDescription : "LONG LIVE THE FIGHTERS"}</h4>
              <p className='lora text-[18px] tracking-wide font-medium text-[#99AABB] mb-[35px]'>{movie?.data?.description}</p>
              <div className='w-full'>
                <img src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1742546192/file-1730249065821_ecfvuv.png" alt="" />
              </div>
              <Cast movie={movie?.data} />
            </div>
            <div className='w-[230px]'>
              <UserActivityBar filim={filim} />
              <div className='w-full mt-[32px]'>
                <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra '>RATING</h1>

                <div className='w-full flex'>
                  <div className='flex items-end pb-[10px]'>
                    <Stack spacing={1} className='' >
                      <Rating name="half-rating" defaultValue={5} precision={0.5} readOnly sx={{ color: "green" || "#556677", fontSize: "10px" }} max={Math.ceil(1)} />
                    </Stack>
                  </div>
                  <ResponsiveContainer width="80%" height={70}>
                    <BarChart
                      data={avg?.ratingsBreakdown}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <Bar dataKey="value" barSize={30}>
                        {avg?.ratingsBreakdown?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={"#445566"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className='w-[20%] flex flex-col justify-between items-center pb-[9px] pt-4'>
                    <h2 className='text-[#778899] text-[20px]'>{avg?.averageRating}</h2>
                    <Stack spacing={1} className='' >
                      <Rating name="half-rating" defaultValue={5} precision={0.5} readOnly sx={{ color: "green" || "#556677", fontSize: "10px" }} max={Math.ceil(5)} />
                    </Stack>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className={`w-[670px]`}>
            <h1 className='w-full pb-[5px] border-b mb-[20px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra '>POPULAR REVIEWS</h1>

            {popReviewById?.data?.length > 0 ? (<Box sx={{ width: "100%", minHeight: 393 }}>
              <Masonry columns={1} spacing={1}  >
                {popReviewById?.data?.map((item) => (
                  <ReviewByCard item={item} key={item._id} />
                ))}
              </Masonry>
            </Box>) :
              <>
                <div className='border-b border-[#2C3440] pb-5 mx-[16px] mb-[32px] flex gap-6 justify-center'>
                  <h1 className='text-[17px] lora pb-2.5  text-[#99AABB]'>No Reviews Yet....</h1>
                </div>
              </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewFilim