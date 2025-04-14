import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLists } from '../../redux/admin/adminlistSlice';
import { Link } from 'react-router-dom';
import PopCard from '../../components/lists/PopCard';
import Lists from '../../components/admin/Lists';

function AdminLists() {
    const dispatch = useDispatch();
    const { lists } = useSelector(state => state.adminList)
    console.log(lists)
    useEffect(() => {
        dispatch(getAllLists())
    }, [dispatch])
    return (
        <div>
            <div className='w-full flex flex-col items-center mb-[30px]'>
                <h1 className='text-[25px] gralight tracking-wider text-center text-[#AABBCC] mb-[10px]'>Collect, curate, and share. Lists are the perfect way to group films.</h1>
            </div>
            <div className='grid grid-cols-3'>
                {lists?.data?.map((item) => {
                    return <div className={`w-[296px]`}><Lists item={item} /></div>
                })}
            </div>
        </div>
    )
}

export default AdminLists