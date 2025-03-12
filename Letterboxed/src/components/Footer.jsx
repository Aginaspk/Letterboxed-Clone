import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { FaBluesky, FaThreads, FaXTwitter } from 'react-icons/fa6'

function Footer() {
    return (
        <div className='bg-[#2C3440] flex justify-center py-8'>
            <div className='flex flex-col gap-3 w-[950px]'>
                <div className='flex justify-between'>
                    <div className='flex list-none'>
                        <li className='gra font-semibold text-[15px] text-[#99AABB] hover:text-[#BBCCEE] hover:cursor-pointer mr-3'>About</li>
                        <li className='gra font-semibold text-[15px] text-[#99AABB] hover:text-[#BBCCEE] hover:cursor-pointer mr-3'>Pro</li>
                        <li className='gra font-semibold text-[15px] text-[#99AABB] hover:text-[#BBCCEE] hover:cursor-pointer mr-3'>News</li>
                        <li className='gra font-semibold text-[15px] text-[#99AABB] hover:text-[#BBCCEE] hover:cursor-pointer mr-3'>Apps</li>
                        <li className='gra font-semibold text-[15px] text-[#99AABB] hover:text-[#BBCCEE] hover:cursor-pointer mr-3'>Podcast</li>
                        <li className='gra font-semibold text-[15px] text-[#99AABB] hover:text-[#BBCCEE] hover:cursor-pointer mr-3'>Year in Review</li>
                        <li className='gra font-semibold text-[15px] text-[#99AABB] hover:text-[#BBCCEE] hover:cursor-pointer mr-3'>Gifts</li>
                        <li className='gra font-semibold text-[15px] text-[#99AABB] hover:text-[#BBCCEE] hover:cursor-pointer mr-3'>Helps</li>
                        <li className='gra font-semibold text-[15px] text-[#99AABB] hover:text-[#BBCCEE] hover:cursor-pointer mr-3'>Terms</li>
                        <li className='gra font-semibold text-[15px] text-[#99AABB] hover:text-[#BBCCEE] hover:cursor-pointer mr-3'>API</li>
                        <li className='gra font-semibold text-[15px] text-[#99AABB] hover:text-[#BBCCEE] hover:cursor-pointer mr-3'>Contact</li>
                    </div>
                    <div className='flex list-none '>
                        <li className='text-[#567] mr-[8px] hover:text-[#99AABB] hover:cursor-pointer '><FaInstagram size={20} /></li>
                        <li className='text-[#567] mr-[8px] hover:text-[#99AABB] hover:cursor-pointer'><FaThreads size={20} /></li>
                        <li className='text-[#567] mr-[8px] hover:text-[#99AABB] hover:cursor-pointer'><FaXTwitter size={20} /></li>
                        <li className='text-[#567] mr-[8px] hover:text-[#99AABB] hover:cursor-pointer'><FaBluesky size={20} /></li>
                        <li className='text-[#567] mr-[8px] hover:text-[#99AABB] hover:cursor-pointer'><FaFacebook size={20} /></li>
                        <li className='text-[#567] mr-[8px] hover:text-[#99AABB] hover:cursor-pointer'><FaTiktok size={20} /></li>
                        <li className='text-[#567] mr-[8px] hover:text-[#99AABB] hover:cursor-pointer'><FaYoutube size={20} /></li>
                    </div>
                </div>
                <div>
                    <h1 className='text-[#667788] text-[11px] mb-3 gra text-left tracking-wider'>© Letterboxd Limited. Made by fans in Aotearoa New Zealand. Film data from TMDB. Mobile site.</h1>
                </div>
            </div>
        </div>
    )
}

export default Footer