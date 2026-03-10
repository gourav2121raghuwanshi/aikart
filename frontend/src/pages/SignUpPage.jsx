import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signUpStart, signUpSuccess, signUpFailure } from "../redux/user/userSlice";
import OAuth from '../components/OAuth';

const API_URL = import.meta.env.VITE_API_URL;
const SignUpPage = () => {
    const [formdata, setformdata] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errorr, setError] = useState(null);
    const [loadingg, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setformdata({
            ...formdata,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            dispatch(signUpStart());

            const res = await axios.post(
                `${API_URL}/api/auth/signup`,
                formdata,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            const data = res.data;

            if (data.success === false) {
                setLoading(false);
                dispatch(signUpFailure(data.message));
                setError(data.message);
                return;
            }

            setLoading(false);
            setError(null);
            dispatch(signUpSuccess(data));
            navigate('/');
        } catch (error) {
            setLoading(false);
            const msg = error.response?.data?.message || error.message;
            dispatch(signUpFailure(msg));
            setError(msg);
            console.error('Error:', error.response?.data || error.message);
        }
    };

    return (
        <div className='p-5 pt-24 max-w-2xl mx-auto'>
            <h1 className='text-2xl sm:text-4xl text-slate-700 text-center font-semibold my-7'>
                Sign Up
            </h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type="text"
                    placeholder='username'
                    value={formdata.username}
                    className='sm:text-xl font-semibold border p-3 rounded-lg'
                    id='username'
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder='email'
                    value={formdata.email}
                    className='sm:text-xl font-semibold border p-3 rounded-lg'
                    id='email'
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder='password'
                    value={formdata.password}
                    className='sm:text-xl font-semibold border p-3 rounded-lg'
                    id='password'
                    onChange={handleChange}
                />
                <button
                    disabled={loadingg}
                    className='bg-slate-700 text-white p-3 sm:text-xl py-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition-all duration-200'
                >
                    {loadingg ? 'Loading...' : 'Sign up'}
                </button>

                <OAuth />
            </form>

            <div className='flex gap-3 mt-5 sm:text-xl font-semibold'>
                <p>Have an account?</p>
                <Link to={'/sign-in'}>
                    <span className='text-blue-700'>Login</span>
                </Link>
            </div>

            {errorr && <p className='text-red-500 mt-5 font-semibold text-xl'>{errorr}</p>}
        </div>
    );
};

export default SignUpPage;