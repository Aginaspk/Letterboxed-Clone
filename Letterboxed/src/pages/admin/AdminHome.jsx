import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import UpdateMovie from './UpdateMovie'
import { useDispatch, useSelector } from 'react-redux'
import { setMovieCreateOpen, setMovieUpdateOpen } from '../../redux/globalSlices'
import AddMovie from './AddMovie'

function AdminHome() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { isMovieCreateOpen, isMovieUpdateOpen } = useSelector(state => state.globState)

    return (
        <>
            <div className='bg-gradient-to-b from-[#1E252C]/50 via[#1E252C] via-5% to-[#14181C] w-full '>
                <div className='flex w-full'>
                    <div className='w-[18%] bg-[#181D22] h-screen p-5 fixed '>
                        <img className='w-full mb-10 h-[50px] object-cover' src="https://a.ltrbxd.com/logos/letterboxd-logo-h-neg-rgb.svg" alt="" />
                        <h1 className='w-full pb-[5px] border-b mb-[15px] border-[#456] text-[#9AB] text-[15px] tracking-[0.075em] graReg' onClick={() => navigate('')}>FILMS</h1>
                        <h1 className='w-full pb-[5px] border-b mb-[15px] border-[#456] text-[#9AB] text-[15px] tracking-[0.075em] graReg' onClick={() => navigate('reviews')}>REVIEWS</h1>
                        <h1 className='w-full pb-[5px] border-b mb-[15px] border-[#456] text-[#9AB] text-[15px] tracking-[0.075em] graReg' onClick={() => navigate('lists')}>LISTS</h1>
                        <h1 className='w-full pb-[5px] border-b mb-[15px] border-[#456] text-[#9AB] text-[15px] tracking-[0.075em] graReg' onClick={() => navigate('members')}>MEMBERS</h1>

                    </div>
                    <div className='w-[82%] pt-10 px-5  ml-[274px]'>
                        <Outlet />
                    </div>

                </div>
            </div>
            <AddMovie isOpen={isMovieCreateOpen} onClose={() => dispatch(setMovieCreateOpen(false))} />
            <UpdateMovie isOpen={isMovieUpdateOpen} onClose={() => dispatch(setMovieUpdateOpen(false))} />
        </>
    )
}

export default AdminHome