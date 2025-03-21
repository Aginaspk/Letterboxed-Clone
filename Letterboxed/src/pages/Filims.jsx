import React, { useEffect, useRef } from 'react'
import Filter from '../components/filims/Filter'
import { useDispatch, useSelector } from 'react-redux'
import { getPopMovies } from '../redux/movieSlice'
import PopMovieCard from '../components/filims/PopMovieCard'
import { getNewReviews, getPopularReviews } from '../redux/reviewSlice'
import PosterCard from '../components/PosterCard'
import { Box } from '@mui/material'
import { Masonry } from '@mui/lab'
import PopularReviewCard from '../components/PopularReviewCard'
import MembersCard from '../components/MembersCard'
import { getPopReviwers } from '../redux/membersSlice'

function Filims() {
    const dispatch = useDispatch()
    const { popMovies } = useSelector(state => state.movies)
    const { newReviews } = useSelector(state => state.review)
    const { popularReviews } = useSelector(state => state.review)
    const { popReviwers } = useSelector(state => state.members);

    const fisrtHalf = popMovies?.data?.slice(0, 4);
    const secondHalf = popMovies?.data?.slice(4, 8)
    console.log(popReviwers)



    useEffect(() => {
        dispatch(getPopMovies());
        dispatch(getNewReviews());
        dispatch(getPopularReviews())
        dispatch(getPopReviwers())
    }, [dispatch])



    const slide1Ref = useRef(null);
    const slide2Ref = useRef(null);

    const goToSlide = (slide) => {
        if (slide === 1 && slide1Ref.current) {
            slide1Ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } else if (slide === 2 && slide2Ref.current) {
            slide2Ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    };
    return (
        <div className='bg-gradient-to-b from-[#1E252C]/50 via[#1E252C] via-5% to-[#14181C] w-full flex justify-center '>
            <div className='py-7.5 w-[950px] relative'>
                <div className='flex justify-center mt-8 mb-[60px]'>
                    <img className='w-[728px] h-[90px]' src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1742457651/file-1730249079740_gei6s0.png" alt="" />
                </div>
                <div className='mb-8'>
                    <Filter />
                </div>
                <h1 className={` w-full pb-[5px] border-b mb-[15px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra`}>POPULAR ON LETTERBOXD</h1>
                <div className="carousel w-full mb-[30px]">
                    <div ref={slide1Ref} className="carousel-item flex gap-[10px]">
                        {fisrtHalf?.map((item, index) => (
                            <PopMovieCard key={index} filim={item} />
                        ))}
                    </div>
                    <div ref={slide2Ref} className="carousel-item flex gap-[10px]">
                        {secondHalf?.map((item, index) => (
                            <PopMovieCard key={index} filim={item} />
                        ))}
                    </div>
                </div>
                <div className="absolute -left-7 -right-7 top-[470px] flex -translate-y-1/2 transform justify-between">
                    <button
                        onClick={() => goToSlide(1)}
                        className="text-[25px] text-[#213244] hover:text-[#667788]"
                    >
                        ❮
                    </button>
                    <button
                        onClick={() => goToSlide(2)}
                        className="text-[25px] text-[#213244] hover:text-[#667788]"
                    >
                        ❯
                    </button>
                </div>
                <img className='w-full mb-[40px]' src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1741588121/pro-950_qrg5h9.png" alt="" />

                <h1 className={` w-full pb-[5px] border-b mb-[15px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra`}>JUST REVIWED</h1>
                <div className='grid grid-cols-12 gap-1 mt-[3px] mb-[32px]'>
                    {newReviews?.data?.map((item, index) => {
                        return <PosterCard item={item.movie} />
                    })}
                </div>

                <div className='w-full flex justify-between'>
                    <div className={`w-[630px]`}>
                        <h1 className='w-full pb-[5px] border-b mb-[20px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra '>POPULAR REVIEWS THIS WEEK</h1>

                        <Box sx={{ width: "100%", minHeight: 393 }}>
                            <Masonry columns={1} spacing={1}  >
                                {popularReviews?.data?.map((item) => (
                                    <PopularReviewCard item={item} key={item._id} />
                                ))}
                            </Masonry>
                        </Box>
                    </div>
                    <div className={`w-[230px]`}>
                        <img src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1742539950/file-1730249020574_qp5ijo.png" alt="" className='mb-[50px] mt-[20px]' />
                        <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra '>POPULAR REVIEWERS</h1>
                        <div className=''>
                            {popReviwers?.data?.map((item, index) => {
                                return <MembersCard item={item} />
                            })}
                        </div>
                        <div className='mt-[32px]'>
                        <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra '>CANT'T FIND A FILIM</h1>
                        <p className='text-[13px] gra text-[#9AB] tracking-wider'>Help keep Letterboxd up to date. Find out how to add or edit a film.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filims