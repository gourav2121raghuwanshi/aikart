import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL;

const MarketPlace = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [market, setMarket] = useState([]);

  useEffect(() => {
    const getMarket = async () => {
      try {
        const res = await axios.get(`${API_URL}/ai/getprompts`, {
          withCredentials: true,
        });
        setMarket(res.data);
      } catch (err) {
        console.log('cannot get market ', err);
      }
    };

    getMarket();
  }, []);

  const isLoggedIn = currentUser !== null;

  return (
    <div id="marketplace" className="gradientbg min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden glass-panel mb-8 px-5 py-6 md:px-8 md:py-7">
          <div className="absolute -top-16 -right-10 h-44 w-44 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute -bottom-16 left-8 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-indigo-300">
                Discover
              </p>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-50 mt-1">
                AI Marketplace
              </h1>
              <p className="mt-2 text-sm text-slate-300 max-w-xl">
                Browse apps built by creators, test ideas instantly, and run
                production-ready AI experiences from one place.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-slate-700/70 bg-slate-900/75 px-3 py-2">
                <p className="text-slate-400">Published apps</p>
                <p className="text-lg font-semibold text-slate-100">
                  {market.length}
                </p>
              </div>
              <div className="rounded-xl border border-slate-700/70 bg-slate-900/75 px-3 py-2">
                <p className="text-slate-400">Access mode</p>
                <p className="text-lg font-semibold text-slate-100">
                  {isLoggedIn ? 'Full' : 'Sign-in'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-xs text-slate-200">
            Text workflows
          </span>
          <span className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-xs text-slate-200">
            Image pipelines
          </span>
          <span className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-xs text-slate-200">
            Creator picks
          </span>
          <span className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-xs text-slate-200">
            Fast to run
          </span>
        </div>

        <div
          className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ minHeight: '60vh' }}
        >
          {market.map((curr) => (
            <Link
              className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/75 p-3 shadow-[0_20px_50px_rgba(2,6,23,0.7)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-[0_30px_70px_rgba(79,70,229,0.35)]"
              to={isLoggedIn ? `/market/${curr._id}` : '/sign-in'}
              key={curr._id}
            >
              <div className="absolute -top-20 right-0 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative w-full overflow-hidden rounded-xl border border-slate-800/70">
                <img
                  src={curr.avatar}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  alt={curr.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                <span className="absolute right-2 top-2 rounded-full border border-slate-600/80 bg-slate-900/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-200">
                  App
                </span>
              </div>

              <div className="relative mt-3">
                <h2 className="text-lg font-semibold text-slate-50 truncate">
                  {curr.title}
                </h2>
                <p className="mt-1 text-xs text-slate-300 line-clamp-3 min-h-[48px]">
                  {curr.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Click to open
                  </span>
                  <span className="text-xs font-medium text-indigo-300 group-hover:text-indigo-200">
                    Launch →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {market.length === 0 && (
          <div className="mb-16 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-8 text-center">
            <p className="text-sm text-slate-300">
              No apps published yet. Create one and it will appear here.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MarketPlace;