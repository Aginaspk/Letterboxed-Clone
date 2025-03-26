import React from 'react'

function SearchUserCard() {
    return (
        <div className='w-full border-b flex border-[#456]/50 pt-[15px] pb-[15px] justify-between items-center'>
            <div className='w-[76px] flex items-center'>
                <div className='w-[40px] h-[40px] overflow-hidden rounded-full'>
                    <img className='w-full h-full' src="https://s.ltrbxd.com/static/img/avatar48-DSi8lXxI.png" alt="" />
                </div>

            </div>
            <div className='w-[580px] leading-5 flex flex-col justify-center'>
                <h1 className='text-[20px] gra font-bold tracking-wider'>Rinshad </h1>
                <p className='text-[12px] text-[#778899]'>rinshad</p>
            </div>
        </div>
    )
}

export default SearchUserCard