import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNavHover } from '../redux/globalSlices';
import Login from '../auth/Login';
import Register from '../auth/Register';
import ProfileDropDown from './ProfileDropDown';
import { LuSearch } from 'react-icons/lu';
import { BiSearch, BiX } from 'react-icons/bi';
import { PiPlus } from 'react-icons/pi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import SearchForReview from './Search/SearchForReview';
import WriteReview from '../pages/WriteReview';

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [search, setSeacrh] = useState(false)
  const [openS, setOpenS] = useState(false)
  const [sInput, setSInput] = useState("");
  const [isLogOpen, setIsLogOpen] = useState(false)
  const [isWriteOpen, setIsWriteOpen] = useState(false)
  const [movie, setMovie] = useState(null);
  const [isCreateList, setIsCreateList] = useState(false)


  const { isAuth, user } = useSelector(state => state.auth)
  const paths = ["/reset-password/:token", "/filims", "/members", "lists", '/search/:searchText','/user-profile','/settings'];
  const isReset = paths.some(path => matchPath(path, location.pathname));
  const home = ["/"];
  const isHome = home.some(path => matchPath(path, location.pathname));
  const { isNavHover } = useSelector(state => state.globState)


  const closeLogin = () => {
    setIsLoginOpen(false);
  }

  const getSInput = (e) => {
    setSInput(e.target.value)
  }

  const searchAll = (e) => {
    e.preventDefault();
    if (!sInput || sInput.trim() === "") {
      return;
    }
    navigate(`/search/${sInput}`)
    setSInput("")

  }

  const getTheMovie = (movie) => {
    setMovie(movie)
    setIsLogOpen(false)
    setIsWriteOpen(true)
  }

  return (<>
    <div className={`xl:h-[72px] h-[50px] w-full flex justify-center ${(isAuth && isHome) || isReset ? 'bg-[#14181C] static' : 'bg-transparent absolute'}  top-0 nav z-50`} onMouseEnter={() => dispatch(setNavHover(true))} onMouseLeave={() => dispatch(setNavHover(false))}>
      <div className='flex xl:gap-20 items-center '>
        <div className="w-[250px] h-[32px] flex items-center" onClick={() => navigate('/')}>
          <img className='w-full h-full object-cover' src="https://a.ltrbxd.com/logos/letterboxd-logo-h-neg-rgb.svg" alt="" />
        </div>

        <div className='gra list-none xl:flex items-center xl:gap-5 hidden  pt-[2px]'>
          {isLoginOpen ? <Login closeLogin={closeLogin} /> : (
            <>

              {!isAuth ? (<>
                <li className='text-[13px] tracking-wider h-4 hover:text-white cursor-pointer' onClick={() => setIsLoginOpen(true)}>SIGN IN</li>
                <li className='text-[13px] tracking-wider h-4 hover:text-white cursor-pointer' onClick={() => setIsRegisterOpen(true)}>CREATE ACCOUNT</li>
              </>) : <ProfileDropDown user={user} />}

              <Link to={'/filims'}><li className={`text-[13px] tracking-wider h-4 hover:text-white cursor-pointer ${isAuth ? 'text-[#99AABB]' : 'text-[#D8E0E8]'}`}>FILMS</li></Link>
              <Link to={'/lists'}><li className={`text-[13px] tracking-wider h-4 hover:text-white cursor-pointer ${isAuth ? 'text-[#99AABB]' : 'text-[#D8E0E8]'}`}>LISTS</li></Link>
              <Link to={'/members'}><li className={`text-[13px] tracking-wider h-4 hover:text-white cursor-pointer ${isAuth ? 'text-[#99AABB]' : 'text-[#D8E0E8]'}`}>MEMBERS</li></Link>
              <li className={`text-[13px] tracking-wider h-4 hover:text-white cursor-pointer ${isAuth ? 'text-[#99AABB]' : 'text-[#D8E0E8]'}`}>JOURNAL</li>
              {!isAuth ? (
                <form onSubmit={searchAll} className={` flex items-center mt-1 relative`}>
                  <input onChange={getSInput} name='search' value={sInput} className={` w-[140px] h-[30px] rounded-3xl py-[6px] pr-[30px] pl-[10px] focus:bg-white focus:text-[#89a] text-[12px] ${(isHome && isNavHover) ? 'bg-[#D1D2D2] text-[#89a]' : isHome ? 'bg-[#BFC1C2]/30' : 'bg-[#2C3440] shadow-[inset_0_-1px_#456] text-[#567]'}`} type="text" onFocus={() => setSeacrh(true)} />
                  <button type="submit" className='absolute right-2'><BiSearch className={` ${(isHome && isNavHover || search) && 'text-[#89a]'}`} /></button>
                </form>)
                : (<li className={`flex items-center pt-[2px] cursor-pointer ${isAuth ? 'text-[#99AABB]' : 'text-[#D8E0E8]'}`} onClick={() => { setOpenS(!openS); }}>{openS ? <BiX strokeWidth={1} size={20} /> : <BiSearch strokeWidth={1} size={18} />}</li>)
              }

              {isAuth && !openS ? (<div className='flex mt-[3px]'><div onClick={() => setIsLogOpen(true)} className=' flex gap-2 pr-1 relative justify-center items-center pl-[6px] tracking-wider text-[12px] rounded-l-sm font-semibold py-[2px] bg-[#00ac1c] hover:bg-[#009D1A] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra'>
                <PiPlus strokeWidth={15} size={15} />
                <p>LOG</p>
              </div>
                <div onClick={() => setIsCreateList(!isCreateList)} className=' flex relative justify-center items-center tracking-wider text-[13px] rounded-r-sm font-semibold py-[3px] bg-[#009D1A] hover:bg-[#00ac1c] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra'>
                  <MdKeyboardArrowDown className='mx-1' size={15} />
                  <li onClick={()=>navigate('/new-list')} className={`${isCreateList ? "absolute" : "hidden"} w-[100px] top-[23px] right-[0px] border-t-[1px] border-transparent/10 tracking-wider bg-[#667788] text-white graReg font-medium text-[11px] py-[5px]`}><p className=' px-[15px]'>Create a list</p></li>

                </div>
              </div>) :
                (<form onSubmit={searchAll} className={`${!isAuth && 'hidden'} flex items-center mt-1 relative mb-0.5 transition-all duration-300 transform ease-in-out `}>
                  <input onChange={getSInput} value={sInput} className={`${openS ? "w-[140px] opacity-100" : "scale-x-0 opacity-0 "} h-[30px] rounded-3xl py-[6px] pr-[30px] pl-[10px] focus:bg-white focus:text-[#89a] text-[12px] ${(isHome && isNavHover) ? 'bg-[#D1D2D2] text-[#89a]' : isHome ? 'bg-[#BFC1C2]/30' : 'bg-[#2C3440] shadow-[inset_0_-1px_#456] text-[#567]'}`} type="text" onFocus={() => setSeacrh(true)} />
                  <button type='submit' className='absolute right-2'><BiSearch className={`  ${(isHome && isNavHover || search) && 'text-[#89a]'}`} /></button>
                </form>)
              }
            </>
          )}


        </div>
      </div>
    </div>
    <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    <SearchForReview getTheMovie={getTheMovie} isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
    <WriteReview isOpen={isWriteOpen} onClose={() => setIsWriteOpen(false)} id={movie} />

  </>
  )
}

export default Navbar