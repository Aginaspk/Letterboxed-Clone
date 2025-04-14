import React from 'react'
import PosterCard from '../PosterCard'
import { TiHeart } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import { FaDeleteLeft } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { getAllReviews, removeAReview } from '../../redux/admin/adminReviews';
import toast from 'react-hot-toast';

function ReviewCard({item}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteAReview = async()=>{
        try {
            const res = await dispatch(removeAReview(item._id)).unwrap();
            toast.success("deleted")
            dispatch(getAllReviews())
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-full border-b flex border-[#456]/50 pt-[15px] pb-[20px] gap-20'>
            <div className='w-[76px]'>
                <div className='w-[76px] h-[111px]'>
                    <PosterCard item={item?.movie} />
                </div>
            </div>
            <div className='w-[580px]'>
                <div className='flex items-center gap-[5px] mb-[10px]'>
                    <h1 className='text-[24px] intr font-bold'>{item?.movie?.title}</h1>
                    <h1 className='text-[#8899AA] gra text-[18px] pt-[7px]'>{item?.movie?.releaseYear}</h1>
                </div>
                <div className='flex items-center gap-2 mb-[10px]'>
                    <div className='h-[24px] w-[24px] rounded-full overflow-hidden  border-[#99AABB] shadow-[0_0_2px_rgba(0,0,0,0.2)]'>
                        <img src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" className='w-full h-full ' alt="" />

                    </div>
                    <h1 className='text-[12px] pb-[1px] text-[#AABBCC] font-bold pt-[1px]'>{item?.user?.userName}</h1>
                </div>
                <div className='mb-[15px]'>
                    <p className='text-[16px]  text-[#99AABB] lora'>{item?.reviewText}</p>
                </div>
            </div>
            <div className='w-[200px] flex justify-end'>
                <FaDeleteLeft className='cursor-pointer' onClick={deleteAReview}/>
            </div>
        </div>
    )
}

export default ReviewCard