import React from 'react'

function NewPass() {
    return (
        <div className='w-full flex flex-col items-center'>
            <h1 className='text-[#AABBCC] text-[26px]'>Reset Password</h1>
            <p>Reset the Letterboxd password for ‘dryad2op’…</p>
            <form action="">
                <div className='flex flex-col'>
                    <label htmlFor="">New Password</label>
                    <input type="text" name="" id="" />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Confirn Password</label>
                    <input type="text" name="" id="" />
                </div>
            </form>
        </div>
    )
}

export default NewPass