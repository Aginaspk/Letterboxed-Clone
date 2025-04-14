import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFilms } from '../../redux/admin/filmSlice';
import MovieCard from '../../components/admin/MovieCard';
import { setMovieCreateOpen } from '../../redux/globalSlices';
import { seacrhMovies } from '../../redux/searchSlice';

function Movies() {
    const dispatch = useDispatch();
    const [sInput, setSInput] = useState('');
    const { films } = useSelector(state => state.adminFilm)
    const { isMovieCreateOpen } = useSelector(state => state.globState)
    const { movies } = useSelector(state => state.search)


    useEffect(() => {
        if (sInput === '') {
            dispatch(getAllFilms())
        } else {
            dispatch(seacrhMovies(sInput))
        }
    }, [dispatch, isMovieCreateOpen, sInput])
    return (
        <div className='w-full'>
            <div className='w-full flex flex-col items-center mb-[30px]'>
                <h1 className='text-[25px] gralight tracking-wider text-center text-[#AABBCC] mb-[10px]'>Collect, curate, and share. Lists are the perfect way to group films.</h1>
                <div className='text-[#9AB] bg-[#283038] shadow-[inset_0_1px_rgba(255,255,255,0.05)] px-[5px] py-[4px] w-[140px] text-[12px] graReg  text-center rounded-sm' onClick={() => dispatch(setMovieCreateOpen(true))}>Add Movie</div>
            </div>
            <div className='flex justify-end items-center pb-5 border-b border-[#9ab]/50 mb-5'>
                <h3 className='gra text-[13px] text-[#99AABB] mr-2.5 tracking-wide'>FIND A FILIM</h3>
                <input className='w-[230px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'
                    type="text"
                    name=""
                    onChange={(e) => setSInput(e.target.value)}
                    id="" />
            </div>
            <div className='w-full grid grid-cols-5 gap-5'>
                {sInput === '' ? films?.data?.map((item, index) => {
                    return <MovieCard item={item} />
                }) : movies?.data?.map((item, index) => {
                    return <MovieCard item={item} />
                })}
            </div>
        </div>
    )
}

export default Movies