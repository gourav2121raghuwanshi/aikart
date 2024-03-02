import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { Link } from 'react-router-dom'
import { app } from '../firebase'
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signoutUserStart,
    signoutUserSuccess,
    signoutUserFailure
} from '../redux/user/userSlice';

const ProfilePage = () => {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            // console.log(formData);
            const res = await axios.post(`/api/user/update/${currentUser._id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(res);
            const data = await res.data;

            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            // console.log(error);
            dispatch(updateUserFailure(error.message));
        }
    };
    const handleFileUpload = (file) => {

        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setFormData({ ...formData, avatar: downloadURL })
                );
            }
        );
    };

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            console.log(currentUser._id);
            const res = await axios.delete(`/api/user/delete/${currentUser._id}`);
            const data = await res.data;

            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
            navigate('/sign-up');
        }
        catch (err) {
            dispatch(deleteUserFailure(err.message));
            <p className='text-red-600 font-semibold sm:text-2xl text-lg mt-7'>{error ? error.message : ""}</p>

        }
    }

    const handleSignOut = async () => {
        try {
            dispatch(signoutUserStart())
            const res = await axios.get(`/api/auth/signout`);
            const data = await res.data;
            if (data.success === false) {
                dispatch(signoutUserFailure(data.message))
                return;
            }
            dispatch(signoutUserSuccess(data))
        }
        catch (err) {
            dispatch(signoutUserFailure(err.message))
        }
    }


    return (
        <div className='mx-auto pt-24 max-w-2xl w-10/12'>
            <div className='flex justify-between items-center'>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div><h1 className='sm:text-4xl text-2xl text-gray-700 font-bold text-center my-7 '>Profile</h1></div>
                <Link to={`/user-apps/${currentUser._id}`} className=' bg-green-800 text-white px-2 py-1 rounded'>Your Apps</Link>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col max-w-2xl  gap-6'>
                <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type='file'
                    ref={fileRef}
                    accept='image/*'
                    hidden
                />
                <img
                    src={formData?.avatar || currentUser?.avatar}
                    onClick={() => fileRef.current.click()}
                    alt="profile image"
                    loading='lazy'
                    className='rounded-full h-20 w-20  sm:h-40 sm:w-40 object-cover cursor-pointer mt-4 self-center'
                />
                <p className='text-sm self-center'>
                    {
                        fileUploadError ?
                            <span className='text-red-700 text-xl font-semibold'>Error in Image Uploading (image must be less than 2Mb )</span> :
                            filePerc > 0 && filePerc < 100 ?
                                <span className='text-slate-700 text-xl font-semibold'> Uploading {filePerc}% </span> :
                                filePerc === 100 ? <span className='text-green-700 text-xl font-semibold'>Image Uploaded Successfully</span> : ""
                    }
                </p>
                <input
                    type='text'
                    placeholder='username'
                    defaultValue={currentUser.username}
                    className='border ring-opacity-50 shadow-lg border-grey-200 sm:text-2xl p-2 sm:p-5 rounded-lg '
                    id='username'
                    onChange={handleChange}
                />
                <input type='text'
                    placeholder='email' defaultValue={currentUser.email}
                    className='border border-grey-200 ring-opacity-50 shadow-lg sm:text-2xl p-2 sm:p-5 rounded-lg '
                    id='email'
                    onChange={handleChange}
                />
                <input type='password'
                    placeholder='password' defaultValue={currentUser.password}
                    className='border border-grey-200  ring-opacity-50 shadow-lg sm:text-2xl p-2 sm:p-5 rounded-lg '
                    id='password'
                    onChange={handleChange}
                />
                <button disabled={loading} className='bg-slate-700 text-white  sm:text-2xl text-lg font-semibold rounded-lg p-1 sm:p-5 uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Update'}
                </button>
               
            </form>
            <div className='flex justify-between mt-4'>
        <span onClick={handleDeleteUser} className='text-red-500 text-lg sm:text-xl md:text-2xl font-semibold   cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-500 text-lg sm:text-xl md:text-2xl font-semibold   cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-600 font-semibold sm:text-2xl text-lg mt-7'>{error ? error.message : ""}
      </p>
      <p
        className='text-green-600 font-semibold sm:text-2xl text-lg mt-7'>
        {updateSuccess ? 'User is Updated Successfully!!' : ""}
      </p>
    
        </div>
    )
}

export default ProfilePage