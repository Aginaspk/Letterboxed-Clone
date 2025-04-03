import { Rating, setRef, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoEyeSharp, IoHeartOutline, IoHeartSharp, IoTimeOutline, IoTimeSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { getIntraById, likeMovie, rateMovie, watchlistMovie, watchMovie } from '../../redux/movieSlice';
import toast from 'react-hot-toast';

function UserActivityBar({filim}) {
    const dispatch = useDispatch();
    const [like,setLike] = useState(false)
    const [watch,setWatch] = useState(false)
    const [watchlist,setWatchlist]= useState(false)
    const [rating,setRating] = useState(0)
    const {intraById} = useSelector(state=>state.movies)

    console.log(typeof(intraById?.intra?.rating))
    let val = intraById?.intra?.rating;
    console.log(filim)

    useEffect(()=>{
        dispatch(getIntraById(filim))
    },[like,watch,watchlist,rating,filim])



    const likeAMovie = async()=>{
        try {
            const res = await dispatch(likeMovie(filim)).unwrap();
            setLike(!like)
        } catch (error) {
            alert(error)
        }
    }
    const watchAMovie = async()=>{
        try {
            const res = await dispatch(watchMovie(filim)).unwrap();
            setWatch(!watch)
        } catch (error) {
            alert(error)
        }
    }
    const watchlistAMovie = async()=>{
        try {
            const res = await dispatch(watchlistMovie(filim)).unwrap();
            setWatchlist(!watchlist)
        } catch (error) {
            alert(error)
        }
    }

    const rateAMovie = async(newVal)=>{
        try {
            console.log(newVal)
            const res = await dispatch(rateMovie({filim,newVal})).unwrap();
            setRating(newVal)
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className='w-full bg-[#445566] rounded-sm'>
            <div className='h-[82px] w-full py-2.5 border border-[#2C3440] flex justify-evenly '>
                <div className='text-[#bcd]/50 flex flex-col justify-center items-center' onClick={watchAMovie}>
                    <IoEyeSharp className={`${intraById?.intra?.watchedAt && 'text-[#00E054]'}`}  size={40} />
                    <p className='text-[12px] graReg tracking-wide text-[#bcd] '>Watch</p>
                </div>
                <div className='text-[#bcd]/50 flex flex-col justify-center items-center' onClick={likeAMovie}>
                    <IoHeartSharp className={`${intraById?.intra?.likedAt && 'text-[#FF9010]'}`} size={40} />
                    <p className='text-[12px] graReg tracking-wide text-[#bcd] '>Like</p>

                </div>
                <div className='text-[#bcd]/50 flex flex-col justify-center items-center' onClick={watchlistAMovie}>
                    <IoTimeSharp className={`${intraById?.intra?.isInWatchlist && 'text-[#40BCF4]'}`} size={40} />
                    <p className='text-[12px] graReg tracking-wide text-[#bcd] '>Watchlist</p>

                </div>
            </div>
            <div className='h-[75px] w-full py-2.5 border border-[#2C3440] flex flex-col items-center justify-center'>
                <p className='text-[12px] graReg tracking-wide text-[#bcd] '>Rate</p>
                <Stack spacing={1} >
                    <Rating name="half-rating" onChange={(event,newVal)=>{rateAMovie(newVal);}} value={intraById?.intra?.rating ?? 0} precision={0.5} sx={{ color: "#40BCF4" || "#556677", fontSize: "40px" }} />
                </Stack>
            </div>
            <div className='w-full py-3 border border-[#2C3440] flex justify-center'>
                <p className='text-[12px] font-medium graReg tracking-wide text-[#bcd] '>Review or log</p>

            </div>
            <div className='w-full py-3 border border-[#2C3440] flex justify-center'>
                <p className='text-[12px] font-medium graReg tracking-wide text-[#bcd] '>Add to list</p>

            </div>
            <div className='w-full py-3 border border-[#2C3440] flex justify-center'>
                <p className='text-[12px] font-medium graReg tracking-wide text-[#bcd] '>Watchlist</p>

            </div>

        </div>
    )
}

export default UserActivityBar