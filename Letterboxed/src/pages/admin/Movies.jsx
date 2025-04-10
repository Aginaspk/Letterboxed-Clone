import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFilms } from '../../redux/admin/filmSlice';
import MovieCard from '../../components/admin/MovieCard';

function Movies() {
    const dispatch = useDispatch();
    const {films} = useSelector(state=>state.adminFilm)
    console.log(films)

    useEffect(()=>{
        dispatch(getAllFilms())
    },[dispatch])
    return (
        <div className='w-full'>
                <div className='w-full flex flex-col items-center mb-[30px]'>
                    <h1 className='text-[25px] gralight tracking-wider text-center text-[#AABBCC] mb-[10px]'>Collect, curate, and share. Lists are the perfect way to group films.</h1>
                    <div className='text-[#9AB] bg-[#283038] shadow-[inset_0_1px_rgba(255,255,255,0.05)] px-[5px] py-[4px] w-[140px] text-[12px] graReg  text-center rounded-sm'>Add Movie</div>
                </div>
                <div className='w-full grid grid-cols-5 gap-5'>
                    {films?.data?.map((item,index)=>{
                        return <MovieCard item={item}/>
                    })}
                </div>
        </div>
    )
}

export default Movies