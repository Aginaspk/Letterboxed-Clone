import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMemebrs } from '../../redux/admin/adminMemebrSlice'
import MemberLsitCard from '../../components/members/MemberLsitCard'
import MemebrsCard from '../../components/admin/MemebrsCard'

function AdminMembers() {
    const dispatch = useDispatch()
    const { members } = useSelector(state => state.adminMembers)
    console.log(members)

    useEffect(() => {
        dispatch(getAllMemebrs())
    }, [dispatch])
    return (
        <div>
            <div className='w-full flex flex-col items-center mb-[30px]'>
                <h1 className='text-[25px] gralight tracking-wider text-center text-[#AABBCC] mb-[10px]'>Collect, curate, and share. Lists are the perfect way to group films.</h1>
            </div>
            <div>
                {members?.data?.map((item,index)=>{
                    return <MemebrsCard key={index} item={item}/>
                })}
            </div>
        </div>
    )
}

export default AdminMembers