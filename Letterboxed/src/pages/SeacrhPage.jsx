import React from 'react'
import { useParams } from 'react-router-dom'
import SearchMovieCard from '../components/Search/SearchMovieCard'
import SearchUserCard from '../components/Search/SearchUserCard'
import SearchReviewCard from '../components/Search/SearchReviewCard'
import SearchListCard from '../components/Search/SearchListCard'

function SeacrhPage() {
    const { searchText } = useParams()
    return (
        <div className='w-full flex justify-center py-[30px]'>
            <div className='w-[950px] flex justify-between'>
                <div className='w-[670px]'>
                    <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra '>SHOWING MATCHES FOR "{searchText}"</h1>
                    <SearchMovieCard/>
                    <SearchUserCard/>
                    <SearchReviewCard/>
                    <SearchListCard/>
                </div>
                <div className='w-[230px]'>

                </div>
            </div>
        </div>
    )
}

export default SeacrhPage