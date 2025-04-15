import React, { use, useEffect } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { MdRssFeed } from 'react-icons/md'
import PosterCard from '../components/PosterCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAvtivity, getReview } from '../redux/reviewSlice'
import ReviewCard from '../components/ReviewCard'
import PopularReviewCard from '../components/PopularReviewCard'
import ReviewUser from '../components/ReviewUser'
import { getWatchlist } from '../redux/movieSlice'
import ListCard from '../components/ListCard'
import { useNavigate } from 'react-router-dom'

function UserProfile() {
    const arr = [1, 2, 3, 4]
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const { activity } = useSelector(state => state.review)
    const { review } = useSelector(state => state.review)
    const { watchlist } = useSelector(state => state.movies)

    useEffect(() => {
        dispatch(getAvtivity(user.userId))
        dispatch(getReview(user.userId))
        dispatch(getWatchlist(user.userId))
    }, [dispatch, user])
    console.log(watchlist)
    return (
        <div className='w-full py-[30px] flex justify-center'>
            <div className='w-[950px]'>
                <div className='w-full flex items-center gap-6 mb-[25px]'>
                    <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                        <img src="https://s.ltrbxd.com/static/img/avatar220-BlsAxsT2.png" alt="" />
                    </div>
                    <h1 className='text-[22px] gra'>{user.userName}</h1>
                    <p className='text-[#c8d4e0] bg-[#556677] text-[11px] gra py-[5px] px-[10px] rounded-[3px] tracking-widest shadow-[inset_0_1px_rgba(255,255,255,0.2)]' onClick={()=>navigate('/settings')}>EDIT PROFILE</p>
                </div>
                <div className='text-[#99AABB] py-[12px] w-full flex justify-end border border-[#456]/50 rounded-[3px] gap-[9px] px-[9px] mb-[40px]'>
                    <IoMdSearch size={16} />
                    <MdRssFeed size={16} />
                </div>
                <div className='w-full flex justify-between'>
                    <div className='w-[630px]'>
                        <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] graReg'>FAVORITES FILMS</h1>
                        <div className='grid grid-cols-4 gap-4 mb-[32px]'>
                            {arr.map((item) => {
                                return <PosterCard key={item} />
                            })}

                        </div>

                        <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] graReg'>RECENT ACTIVITY</h1>
                        <div className='grid grid-cols-4 gap-4 mb-[32px]'>
                            {activity?.data?.map((item, index) => {
                                return <PosterCard key={index} item={item.movie} />
                            })}

                        </div>
                        <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] graReg'>RECENT REVIEWS</h1>
                        <div>
                            {review?.data?.map((item) => {
                                return <ReviewUser item={item} />
                            })}
                        </div>
                    </div>
                    <div>
                        <img src="https://a.ltrbxd.com/sm/upload/8s/ku/fo/ft/pro-250.png?k=f68ea1292e" className='w-[250px] h-[220px] mb-[40px]' alt="" />
                        <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] graReg'>WATCHLIST</h1>
                        <div className={` flex flex-row items-center h-[110px] rounded-sm transition-all duration-200 overflow-hidden`}>
                            {watchlist?.data?.map((item, index) => {
                                if (index > 5) {
                                    return;
                                }
                                return (<img
                                    key={index}
                                    className="h-full rounded-[2px]"
                                    style={{ marginLeft: index === 0 ? "0" : "-33px", zIndex: item?.movie?.length - index }}
                                    src={item?.movie?.smallPoster}
                                    alt={item?.movie?.title || "Movie poster"}
                                />)
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserProfile