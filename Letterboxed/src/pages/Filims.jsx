import React from 'react'
import Filter from '../components/filims/Filter'

function Filims() {
    return (
        <div className='bg-gradient-to-b from-[#1E252C]/50 via[#1E252C] via-5% to-[#14181C] w-full flex justify-center'>
            <div className='py-7.5 w-[950px]'>
                <div className='flex justify-center mt-8 mb-[60px]'>
                    <img className='w-[728px] h-[90px]' src="https://res.cloudinary.com/dup1lh7xk/image/upload/v1742457651/file-1730249079740_gei6s0.png" alt="" />
                </div>
                <div>
                    <Filter/>
                </div>
            </div>
        </div>
    )
}

export default Filims