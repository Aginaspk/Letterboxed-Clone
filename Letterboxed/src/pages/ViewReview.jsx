import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getReviewById } from '../redux/reviewSlice';
import RatingStar from '../components/RatingStar';
import CommentCard from '../components/CommentCard';
import { Rating, Stack } from '@mui/material';
import UserActivityBar from '../components/filims/UserActivityBar';

function ViewReview() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isNavHover } = useSelector(state => state.globState)
    const { reviewById } = useSelector(state => state.review)
    console.log(reviewById)
    useEffect(() => {
        dispatch(getReviewById(id))
    }, [dispatch, id])



    return (
        <div className='w-full flex flex-col items-center xl:relative bg-[#14181C] relative '>
            <div className='xl:w-[1200px] w-full xl:h-[600px] overflow-hidden absolute'>
                <div className={`absolute hidden xl:block inset-x-0 top-0 ${isNavHover ? 'h-2/12' : 'h-1/12'} bg-gradient-to-b from-[#14181C] via-[#14181c80] to-transparent`}></div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 xl:h-2/3 bg-gradient-to-t from-[#14181C] via-[#14181c80] to-transparent"></div>
                <div className="absolute hidden xl:block inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#14181C] via-[#14181c80] to-transparent"></div>
                <div className="absolute hidden xl:block inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#14181C] via-[#14181c80] to-transparent"></div>
                <img className='w-full h-full object-cover' src={reviewById?.data?.movie?.bigPoster ? reviewById?.data?.movie?.bigPoster : "https://res.cloudinary.com/dup1lh7xk/image/upload/v1741239608/movie_glxp8k_ybwd3w.jpg"} alt="Movie Image" />
            </div>



            <div className='w-[950px] h-[500px]'></div>
            <div className='w-[950px] z-50 flex justify-between'>
                <div className='w-[156px] '>
                    <div className='h-[231px] w-full shadow-[inset_0_0_1px_1px_rgba(20,24,28,0.25)]'>
                        <img className='h-full w-full rounded-md border border-white/15' src={reviewById?.data?.movie?.smallPoster} alt="" />
                    </div>
                    <img src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1742539950/file-1730249020574_qp5ijo.png" alt="" className='mb-[50px] mt-[20px]' />

                </div>
                <div className='w-[470px]'>
                    <div className='flex border-b border-[#456] mb-[15px]'>
                        <div className='w-[24px] h-[24px] rounded-full overflow-hidden'>
                            <img className='w-full h-full' src={reviewById?.data?.user?.profilePic ? reviewById?.data?.user?.profilePic : "https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png"} alt="" />

                        </div>
                        <h1 className='text-[14px] text-[#AABBCC] font-bold gra ml-2 pb-3'><span className='text-[12px] gra text-[#778899] font-bold mr-1 pt-[1px]'>Review By </span>{reviewById?.data?.user?.userName}</h1>
                    </div>
                    <div className='flex flex-wrap items-center gap-x-[10px] gap-y-0 mb-[10px]'>
                        <h1 className='text-[25px] intr font-black tracking-wide'>{reviewById?.data?.movie?.title}</h1>
                        <div className='flex gap-[10px]'>
                            <h2 className='text-[17px] mt-1 graReg  text-[#8899AA] tracking-wider font-light '>{reviewById?.data?.movie?.releaseYear}</h2>
                        </div>
                    </div>
                    <div className='mb-[10px]'>
                        <Stack spacing={1} >
                            <Rating name="half-rating" value={Number(reviewById?.data?.rating)} precision={0.5} readOnly sx={{ color: "#00C030", fontSize: "16px" }}  />
                        </Stack>
                    </div>
                    <div>
                        <p className='text-[18px] lora text-[#99AABB]'>{reviewById?.data?.reviewText}</p>
                    </div>
                    <div className='mt-[50px]'>
                        <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra'>{reviewById?.data?.comments?.length} COMMENTS</h1>
                        {reviewById?.data?.comments?.map((item, index) => {
                            return <CommentCard item={item} />
                        })}
                    </div>
                </div>
                <div className='w-[230px]'>
                    <p className='text-[14px] graReg pt-[16px] px-[20px] pb-[18px] mb-[20px] bg-[#445566]'>{reviewById?.data?.user?.userName}🎞 is using Letterboxd to share film reviews and lists with friends. Join here.</p>
                    <UserActivityBar filim={reviewById?.data?.movie?._id}/>
                </div>
            </div>

        </div>

    )
}

export default ViewReview