import React, { useEffect } from 'react'
import FeaturedMember from '../components/members/FeaturedMember'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMembers, getPopOfTheWeek, getPopReviwers } from '../redux/membersSlice';
import MemberLsitCard from '../components/members/MemberLsitCard';

function Members({ item }) {
    const dispatch = useDispatch()
    const { popReviwers, popOfWeek, members } = useSelector(state => state.members);
    console.log(members)
    useEffect(() => {
        dispatch(getPopReviwers())
        dispatch(getPopOfTheWeek())
        dispatch(getAllMembers())
    }, [dispatch])

    return (
        <div className='bg-gradient-to-b from-[#1E252C]/50 via[#1E252C] via-5% to-[#14181C] w-full flex justify-center '>
            <div className='py-7.5 w-[950px] relative'>
                <div className='flex justify-center mt-8 mb-[60px]'>
                    <img className='w-full' src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1741588121/pro-950_qrg5h9.png" alt="" />
                </div>
                <div className='w-full flex flex-col items-center mb-[30px]'>
                    <h1 className='text-[25px] gra tracking-wider text-center text-[#AABBCC] mb-[10px]'>Film lovers, critics and friends — find popular members.</h1>
                </div>

                <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra'>FEATURED MEMBERS</h1>
                <div className='w-full grid grid-cols-5 mt-5 mb-[32px]'>
                    {popReviwers?.data?.map((item, index) => {
                        return <FeaturedMember item={item} />
                    })}
                </div>
                <h1 className='w-full pb-[5px] border-b mb-[10px] border-[#456] text-[#9AB] text-[12px] tracking-[0.075em] gra'>POPULATR THIS WEEK</h1>
                <div className='w-full grid grid-cols-5 mt-5 mb-[32px]'>
                    {popOfWeek?.data?.map((item, index) => {
                        return <FeaturedMember item={item} />
                    })}
                </div>

                <div className='flex justify-center mt-8 mb-[60px]'>
                    <img className='w-full' src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1741588121/pro-950_qrg5h9.png" alt="" />
                </div>
                <div className='w-full flex justify-between '>
                    <div className='w-[630px]'>
                        <div className='w-full flex flex-col'>
                            {members?.data?.map((item, index) => {
                                return <MemberLsitCard item={item} />
                            })}
                        </div>
                    </div>
                    <div className={`w-[230px]`}>
                        <img src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1742539950/file-1730249020574_qp5ijo.png" alt="" className='mb-[50px] mt-[20px]' />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Members