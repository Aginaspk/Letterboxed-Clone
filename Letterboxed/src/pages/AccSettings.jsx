import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/membersSlice';
import SearchForReview from '../components/Search/SearchForReview';
import { getMovieById } from '../redux/movieSlice';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AccSettings() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [selected, setSelected] = useState("profile");
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [film, setFilm] = useState(null)
    const [fav, setFav] = useState([])
    const [favId, setFavId] = useState([])
    const [userInput, setUserInput] = useState({
        userName: "",
        email: "",
    })
    const { user } = useSelector(state => state.auth)
    const cUser = useSelector(state => state.members.user)
    const movieById = useSelector(state => state.movies.movie)
    console.log(fav)


    useEffect(() => {
        dispatch(getUser(user.userId))
    }, [dispatch, user])
    useEffect(() => {
        dispatch(getMovieById(film))
    }, [film])
    useEffect(() => {
        if (Object.keys(movieById).length === 0) {
            return
        } else {
            setFav([...fav, movieById])
            console.log(movieById?.data?._id)
            setFavId([...favId, movieById?.data?._id.toString()])
        }

    }, [movieById])
    const getTheMovie = async (movie) => {
        setFilm(movie)
        setIsSearchOpen(false)
    }


    const handleChange = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value })
    }
    const handleUpdate = async () => {
        const updateData = {
            userName: userInput.userName,
            email: userInput.email,
            favorites: favId
        }
        console.log(updateData)
        try {
            const res = await api.put(`/user/updateUser/${user.userId}`, updateData);
            toast.success("updated")
            navigate('/user-profile')
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }


    return (
        <div className='w-full py-[30px] flex justify-center'>
            <div className='w-[950px]'>
                <h1 className='graReg text-[#AABBCC] text-[26px] mb-[30px]'>Account Settings</h1>
                <div className='flex list-none gap-[15px] border-b border-white/20 mb-[40px]'>
                    <li className={`text-[12px] font-medium pb-[5px] graReg tracking-wide cursor-pointer ${selected === "profile" ? "text-white border-b" : "text-[#00E054]"}`} onClick={() => setSelected("profile")}>PROFILE</li>
                    <li className={`text-[12px] font-medium pb-[5px] graReg tracking-wide cursor-pointer ${selected === "avatar" ? "text-white border-b" : "text-[#00E054]"}`} onClick={() => setSelected("avatar")}>AVATAR</li>
                </div>
                <div className='w-full'>
                    <h2 className='text-[20px] graReg mb-[20px] ml-[4px]'>Profile</h2>
                    <div className='w-full flex justify-between'>
                        <div className='w-[390px]'>
                            <label htmlFor="" className='text-[13px] '>Username</label>
                            <input className='w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'
                                type="text"
                                onChange={handleChange}
                                name="userName"
                                value={cUser?.data?.userName}
                                id="" />
                            <div className='flex justify-between w-full gap-2'>
                                <div className='w-[220px]'>
                                    <label htmlFor="" className='text-[13px] '>Given name</label>
                                    <input className='w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'
                                        type="text"
                                        name="releaseYear"
                                        id="" />
                                </div>
                                <div className='w-[220px]'>
                                    <label htmlFor="" className='text-[13px] '>Family name</label>
                                    <input className='w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'
                                        type="text"
                                        name="director"
                                        id="" />
                                </div>
                            </div>
                            <label htmlFor="" className='text-[13px] '>Email address</label>
                            <input className='w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'
                                type="text"
                                name="email"
                                onChange={handleChange}
                                value={cUser?.data?.email}
                                id="" />
                            <label htmlFor="" className='text-[13px] '>Bio</label>
                            <textarea name="description" id="" className='w-full h-[106px] mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] shadow-[inset_0_-1px_#456]'></textarea>
                            <button type='submit' onClick={handleUpdate}
                                className='px-[12px] mt-[15px] tracking-widest text-[13px] rounded-sm font-semibold py-[6px] bg-[#00ac1c] hover:bg-[#009D1A] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra'>SAVE CHANGES</button>
                        </div>
                        <div className='w-[470px]'>
                            <p className='text-[15px] gra mb-[10px]'>Favorite Films</p>
                            <div className='w-full flex gap-[10px]'>
                                <div onClick={() => setIsSearchOpen(true)} className='w-[110px] h-[165px] flex justify-center items-center bg-[#2c3641] shadow-[inset_0_-1px_#456] border border-[#456] rounded-[4px]'>
                                    {fav[0] ? <img src={fav[0].data?.smallPoster} alt="" /> : <AiFillPlusCircle size={33} className='text-[#3B4B5A]' />}
                                </div>
                                <div onClick={() => setIsSearchOpen(true)} className='w-[110px] h-[165px] flex justify-center items-center bg-[#2c3641] shadow-[inset_0_-1px_#456] border border-[#456] rounded-[4px]'>
                                    {fav[1] ? <img src={fav[1].data?.smallPoster} alt="" /> : <AiFillPlusCircle size={33} className='text-[#3B4B5A]' />}
                                </div>
                                <div onClick={() => setIsSearchOpen(true)} className='w-[110px] h-[165px] flex justify-center items-center bg-[#2c3641] shadow-[inset_0_-1px_#456] border border-[#456] rounded-[4px]'>
                                    {fav[2] ? <img src={fav[2].data?.smallPoster} alt="" /> : <AiFillPlusCircle size={33} className='text-[#3B4B5A]' />}
                                </div>
                                <div onClick={() => setIsSearchOpen(true)} className='w-[110px] h-[165px] flex justify-center items-center bg-[#2c3641] shadow-[inset_0_-1px_#456] border border-[#456] rounded-[4px]'>
                                    {fav[3] ? <img src={fav[3].data?.smallPoster} alt="" /> : <AiFillPlusCircle size={33} className='text-[#3B4B5A]' />}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SearchForReview isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} getTheMovie={getTheMovie} />
        </div>
    )
}

export default AccSettings