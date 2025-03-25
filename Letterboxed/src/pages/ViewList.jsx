import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListById, isUserLiked, likeAList } from '../redux/listsSlice'
import { useParams } from 'react-router-dom'
import { IoFlag } from 'react-icons/io5'
import PosterCard from '../components/PosterCard'
import CommentCard from '../components/CommentCard'
import { TiHeart } from 'react-icons/ti'

function ViewList() {
  const dispatch = useDispatch()
  const { listId } = useParams()
  const [like, setLike] = useState(false);
  const { listById } = useSelector(state => state.lists)
  const { isLiked } = useSelector(state => state.lists)
  const { isAuth, user } = useSelector(state => state.auth)
  const { isNavHover } = useSelector(state => state.globState)
  console.log(isLiked)

  useEffect(() => {
    dispatch(getListById(listId))

  }, [dispatch, like])
  useEffect(() => {
    if (isAuth) {
      dispatch(isUserLiked(listId))
    }

  }, [like])


  const likeList = async () => {
    try {
      const res = await dispatch(likeAList(listId)).unwrap();
      setLike(!like)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='w-full flex flex-col items-center xl:relative bg-[#14181C] relative '>
      <div className='xl:w-[1200px] w-full xl:h-[600px] overflow-hidden absolute z-0'>
        <div className={`absolute hidden xl:block inset-x-0 top-0 ${isNavHover ? 'h-2/12' : 'h-1/12'} bg-gradient-to-b from-[#14181C] via-[#14181c80] to-transparent`}></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 xl:h-4/5 bg-gradient-to-t from-[#14181C] via-[#14181c80] to-transparent"></div>
        <div className="absolute hidden xl:block inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#14181C] via-[#14181c80] to-transparent"></div>
        <div className="absolute hidden xl:block inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#14181C] via-[#14181c80] to-transparent"></div>
        <img className='w-full h-full object-cover' src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1741239608/movie_glxp8k_ybwd3w.jpg" alt="Movie Image" />
      </div>

      <div className='w-[950px] h-[400px]'></div>
      <div className='w-[950px] z-50 flex justify-between'>
        <div className='w-[670px]'>
          <div className='flex items-center pb-[8px]  border-b border-[#456]'>
            <div className='w-[24px] h-[24px] rounded-full overflow-hidden mr-1'>
              <img className='w-full h-full' src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" alt="" />
            </div>
            <p className='font-bold gra text-[14px] text-[#AABBCC] mr-2'><span className='text-[12px] text-[#667788] font-medium'>Created by </span>{listById?.data?.user?.userName}</p>
          </div>
          <div className='py-[5px] border-b border-[#456] mb-[10px]'>
            <p className='text-[11px] text-[#667788]'>Created {listById?.data?.createdAt.split("T")[0]}</p>
          </div>
          <h1 className='text-[22px] gra font-semibold tracking-wider mb-[10px]'>{listById?.data?.title}</h1>
          <IoFlag size={16} className='text-[#778899] mb-5' />
          <div className='grid grid-cols-5 gap-2.5 mb-[70px]'>
            {listById?.data?.movies?.map((item, index) => {
              return (
                <div><PosterCard item={item} /><h1 className='text-[12px] tracking-[0.075em] gra text-center pt-[5px]'>{index + 1}</h1></div>
              )
            })}
          </div>
          <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra'>{listById?.data?.comments?.length} COMMENTS</h1>
          {listById?.data?.comments?.map((item, index) => {
            return <CommentCard item={item} />
          })}


        </div>
        <div className='w-[230px]'>
          <div className='w-full bg-[#445566] rounded-sm'>
            <div className='w-full py-3 border-b border-[#2C3440] flex justify-center' onClick={likeList}>
              <p className='text-[12px] flex font-medium gra tracking-wide text-[#bcd] '><TiHeart className={`${isLiked?.isLiked ? 'text-[#FF9010]' : "text-[#778899]"}`} size={16} />Like this list? <span className='text-[#8899AA] ml-2'>{listById?.data?.likes.length}</span></p>

            </div>
            <div className='w-full py-3 border-b border-[#2C3440] flex justify-center'>
              <p className='text-[12px] font-medium gra tracking-wide text-[#bcd] '>Share</p>

            </div>
          </div>
          <img src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1742539950/file-1730249020574_qp5ijo.png" alt="" className='mb-[50px] mt-[20px]' />

        </div>
      </div>
    </div>
  )
}

export default ViewList