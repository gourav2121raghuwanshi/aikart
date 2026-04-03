import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrGithub } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="mt-16">
      <div className="mx-auto max-w-6xl px-4 pb-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 px-5 py-6 sm:px-7 sm:py-7 shadow-[0_20px_60px_rgba(2,6,23,0.8)]">
          <div className="absolute -top-16 left-10 h-36 w-36 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 right-8 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5 text-slate-300 text-sm">
            <div className="text-center md:text-left">
              <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-300">
                Built with AI
              </p>
              <span className="text-xl font-semibold text-slate-100">AI-Kart</span>
              <div className="text-slate-400 mt-1">
                © {new Date().getFullYear()} AI-Kart. All rights reserved.
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex items-center gap-2">
                <button className="h-9 w-9 rounded-full border border-slate-700 bg-slate-900/70 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-400/50 transition">
                  <FaFacebook className="h-4 w-4" />
                </button>
                <button className="h-9 w-9 rounded-full border border-slate-700 bg-slate-900/70 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-400/50 transition">
                  <FaXTwitter className="h-4 w-4" />
                </button>
                <button className="h-9 w-9 rounded-full border border-slate-700 bg-slate-900/70 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-400/50 transition">
                  <GrGithub className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => navigate('/create')}
                  className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-slate-200 hover:text-white hover:border-indigo-400/50"
                >
                  Create
                </button>
                <Link
                  to="/marketplace"
                  className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-slate-200 hover:text-white hover:border-indigo-400/50"
                >
                  Marketplace
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;