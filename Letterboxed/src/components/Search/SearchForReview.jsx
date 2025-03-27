import React, { useState } from 'react'
import { LuX } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { seacrhMovies } from '../../redux/searchSlice';

function SearchForReview({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const [films, setFilms] = useState(null)
    const { movies } = useSelector(state => state.search)

    const searchFilms = (e) => {
        const val = e.target.value;
        if (!val || !val.trim() === '') {
            setFilms(null)
            return;
        }
        dispatch(seacrhMovies(val))
        setFilms(movies)
    }
    return (
        <dialog open={isOpen} id="my_modal_3" className="modal bg-black/90">
            <div className=" bg-[#445566] relative rounded-sm">
                <form method="dialog">
                    <button className="absolute right-3 top-5" onClick={onClose}><LuX className='text-[#99AABB] hover:text-white' size={30} /></button>
                </form>
                <div className='w-[800px]'>
                    <div className='w-full py-[16px] px-[20px] border-b border-[#345]'>
                        <span className='text-[18px] gra '>Add to your films...</span>
                    </div>
                    <div className='w-full p-[20px]'>
                        <div className='w-full py-[20px] flex flex-col items-center justify-center relative '>
                            <input onChange={searchFilms} className='w-[480px] h-[37px] rounded-sm bg-[#CCDDEE] p-2.5 text-[#567] graReg shadow-[inset_0_-1px_#fff] text-[14px] focus:bg-white' placeholder='Search for film...' type="text" name="" id="" />
                            <div className=' w-[480px] list-none border border-[#C8D8E8] absolute top-[56px] bg-[#445566]  '>
                                <div className='max-h-[180px] w-[480px] overflow-y-scroll'>
                                    {films?.data?.map((item, index) => {
                                        return <li key={index} className='text-[12px] graReg text-white py-[6px] hover:bg-[#00Ac1c] cursor-pointer pr-[8px] pl-[10px] bg-[#667788]'>Dune part two (2024) <span className='text-[10px] graReg text-[#D8E0E8]'>Kin ju</span></li>

                                    })}
                                </div>
                                <div className={`${films ? 'block' : 'hidden'} graReg text-[10px] text-[#BBCCDD] py-[12px] pl-[10px]`}>Film not here? Find out how to add it.</div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </dialog>
    )
}

export default SearchForReview