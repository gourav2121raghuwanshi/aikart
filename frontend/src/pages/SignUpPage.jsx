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
        <div className='gradientbg min-h-screen pt-24 px-4 pb-10'>
            <div className='mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='glass-panel p-6 md:p-8 flex flex-col justify-center'>
                    <p className='text-[11px] uppercase tracking-[0.2em] text-indigo-300'>Get started</p>
                    <h1 className='text-3xl sm:text-4xl text-slate-50 font-bold mt-1'>
                        Create your account
                    </h1>
                    <p className='text-sm text-slate-300 mt-2'>
                        Join AI-Kart to design apps, test workflows, and launch your own AI tools.
                    </p>

                    <div className='mt-6 grid grid-cols-2 gap-3 text-xs'>
                        <div className='rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2'>
                            <p className='text-slate-400'>Build</p>
                            <p className='text-slate-100 font-semibold'>Prompt-based apps</p>
                        </div>
                        <div className='rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2'>
                            <p className='text-slate-400'>Share</p>
                            <p className='text-slate-100 font-semibold'>Marketplace publishing</p>
                        </div>
                    </div>
                </div>

                <div className='glass-panel p-6 md:p-8'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <input
                            type="text"
                            placeholder='Username'
                            value={formdata.username}
                            className='w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                            id='username'
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder='Email'
                            value={formdata.email}
                            className='w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                            id='email'
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            value={formdata.password}
                            className='w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                            id='password'
                            onChange={handleChange}
                        />
                        <button
                            disabled={loadingg}
                            className='primary-gradient text-white px-4 py-3 rounded-xl uppercase text-sm font-semibold tracking-wide shadow-[0_14px_36px_rgba(79,70,229,0.7)] hover:opacity-95 disabled:opacity-70 transition-all duration-200'
                        >
                            {loadingg ? 'Loading...' : 'Sign up'}
                        </button>

                        <OAuth />
                    </form>

                    <div className='flex gap-2 mt-5 text-sm font-medium'>
                        <p className='text-slate-300'>Already have an account?</p>
                        <Link to={'/sign-in'}>
                            <span className='text-indigo-300 hover:text-indigo-200'>Login</span>
                        </Link>
                    </div>

                    {errorr && <p className='text-red-400 mt-4 font-semibold text-sm'>{errorr}</p>}
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;