import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
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

const API_URL = import.meta.env.VITE_API_URL;

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
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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

      const res = await axios.post(
        `${API_URL}/api/user/update/${currentUser._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      const data = res.data;
      console.log(data);

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.response?.data?.message || error.message));
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
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prev) => ({ ...prev, avatar: downloadURL }))
        );
      }
    );
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await axios.delete(
        `${API_URL}/api/user/delete/${currentUser._id}`,
        {
          withCredentials: true,
        }
      );

      const data = res.data;

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
      navigate('/sign-up');
    } catch (err) {
      dispatch(deleteUserFailure(err.response?.data?.message || err.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());

      const res = await axios.get(`${API_URL}/api/auth/signout`, {
        withCredentials: true,
      });

      const data = res.data;

      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }

      dispatch(signoutUserSuccess(data));
    } catch (err) {
      dispatch(signoutUserFailure(err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="mx-auto pt-24 max-w-4xl w-11/12 pb-12">
      <div className="relative overflow-hidden glass-panel px-5 py-5 sm:px-7 sm:py-6 mb-6">
        <div className="absolute -top-16 -right-12 h-36 w-36 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute -bottom-16 left-12 h-32 w-32 rounded-full bg-pink-500/25 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-300">
              Account
            </p>
            <h1 className="sm:text-4xl text-2xl text-slate-50 font-bold">
              Profile Settings
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Manage your personal information and avatar.
            </p>
          </div>
          <Link
            to={`/user-apps/${currentUser._id}`}
            className="inline-flex items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-500/15 px-4 py-1.5 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/25"
          >
            Your Apps
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-5 sm:p-7 flex flex-col max-w-4xl gap-5">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          accept='image/*'
          hidden
        />

        <div className="self-center text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-2 rounded-full primary-gradient opacity-40 blur-xl" />
            <img
              src={formData?.avatar || currentUser?.avatar}
              onClick={() => fileRef.current.click()}
              alt="profile image"
              loading='lazy'
              className='relative rounded-full h-24 w-24 sm:h-40 sm:w-40 object-cover cursor-pointer border-2 border-slate-800/80'
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">Click image to change avatar</p>
        </div>

        <p className='text-sm self-center min-h-6'>
          {fileUploadError ? (
            <span className='text-red-400 text-sm font-semibold'>
              Error in Image Uploading (image must be less than 2Mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-indigo-300 text-sm font-semibold'>
              Uploading {filePerc}%
            </span>
          ) : filePerc === 100 ? (
            <span className='text-emerald-300 text-sm font-semibold'>
              Image Uploaded Successfully
            </span>
          ) : (
            ""
          )}
        </p>

        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          className='w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          id='username'
          onChange={handleChange}
        />

        <input
          type='text'
          placeholder='email'
          defaultValue={currentUser.email}
          className='w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          id='email'
          onChange={handleChange}
        />

        <input
          type='password'
          placeholder='password'
          className='w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='primary-gradient text-white text-sm sm:text-base font-semibold rounded-xl px-4 py-3 uppercase tracking-wide shadow-[0_14px_36px_rgba(79,70,229,0.8)] hover:shadow-[0_18px_42px_rgba(79,70,229,0.95)] disabled:opacity-70'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>

      <div className='flex justify-between mt-4 px-2'>
        <span
          onClick={handleDeleteUser}
          className='text-red-400 text-sm sm:text-base font-semibold cursor-pointer hover:text-red-300'
        >
          Delete Account
        </span>

        <span
          onClick={handleSignOut}
          className='text-red-400 text-sm sm:text-base font-semibold cursor-pointer hover:text-red-300'
        >
          Sign Out
        </span>
      </div>

      <p className='text-red-400 font-semibold sm:text-lg text-sm mt-5'>
        {error || ""}
      </p>

      <p className='text-emerald-300 font-semibold sm:text-lg text-sm mt-2'>
        {updateSuccess ? 'User is Updated Successfully!!' : ""}
      </p>
    </div>
  );
};

export default ProfilePage;