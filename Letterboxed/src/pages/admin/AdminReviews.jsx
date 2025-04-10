import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviews } from '../../redux/admin/adminReviews';
import SearchReviewCard from '../../components/Search/SearchReviewCard';
import ReviewCard from '../../components/admin/ReviewCard';

function AdminReviews() {

    const dispatch = useDispatch();
    const {reviews} = useSelector(state=>state.adminReview)
    console.log(reviews)

    useEffect(()=>{
        dispatch(getAllReviews())
    },[dispatch])
    return (
        <div>
            <div className='w-full flex flex-col items-center mb-[30px]'>
                <h1 className='text-[25px] gralight tracking-wider text-center text-[#AABBCC] mb-[10px]'>Collect, curate, and share. Lists are the perfect way to group films.</h1>
            </div>
            <div className=''>
                {reviews?.data?.map((item,index)=>{
                    return <ReviewCard key={index} item={item}/>
                })}
            </div>
        </div>
    )
}

export default AdminReviews