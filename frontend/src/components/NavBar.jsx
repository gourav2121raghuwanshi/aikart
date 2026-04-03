import React, { useState } from 'react';
import wesiteLogo from "../assets/wesiteLogo.svg";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-[100]">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="relative glass-panel flex items-center justify-between px-4 py-3 rounded-2xl">
          <div className="absolute -top-14 -right-10 h-32 w-32 rounded-full bg-indigo-500/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 left-12 h-28 w-28 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
          {/* Left: logo + primary links */}
          <div className="relative z-10 flex items-center gap-6">
            <Link to="/" onClick={closeDropdown}>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/80 border border-indigo-400/60 shadow-[0_0_30px_rgba(79,70,229,0.7)]">
                  <img
                    src={wesiteLogo}
                    alt="AIKart logo"
                    className="h-6 w-6"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm uppercase tracking-[0.2em] text-indigo-300">
                    AI-Kart
                  </span>
                  <span className="text-base md:text-lg font-semibold text-slate-50">
                    AI App Studio
                  </span>
                </div>
              </div>
            </Link>

            <div className="hidden sm:flex items-center gap-4 text-sm font-medium">
              <Link
                to="/marketplace"
                className="rounded-full border border-transparent px-3 py-1 text-slate-200/80 hover:border-slate-700/70 hover:bg-slate-900/80 hover:text-white transition"
              >
                Marketplace
              </Link>
              <Link
                to="/create"
                className="rounded-full border border-transparent px-3 py-1 text-slate-200/80 hover:border-slate-700/70 hover:bg-slate-900/80 hover:text-white transition"
              >
                Create
              </Link>
            </div>
          </div>

          {/* Right: auth / avatar + mobile menu */}
          <div className="relative z-10 flex items-center gap-3">
            {currentUser ? (
              <Link to="/profile" onClick={closeDropdown} className="group">
                <div className="relative inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 pl-1 pr-3 py-1 hover:border-indigo-400/50 transition">
                  <div className="h-9 w-9 rounded-full border border-indigo-400/70 ring-2 ring-indigo-500/40 overflow-hidden shadow-[0_0_25px_rgba(129,140,248,0.7)]">
                    <img
                      src={
                        currentUser.avatar ||
                        "https://res.cloudinary.com/domheydkx/image/upload/v1705905528/gourav/uyb6ntwjcrxacztiw4iv.jpg"
                      }
                      alt="profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="hidden md:block text-xs text-slate-300 group-hover:text-white">
                    Profile
                  </span>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="sign-in">
                  <span className="text-sm font-medium text-slate-200/80 hover:text-white transition">
                    Sign in
                  </span>
                </Link>
                <Link to="sign-up">
                  <button className="primary-gradient text-sm font-semibold text-white px-4 py-1.5 rounded-full shadow-[0_12px_32px_rgba(79,70,229,0.55)] hover:shadow-[0_16px_40px_rgba(79,70,229,0.75)] transition-shadow">
                    Sign up
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="relative inline-block sm:hidden text-left">
              <button
                onClick={toggleDropdown}
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900/80 px-3 py-2 text-sm font-medium text-slate-100 border border-slate-700/70 shadow-[0_0_20px_rgba(15,23,42,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-slate-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-6 w-6 text-indigo-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-[120] right-0 mt-3 w-56 origin-top-right rounded-2xl border border-slate-700/70 bg-slate-900/95 p-4 shadow-2xl shadow-slate-950/80 backdrop-blur-xl">
                  <div className="flex flex-col gap-3 text-sm">
                    <Link
                      to="/marketplace"
                      onClick={closeDropdown}
                      className="rounded-lg px-2 py-1 text-slate-200 hover:bg-slate-800/70 hover:text-white"
                    >
                      Marketplace
                    </Link>
                    <Link
                      to="/create"
                      onClick={closeDropdown}
                      className="rounded-lg px-2 py-1 text-slate-200 hover:bg-slate-800/70 hover:text-white"
                    >
                      Create
                    </Link>
                  </div>

                  {!currentUser && (
                    <div className="mt-4 flex flex-col gap-2">
                      <Link
                        onClick={closeDropdown}
                        to="/sign-up"
                        className="primary-gradient block rounded-full px-4 py-2 text-center text-sm font-semibold text-white shadow-[0_12px_32px_rgba(79,70,229,0.7)]"
                      >
                        Sign up
                      </Link>
                      <Link
                        onClick={closeDropdown}
                        to="/sign-in"
                        className="block rounded-full border border-slate-600 bg-slate-800/80 px-4 py-2 text-center text-sm font-medium text-slate-100 hover:bg-slate-700/80"
                      >
                        Sign in
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;