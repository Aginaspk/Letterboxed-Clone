import React, { useState } from 'react'

function Cast({ movie }) {
    const [selected, setSelected] = useState("cast");
    return (
        <div className='my-[35px] w-full'>
            <div className='flex list-none gap-[15px] border-b border-white/20 mb-[15px]'>
                <li className={`text-[13px] font-medium pb-[5px] gra tracking-wide cursor-pointer ${selected === "cast" ? "text-white border-b" : "text-[#00E054]"}`} onClick={() => setSelected("cast")}>CAST</li>
                <li className={`text-[13px] font-medium pb-[5px] gra tracking-wide cursor-pointer ${selected === "geners" ? "text-white border-b" : "text-[#00E054]"}`} onClick={() => setSelected("geners")}>GENERS</li>
            </div>
            {selected === "cast" ? (
                <div className='flex flex-wrap gap-[6px]'>
                    {movie?.cast?.map((item, index) => (
                        <span
                            key={index}
                            className='py-[3px] px-[5px] shadow-[inset_0_1px_rgba(255,255,255,0.05)] text-[#99AABB] bg-[#283038] rounded-sm text-[13px] gra tracking-wide whitespace-nowrap'
                        >
                            {item}
                        </span>
                    ))}
                </div>
            ) : (
                <div className='flex flex-wrap gap-[6px]'>
                    {movie?.genre?.map((item, index) => (
                        <span
                            key={index}
                            className='py-[3px] px-[5px] shadow-[inset_0_1px_rgba(255,255,255,0.05)] text-[#99AABB] bg-[#283038] rounded-sm text-[13px] gra tracking-wide whitespace-nowrap'
                        >
                            {item}
                        </span>
                    ))}
                </div>
            )}

        </div>
    )
}

export default Cast