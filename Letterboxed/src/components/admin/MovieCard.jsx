import React, { useState } from 'react'
import { FaPen } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { setMovieCreateOpen, setMovieUpdateOpen, setUpdateId } from '../../redux/globalSlices';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFilms, removeFilm } from '../../redux/admin/filmSlice';
import toast from 'react-hot-toast';

function MovieCard({ item }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isHover, setIsHover] = useState(false)

    const removeHandler = async()=>{
        try {
            const res = await dispatch(removeFilm(item._id)).unwrap();
            dispatch(getAllFilms())
            toast.success("deleted")
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div>
            <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className='rounded-sm shadow-[inset_0_0_1px_1px_rgba(20,24,28,0.125)] relative flex justify-center items-center cursor-pointer'>
                <img className='h-full w-full rounded-sm' src={item?.smallPoster || "https://res.cloudinary.com/dup1lh7xk/image/upload/v1741239684/download_fbxwbd.jpg"} alt="" />
                <div onClick={() => navigate(`/filims/${item?._id || item?.id}`)} className={`w-full h-full absolute  hover:border-[3px] hover:border-white rounded-sm z-40`}></div>
                <div className={`absolute gap-16 z-50 bottom-0 py-2 w-full justify-center bg-white/20 ${isHover ? "flex" : "hidden"}`}>
                    <FaPen onClick={() => {
                        dispatch(setMovieUpdateOpen(true));
                        dispatch(setUpdateId(item._id))
                    }} size={20} />
                    <FaDeleteLeft size={25} onClick={removeHandler}/>
                </div>
            </div>
            <h1 className='text-[12px] graReg tracking-wide text-center mt-1 text-[#AABBCC]'>{item?.title}</h1>

        </div>
    )
}

export default MovieCard