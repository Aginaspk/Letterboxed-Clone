import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

function Filter() {
    return (
        <div className='flex justify-between'>
            <div className='flex items-center'>
                <h3 className='gra text-[13px] text-[#99AABB] mr-2.5 tracking-wide'>BROWSE BY</h3>
                <div className='bg-[#1B2127] border border-[#303840] rounded-[4px]'>
                    <ul className='list-none flex tracking-wider'>
                        <li className='pl-2.5 py-[8px] text-[#9AB] text-[13px] font-medium flex relative pr-5.5 hover:text-white cursor-pointer border-r border-[#303840] '>YEAR <MdKeyboardArrowDown className='!text-[#495664] absolute right-[2px] top-[9px]' size={18} /></li>
                        <li className='pl-2.5 py-[8px] text-[#9AB] text-[13px] font-medium flex relative pr-5.5 hover:text-white cursor-pointer border-r border-[#303840] '>RATING <MdKeyboardArrowDown className='!text-[#495664] absolute right-[2px] top-[9px]' size={18} /></li>
                        <li className='pl-2.5 py-[8px] text-[#9AB] text-[13px] font-medium flex relative pr-5.5 hover:text-white cursor-pointer border-r border-[#303840] '>POPULAR <MdKeyboardArrowDown className='!text-[#495664] absolute right-[2px] top-[9px]' size={18} /></li>
                        <li className='pl-2.5 py-[8px] text-[#9AB] text-[13px] font-medium flex relative pr-5.5 hover:text-white cursor-pointer border-r border-[#303840] '>GENRE <MdKeyboardArrowDown className='!text-[#495664] absolute right-[2px] top-[9px]' size={18} /></li>
                        <li className='pl-2.5 py-[8px] text-[#9AB] text-[13px] font-medium flex relative pr-5.5 hover:text-white cursor-pointer '>OTHERS <MdKeyboardArrowDown className='!text-[#495664] absolute right-[2px] top-[9px]' size={18} /></li>
                    </ul>
                </div>
            </div>
            <div className='flex items-center'>
                <h3 className='gra text-[13px] text-[#99AABB] mr-2.5 tracking-wide'>FIND A FILIM</h3>
                <input className='w-[230px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'
                    type="text"
                    name=""
                    id="" />
            </div>
        </div>
    )
}

export default Filter