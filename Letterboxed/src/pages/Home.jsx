import React from 'react'
import Intro from '../components/Intro'
import FeatureCard from '../components/FeatureCard'
import Guide from '../components/Guide'

function Home() {
  const arr = [1, 2, 3, 4, 5, 6]
  return (
    <div>
      <Intro />
      <div className='w-full flex justify-center mb-20'>
        <div className='w-[950px]'>
          <div className=' grid grid-cols-6 pb-[40px]'>
            {arr.map(() => {
              return <FeatureCard />
            })}
          </div>
          <h1 className='text-[13px] tracking-[0.075em] gra mt-5 mb-2.5 text-[#99AABB]'>LETTERBOXED LETS YOU...</h1>
          <Guide/>

        </div>
      </div>
    </div>
  )
}

export default Home