import React from 'react'

function WatchListCard() {
    return (
        <div className={` flex flex-row items-center h-[110px] rounded-sm border-2 transition-all duration-200 overflow-hidden`}>
            {item?.movies?.map((movie, index) => {
                if (index > 5) {
                    return;
                }
                return (<img
                    key={index}
                    className="h-full border border-white/30 rounded-[2px]"
                    style={{ marginLeft: index === 0 ? "0" : isAuth ? "-26px" : "-33px", zIndex: item.movies.length - index }}
                    src={movie?.smallPoster}
                    alt={movie?.title || "Movie poster"}
                />)
            })}
        </div>
    )
}

export default WatchListCard