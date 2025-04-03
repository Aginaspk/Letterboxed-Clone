import React, { useEffect, useState } from 'react'
import { LuX } from 'react-icons/lu'
import { PiTagSimpleFill } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieById } from '../redux/movieSlice';
import PosterCard from '../components/PosterCard';
import { Rating, Stack } from '@mui/material';
import { IoHeartSharp } from 'react-icons/io5';
import { writeReview } from '../redux/reviewSlice';

function WriteReview({ isOpen, onClose, id }) {
    const dispatch = useDispatch();
    const film = useSelector(state => state.movies.movie)
    const [rate, setRate] = useState(0)
    const [like,setLike] = useState(false)
    const [isChecked,setIsChecked] = useState(true)
    const [review,setReview] = useState('');
    useEffect(() => {
        dispatch(getMovieById(id))
    }, [dispatch, id])

    const postReview = async() =>{
        const rev = {
            movieId:id,
            rating:rate,
            isLiked:like,
            isChecked,
            reviewText:review
        }
        console.log(rev)

        try {
            const res = await dispatch(writeReview(rev)).unwrap();
            alert("review written successfully")
            onClose()
        } catch (error) {
            alert(error)
        }
    }
    return (
        <dialog open={isOpen} id="my_modal_3" className="modal bg-black/90">
            <div className=" bg-[#445566] relative rounded-sm">
                <form method="dialog">
                    <button className="absolute right-3 top-5" onClick={onClose}><LuX className='text-[#99AABB] hover:text-white' size={30} /></button>
                </form>
                <div className='w-[800px]'>
                    <div className='w-full py-[16px] px-[20px] border-b border-[#345] flex items-center'>
                        <PiTagSimpleFill size={30} className='rotate-180 text-[#AABBCC] mr-[14px] mt-[1px]' />
                        <span className='text-[18px] gra '>I watched...</span>
                    </div>
                </div>
                <div className='w-[800px] p-[20px] flex justify-center'>
                    <div className='w-[720px] flex justify-between pt-[20px] pb-[14px]'>
                        <div className='w-[160px]'>
                            <PosterCard item={film?.data} />
                        </div>
                        <div className='w-[520px]'>
                            <div className='flex items-center gap-[5px] mb-[10px]'>
                                <h1 className='text-[24px] intr font-bold'>{film?.data?.title} </h1>
                                <h1 className='text-[#8899AA] graReg text-[17px] pt-[5px]'>{film?.data?.releaseYear}</h1>
                            </div>
                            <div className='flex w-full relative mb-[15px]'>
                                <input type="checkbox" checked={isChecked} name='isPAP' className="absolute checkbox rounded-[2px] w-5 h-5 bg-[#cde] checked:bg-[#cde] checked:text-[#567] " />
                                <p className='text-sm text-[13px] font-medium graReg pl-[30px] mb-[5px] text-[#BBCCDD]'>Watched on <span className='bg-[#345] shadow-[inset_0_1px_1px_rgba(0,0,0,0.15),0_1px_1px_rgba(255,255,255,0.075)] px-[6px] py-[2px] rounded-sm text-white'>{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></p>
                            </div>
                            <div className='w-[510px] h-[122px] rounded-sm mb-[15px]'>
                                <textarea onChange={(e)=>setReview(e.target.value)} name="" id="" className='w-full h-full rounded-sm bg-[#ccddee] shadow-[inset_0_-1px_#fff] focus:bg-white px-[9px] py-[7px] text-[#567] text-[15px] graReg  ' placeholder='Add a review...'></textarea>
                            </div>
                            <div className='flex  justify-end gap-10'>
                                <div>
                                    <p className='text-[13px] graReg tracking-wide ml-1 mb-1 '>Rating</p>
                                    <Stack spacing={1} >
                                        <Rating name="half-rating" onChange={(event, newVal) => { setRate(newVal); }} value={rate} precision={0.5} sx={{ color: "#40BCF4" || "#556677", fontSize: "30px" }} />
                                    </Stack>
                                </div>
                                <div className='mr-3'>
                                    <p className='text-[13px] graReg tracking-wide ml-[6px] mb-1 '>Like</p>
                                    <IoHeartSharp onClick={()=>setLike(!like)} className={`text-[#345] ${like && 'text-[#FF9010]'}`} size={35} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='w-[800px] bg-[#334455] py-[16px] px-[20px]'>
                    <div className='w-full flex justify-end px-[30px]'>
                        <button onClick={postReview} className='px-[12px] tracking-widest text-[13px] rounded-sm font-semibold py-[6px] bg-[#00ac1c] hover:bg-[#009D1A] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra'>SAVE</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default WriteReview