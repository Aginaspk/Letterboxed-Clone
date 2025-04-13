import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { LuX } from 'react-icons/lu'
import { CiImageOn } from "react-icons/ci";
import { PiTagSimpleFill } from 'react-icons/pi'
import { useDispatch } from 'react-redux';
import { addFilm } from '../../redux/admin/filmSlice';

function AddMovie({ isOpen, onClose }) {


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        releaseYear: "",
        genre: "",
        cast: "",
        director: "",
        smallDescription: "",
    });

    const dispatch = useDispatch();
    const [smallPoster, setSmallPoster] = useState(null);
    const [bigPoster, setBigPoster] = useState(null);
    const [smallPreview, setSmallPreview] = useState(null);
    const [bigPreview, setBigPreview] = useState(null);


    const onDropSmall = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setSmallPoster(acceptedFiles[0]);
            setSmallPreview(URL.createObjectURL(acceptedFiles[0]));
        }
    };

    const onDropBig = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setBigPoster(acceptedFiles[0]);
            setBigPreview(URL.createObjectURL(acceptedFiles[0]));
        }
    };

    const { getRootProps: getSmallRootProps, getInputProps: getSmallInputProps } = useDropzone({
        onDrop: onDropSmall,
        accept: "image/*",
        multiple: false,
    });

    const { getRootProps: getBigRootProps, getInputProps: getBigInputProps } = useDropzone({
        onDrop: onDropBig,
        accept: "image/*",
        multiple: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!smallPoster || !bigPoster) {
            toast.error("Please upload both small and big posters.");
            return;
        }

        const form = new FormData();
        for (let key in formData) {
            form.append(key, formData[key]);
        }
        form.append("smallPoster", smallPoster);
        form.append("bigPoster", bigPoster);

        try {
            const response = await dispatch(addFilm(form)).unwrap(); // Adjust URL to your endpoint
            toast.success("Movie created successfully");
            onClose();
            // Reset form
            setFormData({ title: "", releaseDate: "", genre: "", cast: "" });
            setSmallPoster(null);
            setBigPoster(null);
            setSmallPreview(null);
            setBigPreview(null);
        } catch (err) {
            console.error(err);
            toast.error("Error creating movie");
        }
    };

    return (
        <dialog open={isOpen} id="my_modal_3" className="modal bg-black/90">
            <div className=" bg-[#445566] relative rounded-sm">
                <form method="dialog">
                    <button className="absolute right-3 top-5" onClick={onClose}><LuX className='text-[#99AABB] hover:text-white' size={30} /></button>
                </form>
                <div className='w-[940px] px-[20px] bg-[#445566]'>
                    <div className='w-full py-[16px] px-[20px] border-b border-[#345] flex items-center'>
                        <PiTagSimpleFill size={30} className='rotate-180 text-[#AABBCC] mr-[14px] mt-[1px]' />
                        <span className='text-[18px] gra '>ADD</span>
                    </div>
                    <div className='w-full flex justify-evenly py-5'>
                        <div className='w-[450px]'>
                            <label htmlFor="" className='text-[13px] '>Title</label>
                            <input onChange={handleChange} className='w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'
                                type="text"
                                name="title"
                                id="" />
                            <div className='flex justify-between w-full '>
                                <div className='w-[220px]'>
                                    <label htmlFor="" className='text-[13px] '>Released Year</label>
                                    <input onChange={handleChange} className='w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'
                                        type="text"
                                        name="releaseYear"
                                        id="" />
                                </div>
                                <div className='w-[220px]'>
                                    <label htmlFor="" className='text-[13px] '>Director</label>
                                    <input onChange={handleChange} className='w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'
                                        type="text"
                                        name="director"
                                        id="" />
                                </div>
                            </div>
                            <label htmlFor="" className='text-[13px] '>Description</label>
                            <textarea onChange={handleChange} name="description" id="" className='w-full h-[106px] mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] shadow-[inset_0_-1px_#456]'></textarea>
                            <label htmlFor="" className='text-[13px] '>Genre</label>
                            <input onChange={handleChange} className='w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'
                                type="text"
                                name="genre"
                                id="" />



                        </div>
                        <div className='w-[430px] px-2'>
                            <div className=' flex justify-between mb-1'>
                                <div className='w-[100px]'>
                                    <label htmlFor="" className='text-[13px]'>Small Poster</label>
                                    <div className='w-[100px] h-[150px] bg-[#2C3440]  shadow-[inset_0_-1px_#456] flex justify-center items-center'>{smallPreview ? <img src={smallPreview} alt="" /> : <CiImageOn />}</div>
                                    <div {...getSmallRootProps()}
                                        className='text-center w-[100px] px-[12px] tracking-widest text-[13px] rounded-sm font-semibold py-[6px] bg-[#00ac1c] hover:bg-[#009D1A] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra'>
                                        <input onChange={handleChange} {...getSmallInputProps()} />
                                        ADD</div>
                                </div>
                                <div className='w-[300px]'>
                                    <label htmlFor="" className='text-[13px]'>Big Poster</label>
                                    <div className='w-[300px] h-[150px] bg-[#2C3440]  shadow-[inset_0_-1px_#456] flex justify-center items-center '>{bigPreview ? <img src={bigPreview} className='object-cover h-full w-full' alt="" /> : <CiImageOn />}</div>
                                    <div {...getBigRootProps()}
                                        className='w-[300px] px-[12px] tracking-widest text-[13px] rounded-sm font-semibold py-[6px] bg-[#00ac1c] hover:bg-[#009D1A] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra'>
                                        <input onChange={handleChange} {...getBigInputProps()} />

                                        ADD</div>

                                </div>
                            </div>
                            <label htmlFor="" className='text-[13px] '>Small Description</label>
                            <input onChange={handleChange} className='w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'
                                type="text"
                                name="smallDescription"
                                id="" />
                            <label htmlFor="" className='text-[13px] '>Cast</label>
                            <input onChange={handleChange} className='w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]'
                                type="text"
                                name="cast"
                                id="" />
                        </div>
                    </div>
                    <div className='w-[880px] bg-[#445566] mr-[20px] py-[16px] border-t border-[#345]'>
                        <div className='w-full flex justify-end '>
                            <button onClick={handleSubmit} className='px-[12px] tracking-widest text-[13px] rounded-sm font-semibold py-[6px] bg-[#00ac1c] hover:bg-[#009D1A] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra'>SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default AddMovie