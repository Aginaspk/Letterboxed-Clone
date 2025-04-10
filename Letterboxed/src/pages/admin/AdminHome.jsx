import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminHome() {
    return (
        <div className='bg-gradient-to-b from-[#1E252C]/50 via[#1E252C] via-5% to-[#14181C] w-full'>
            <div className='flex w-full'>
                <div className='w-[18%] bg-[#181D22] h-screen p-5'>
                    <img className='w-full mb-10 h-[50px] object-cover' src="https://a.ltrbxd.com/logos/letterboxd-logo-h-neg-rgb.svg" alt="" />
                    <h1 className='w-full pb-[5px] border-b mb-[15px] border-[#456] text-[#9AB] text-[15px] tracking-[0.075em] graReg'>FILMS</h1>
                    <h1 className='w-full pb-[5px] border-b mb-[15px] border-[#456] text-[#9AB] text-[15px] tracking-[0.075em] graReg'>REVIEWS</h1>
                    <h1 className='w-full pb-[5px] border-b mb-[15px] border-[#456] text-[#9AB] text-[15px] tracking-[0.075em] graReg'>LISTS</h1>
                    <h1 className='w-full pb-[5px] border-b mb-[15px] border-[#456] text-[#9AB] text-[15px] tracking-[0.075em] graReg'>MEMBERS</h1>

                </div>
                <div className='w-[82%] pt-10 px-5'>
                    <Outlet/>
                </div>

            </div>
        </div>
    )
}

export default AdminHome