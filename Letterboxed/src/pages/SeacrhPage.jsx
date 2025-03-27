import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SearchMovieCard from '../components/Search/SearchMovieCard'
import SearchUserCard from '../components/Search/SearchUserCard'
import SearchReviewCard from '../components/Search/SearchReviewCard'
import SearchListCard from '../components/Search/SearchListCard'
import { useDispatch, useSelector } from 'react-redux'
import { seacrhAll } from '../redux/searchSlice'

function SeacrhPage() {
    const { searchText } = useParams()
    const dispatch = useDispatch()
    const [filter, setFilter] = useState('all')

    const { allSOutput } = useSelector(state => state.search)
    useEffect(() => {
        dispatch(seacrhAll(searchText))
    }, [dispatch, searchText])
    return (
        <div className='w-full flex justify-center py-[30px]'>
            <div className='w-[950px] flex justify-between'>
                <div className='w-[670px]'>
                    <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] graReg '>SHOWING MATCHES FOR "{searchText}"</h1>
                    {(filter === 'all' || filter === 'films') && allSOutput?.data?.films?.map((item, index) => {
                        return <SearchMovieCard key={index} item={item} />
                    })}
                    {(filter === 'all' || filter === 'members') && allSOutput?.data?.users?.map((item, index) => {
                        return <SearchUserCard key={index} item={item} />
                    })}
                    {(filter === 'all' || filter === 'reviews') && allSOutput?.data?.reviews?.map((item, index) => {
                        return <SearchReviewCard key={index} item={item} />
                    })}
                    {(filter === 'all' || filter === 'lists') && allSOutput?.data?.lists?.map((item, index) => {
                        return <SearchListCard key={index} item={item} />
                    })}
                </div>
                <div className='w-[230px]'>
                    <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] graReg '>SHOWING RESULTS FOR</h1>
                    <ul className='list-none w-full'>
                        <li onClick={()=>setFilter('all')} className={`${filter === 'all' ? 'gra bg-[#2C3440] text-white' : "graReg"} cursor-pointer font-medium text-[12px] tracking-wider text-[#99AABB] py-[6px] px-2.5`}>All</li>
                        <li onClick={()=>setFilter('films')} className={`${filter === 'films' ? 'gra bg-[#2C3440] text-white' : "graReg"} cursor-pointer font-medium text-[12px] tracking-wider text-[#99AABB] py-[6px] px-2.5`}>Films</li>
                        <li onClick={()=>setFilter('members')} className={`${filter === 'members' ? 'gra bg-[#2C3440] text-white' : "graReg"} cursor-pointer font-medium text-[12px] tracking-wider text-[#99AABB] py-[6px] px-2.5`}>Members</li>
                        <li onClick={()=>setFilter('reviews')} className={`${filter === 'reviews' ? 'gra bg-[#2C3440] text-white' : "graReg"} cursor-pointer font-medium text-[12px] tracking-wider text-[#99AABB] py-[6px] px-2.5`}>Reviews</li>
                        <li onClick={()=>setFilter('lists')} className={`${filter === 'lists' ? 'gra bg-[#2C3440] text-white' : "graReg"} cursor-pointer font-medium text-[12px] tracking-wider text-[#99AABB] py-[6px] px-2.5`}>List</li>
                    </ul>
                    <img src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1742539950/file-1730249020574_qp5ijo.png" alt="" className='mb-[50px] mt-[20px]' />


                </div>
            </div>
        </div>
    )
}

export default SeacrhPage