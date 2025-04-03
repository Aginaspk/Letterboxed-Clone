import React, { useState } from 'react'
import SearchForReview from '../components/Search/SearchForReview'
import { LuX } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { seacrhMovies } from '../redux/searchSlice'
import ListCreateCard from '../components/lists/ListCreateCard'
import { useNavigate } from 'react-router-dom'
import { createList } from '../redux/listsSlice'

function CreateList() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [films, setFilms] = useState(null)
  const [listFilms, setListFilms] = useState([])
  const [filmId,setFilmId] = useState([])
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [isPublic,setIsPublic] = useState(true);
  const { movies } = useSelector(state => state.search)

  const searchFilms = (e) => {
    const val = e.target.value;
    if (!val || !val.trim() === '') {
      setFilms(null)
      return;
    }
    dispatch(seacrhMovies(val))
    setFilms(movies)
  }

  const addToList = (id,item) => {
    const exists = listFilms.some(film => film._id === id);
    if (!exists) {
      setFilmId([...filmId,id])
      setListFilms([...listFilms, item])
    }
  }

  const handleCreateList = async()=>{
    const list = {
      title,
      description,
      movies:filmId,
      isPublic
    }
    try {
      const res = await dispatch(createList(list)).unwrap();
      alert("created")
      navigate('/')
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div className='bg-gradient-to-b from-[#1E252C]/50 via[#1E252C] via-5% to-[#14181C] w-full flex justify-center py-[30px]'>
      <div className='py-7.5 w-[950px] relative'>
        <h1 className='text-[25px] tracking-[0.075em] graReg mt-5 mb-2.5 text-[#AABBCC] border-b border-[#9AB]/50'>New List</h1>
        <div className='w-full flex justify-between mb-[20px]'>
          <div className='w-[450px]'>
            <label htmlFor="" className='text-[13px] '>Name</label>
            <input onChange={(e)=>setTitle(e.target.value)} className='w-full mb-5 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'
              type="text"
              name=""
              id="" />
            <label htmlFor="" className='text-[13px] '>Who can view</label>
            <select onChange={(e)=>setIsPublic(e.target.value)} className='w-full mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#8899AA] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'>
              <option value={true}>Anyone -- Public List</option>
              <option value={false}>Private</option>
            </select>

          </div>
          <div className='w-[430px]'>
            <label htmlFor="" className='text-[13px]'>Description</label>
            <textarea onChange={(e)=>setDescription(e.target.value)} name="" id="" className='w-full h-[230px] mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] shadow-[inset_0_-1px_#456]'></textarea>
          </div>
        </div>
        <div className='w-full flex items-center py-[20px] justify-between'>
          <div className='flex'>
            <button type='submit' className='w-[105px] px-[5px] text-[12px] rounded-l-sm font-semibold py-[10px] bg-[#00ac1c] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra' >ADD A FILM</button>
            <div className='w-[285px] flex flex-col items-center justify-center relative '>
              <input onChange={searchFilms} className='w-[285px] h-[37px] rounded-r-sm bg-[#CCDDEE] p-2.5 text-[#567] graReg shadow-[inset_0_-1px_#fff] text-[14px] focus:bg-white' placeholder='Search for film...' type="text" name="" id="" />
              <div className='z-50 w-[285px] list-none border border-[#C8D8E8] absolute top-[37px] bg-[#445566]  '>
                <div className='max-h-[180px] w-[285px] overflow-y-scroll'>
                  {films?.data?.map((item, index) => {
                    return <li onClick={() => addToList(item._id,item)} key={index} className='text-[12px] graReg text-white py-[6px] hover:bg-[#00Ac1c] cursor-pointer pr-[8px] pl-[10px] bg-[#667788]'>{item?.title} ({item?.releaseYear}) <span className='text-[10px] graReg text-[#D8E0E8]'>{item?.director}</span></li>

                  })}
                </div>
                <div className={`${films ? 'block' : 'hidden'} graReg text-[10px] text-[#BBCCDD] py-[12px] pl-[10px]`}>Film not here? Find out how to add it.</div>
              </div>
            </div>
          </div>
          <div>
            <button onClick={()=>navigate('/')} type='submit' className='w-[105px] px-[5px] text-[13px] rounded-sm font-semibold py-[10px] bg-[#556677] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra' >Cancel</button>
            <button onClick={handleCreateList} type='submit' className='ml-[5px] w-[105px] px-[5px] text-[13px] rounded-sm font-semibold py-[10px] bg-[#00ac1c] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra' >Save</button>
          </div>
        </div>
        {listFilms ? <div className='w-full grid grid-cols-7 z-0 gap-3'>
          {listFilms?.map((item,index)=>{
            return <ListCreateCard item={item}/>
          })}

        </div>:
        <div className='w-full h-[180px] border border-[#9ab]/50 flex justify-center items-center'>
          <div className='text-center'>
            <p className='text-[18px] gra mb-[10px]'>Your list is empty.</p>
            <p className='text-[13px] graReg text-[#667788]'>Add films using the field above, or from the links on a film poster or page.</p>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default CreateList