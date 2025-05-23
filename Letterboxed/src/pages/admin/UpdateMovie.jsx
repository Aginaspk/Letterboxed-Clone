import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { LuX } from 'react-icons/lu';
import { CiImageOn } from 'react-icons/ci';
import { PiTagSimpleFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieById } from '../../redux/movieSlice';
import { getAllFilms, updateFilm } from '../../redux/admin/filmSlice';

function UpdateMovie({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        releaseYear: '',
        genre: '',
        cast: '',
        director: '',
        smallDescription: '',
    });

    const dispatch = useDispatch();
    const [smallPoster, setSmallPoster] = useState(null);
    const [bigPoster, setBigPoster] = useState(null);
    const [smallPreview, setSmallPreview] = useState(null);
    const [bigPreview, setBigPreview] = useState(null);
    const { movie } = useSelector((state) => state.movies);
    const { updateId } = useSelector((state) => state.globState);

    useEffect(() => {
        if (updateId) {
            dispatch(getMovieById(updateId));
        }
    }, [dispatch, updateId]);

    useEffect(() => {
        if (movie?.data) {
            setFormData({
                title: movie.data.title || '',
                description: movie.data.description || '',
                releaseYear: movie.data.releaseYear || '',
                genre: movie.data.genre?.join(',') || '',
                cast: movie.data.cast?.join(',') || '',
                director: movie.data.director || '',
                smallDescription: movie.data.smallDescription || '',
            });
            setSmallPreview(movie.data.smallPoster || null);
            setBigPreview(movie.data.bigPoster || null);
        }
    }, [movie]);

    const onDropSmall = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setSmallPoster(acceptedFiles[0]);
            setSmallPreview(URL.createObjectURL(acceptedFiles[0]));
        }
    }, []);

    const onDropBig = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setBigPoster(acceptedFiles[0]);
            setBigPreview(URL.createObjectURL(acceptedFiles[0]));
        }
    }, []);

    const { getRootProps: getSmallRootProps, getInputProps: getSmallInputProps } = useDropzone({
        onDrop: onDropSmall,
        accept: 'image/*',
        multiple: false,
    });

    const { getRootProps: getBigRootProps, getInputProps: getBigInputProps } = useDropzone({
        onDrop: onDropBig,
        accept: 'image/*',
        multiple: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.releaseYear || !formData.director || !formData.genre) {
            toast.error('Please fill all required fields.');
            return;
        }

        const form = new FormData();
        for (let key in formData) {
            form.append(key, formData[key]);
        }
        if (smallPoster) {
            form.append('smallPoster', smallPoster);
        }
        if (bigPoster) {
            form.append('bigPoster', bigPoster);
        }

        try {
            await dispatch(updateFilm({ id: updateId, value: form })).unwrap();
            toast.success('Movie updated successfully');
            onClose();
            dispatch(getAllFilms())
        } catch (err) {
            console.error(err);
            toast.error('Error updating movie');
        }
    };

    return (
        <dialog open={isOpen} id="my_modal_3" className="modal bg-black/90">
            <div className="bg-[#445566] relative rounded-sm">
                <form method="dialog">
                    <button className="absolute right-3 top-5" onClick={onClose}>
                        <LuX className="text-[#99AABB] hover:text-white" size={30} />
                    </button>
                </form>
                <div className="w-[900px] bg-[#445566]">
                    <div className="w-full py-[16px] px-[20px] border-b border-[#345] flex items-center">
                        <PiTagSimpleFill size={30} className="rotate-180 text-[#AABBCC] mr-[14px] mt-[1px]" />
                        <span className="text-[18px] gra">Update</span>
                    </div>
                    <div className="w-full flex justify-evenly py-5">
                        <div className="w-[450px]">
                            <label htmlFor="title" className="text-[13px]">
                                Title
                            </label>
                            <input
                                onChange={handleChange}
                                className="w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]"
                                type="text"
                                name="title"
                                value={formData.title}
                            />
                            <div className="flex justify-between w-full">
                                <div className="w-[220px]">
                                    <label htmlFor="releaseYear" className="text-[13px]">
                                        Released Year
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        className="w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]"
                                        type="text"
                                        name="releaseYear"
                                        value={formData.releaseYear}
                                    />
                                </div>
                                <div className="w-[220px]">
                                    <label htmlFor="director" className="text-[13px]">
                                        Director
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        className="w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]"
                                        type="text"
                                        name="director"
                                        value={formData.director}
                                    />
                                </div>
                            </div>
                            <label htmlFor="description" className="text-[13px]">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={handleChange}
                                name="description"
                                className="w-full h-[106px] mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] shadow-[inset_0_-1px_#456]"
                            />
                            <label htmlFor="genre" className="text-[13px]">
                                Genre
                            </label>
                            <input
                                onChange={handleChange}
                                className="w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]"
                                type="text"
                                name="genre"
                                value={formData.genre}
                            />
                        </div>
                        <div className="w-[430px] px-2">
                            <div className="flex justify-between mb-1">
                                <div className="w-[100px]">
                                    <label htmlFor="smallPoster" className="text-[13px]">
                                        Small Poster
                                    </label>
                                    <div className="w-[100px] h-[150px] bg-[#2C3440] shadow-[inset_0_-1px_#456] flex justify-center items-center">
                                        {smallPreview ? (
                                            <img src={smallPreview} alt="Small Poster" className="object-cover h-full w-full" />
                                        ) : (
                                            <CiImageOn size={50} />
                                        )}
                                    </div>
                                    <div
                                        {...getSmallRootProps()}
                                        className="text-center w-[100px] px-[12px] tracking-widest text-[13px] rounded-sm font-semibold py-[6px] bg-[#00ac1c] hover:bg-[#009D1A] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra"
                                    >
                                        <input {...getSmallInputProps()} />
                                        ADD
                                    </div>
                                </div>
                                <div className="w-[300px]">
                                    <label htmlFor="bigPoster" className="text-[13px]">
                                        Big Poster
                                    </label>
                                    <div className="w-[300px] h-[150px] bg-[#2C3440] shadow-[inset_0_-1px_#456] flex justify-center items-center">
                                        {bigPreview ? (
                                            <img src={bigPreview} alt="Big Poster" className="object-cover h-full w-full" />
                                        ) : (
                                            <CiImageOn size={50} />
                                        )}
                                    </div>
                                    <div
                                        {...getBigRootProps()}
                                        className="text-center w-[300px] px-[12px] tracking-widest text-[13px] rounded-sm font-semibold py-[6px] bg-[#00ac1c] hover:bg-[#009D1A] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra"
                                    >
                                        <input {...getBigInputProps()} />
                                        ADD
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="smallDescription" className="text-[13px]">
                                Small Description
                            </label>
                            <input
                                onChange={handleChange}
                                className="w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]"
                                type="text"
                                value={formData.smallDescription}
                                name="smallDescription"
                            />
                            <label htmlFor="cast" className="text-[13px]">
                                Cast
                            </label>
                            <input
                                onChange={handleChange}
                                className="w-full mb-1 mt-[5px] px-[9px] pt-[9px] pb-[8px] text-[#567] text-[14px] outline-0 focus:bg-white rounded-[3px] bg-[#2C3440] h-[36px] shadow-[inset_0_-1px_#456]"
                                type="text"
                                name="cast"
                                value={formData.cast}
                            />
                        </div>
                    </div>
                    <div className="w-[880px] bg-[#445566] mr-[20px] py-[16px] border-t border-[#345]">
                        <div className="w-full flex justify-end">
                            <button
                                onClick={handleSubmit}
                                className="px-[12px] tracking-widest text-[13px] rounded-sm font-semibold py-[6px] bg-[#00ac1c] hover:bg-[#009D1A] shadow-[inset_0_1px_0_hsla(0,0%,100%,0.3)] text-white gra"
                            >
                                SAVE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
}

export default UpdateMovie;