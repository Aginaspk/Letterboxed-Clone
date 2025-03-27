import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPopOfWeek, getPopularLists, getRecentlyLiked } from '../redux/listsSlice'
import PopCard from '../components/lists/PopCard'
import ListCard from '../components/ListCard'
import AllTimeCard from '../components/lists/AllTimeCard'
import { Link } from 'react-router-dom'

function ListPage() {
  const dispatch = useDispatch()
  const { popOfWeek } = useSelector(state => state.lists)
  const { recentlyLiked } = useSelector(state => state.lists)
  const { popLists } = useSelector(state => state.lists)


  console.log(recentlyLiked)

  useEffect(() => {
    dispatch(getPopOfWeek())
    dispatch(getPopularLists())
    dispatch(getRecentlyLiked())

  }, [dispatch])
  return (
    <div className='bg-gradient-to-b from-[#1E252C]/50 via[#1E252C] via-5% to-[#14181C] w-full flex justify-center '>
      <div className='py-7.5 w-[950px] relative'>
        <div className='flex justify-center mt-8 mb-[60px]'>
          <img className='w-full' src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1741588121/pro-950_qrg5h9.png" alt="" />
        </div>
        <div className='w-full flex flex-col items-center mb-[30px]'>
          <h1 className='text-[25px] gralight tracking-wider text-center text-[#AABBCC] mb-[10px]'>Collect, curate, and share. Lists are the perfect way to group films.</h1>
          <div className='text-[#9AB] bg-[#283038] shadow-[inset_0_1px_rgba(255,255,255,0.05)] px-[5px] py-[4px] w-[140px] text-[12px] graReg  text-center rounded-sm'>Start your own list</div>
        </div>

        <h1 className='w-full pb-[5px] border-b mb-[20px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra '>POPULAR THIS WEEK</h1>
        <div className={`w-full flex justify-between mb-[45px]`}>
          {popOfWeek?.data?.map((item) => {
            return <Link to={`/list/${item?._id}`}><div className={`w-[296px]`}><PopCard item={item} /></div></Link>
          })}
        </div>
        <div className='flex justify-center mt-8 mb-[60px]'>
          <img className='w-full' src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1741588121/pro-950_qrg5h9.png" alt="" />
        </div>

        <div className='w-full flex justify-between mb-[40px]'>
          <div className='w-[630px]'>
            <h1 className='w-full pb-[5px] border-b mb-[20px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra '>RECENTLY LIKED</h1>
            {recentlyLiked?.data?.map((item) => {
              return <Link to={`/list/${item?._id}`}><div className={` mb-[15px] border-b border-[#456]/50 w-full`}><ListCard item={item} /></div></Link>
            })}


          </div>
          <div className={`w-[230px]`}>
            <img src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1742539950/file-1730249020574_qp5ijo.png" alt="" className='mb-[50px] mt-[20px]' />
          </div>
        </div>
        <h1 className='w-full pb-[5px] border-b mb-[20px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra '>ALLTIME LIST</h1>
        <div className='w-full flex justify-between mb-[40px]'>
          {popLists?.data?.map((item,index) => {
            if(index>1){
              return
            }
            return  <Link to={`/list/${item?._id}`}><div className='w-[460px]'><AllTimeCard item={item} /></div></Link>
          })}
        </div>

      </div>
    </div>
  )
}

export default ListPage