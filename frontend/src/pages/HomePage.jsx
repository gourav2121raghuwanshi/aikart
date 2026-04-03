import React, { useEffect, useState } from 'react';
import homePageImg from '../assets/image1.jpg';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [scrollY, setScrollY] = useState(0);
  const heroPills = [
    'No-code AI builder',
    'Prompt marketplace',
    'Image + text workflows',
    'Cloud-ready deployment',
    'Creator-first UX',
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || 0;
      setScrollY(currentScroll > 600 ? 600 : currentScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full gradientbg">
      {/* Hero */}
      <div className="mx-auto max-w-6xl pt-28 px-4 pb-12">
        <div className="relative overflow-hidden glass-panel hero-grid flex flex-col md:flex-row items-center gap-10 px-6 py-10 md:px-10 md:py-12">
          <div className="hero-orb hero-orb-one" style={{ transform: `translate3d(0, ${scrollY * 0.18}px, 0)` }} />
          <div className="hero-orb hero-orb-two" style={{ transform: `translate3d(0, ${scrollY * -0.12}px, 0)` }} />
          <div className="hero-orb hero-orb-three" style={{ transform: `translate3d(0, ${scrollY * 0.1}px, 0)` }} />

          {/* Text side */}
          <div
            className="relative z-10 flex-1 space-y-6"
            style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-slate-900/80 px-3 py-1 text-xs font-medium text-indigo-200/90 shadow-[0_0_35px_rgba(79,70,229,0.6)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live AI app marketplace
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-slate-50">
              Design AI products
              <br />
              that feel
              <span className="block bg-clip-text text-transparent primary-gradient">
                next-generation.
              </span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-slate-300/90">
              AI-Kart turns ideas into polished AI apps with multimodal inputs,
              marketplace-ready publishing, and an experience your users will
              actually love using.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {currentUser ? (
                <Link to="/marketplace">
                  <button className="primary-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(79,70,229,0.8)] hover:shadow-[0_22px_60px_rgba(79,70,229,0.95)] transition-shadow">
                    Explore marketplace
                  </button>
                </Link>
              ) : (
                <Link to="/sign-in">
                  <button className="primary-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(79,70,229,0.8)] hover:shadow-[0_22px_60px_rgba(79,70,229,0.95)] transition-shadow">
                    Get started for free
                  </button>
                </Link>
              )}

              <Link
                to="/create"
                className="text-sm font-medium text-indigo-300 hover:text-indigo-100 flex items-center gap-1"
              >
                Open app creator
                <span className="text-indigo-400">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-lg">
              <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2">
                <p className="text-[11px] text-slate-400 uppercase tracking-[0.16em]">
                  Time to first app
                </p>
                <p className="text-lg font-semibold text-slate-100">~5 mins</p>
              </div>
              <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2">
                <p className="text-[11px] text-slate-400 uppercase tracking-[0.16em]">
                  Supported mode
                </p>
                <p className="text-lg font-semibold text-slate-100">Text + Image</p>
              </div>
            </div>
          </div>

          {/* Image side */}
          <div
            className="relative z-10 flex-1 flex justify-center"
            style={{ transform: `translate3d(0, ${scrollY * -0.14}px, 0)` }}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-5 rounded-3xl primary-gradient opacity-55 blur-2xl" />
              <div className="absolute inset-0 rounded-3xl border border-white/10" />
              <img
                style={{ maxWidth: '100%' }}
                className="relative rounded-3xl neon-border object-cover border border-slate-800/80 shadow-[0_24px_80px_rgba(2,6,23,0.9)]"
                loading="lazy"
                src={homePageImg}
                alt="AI-Kart preview"
              />
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-slate-700/70 bg-slate-900/85 px-3 py-2 backdrop-blur">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  Trending
                </p>
                <p className="text-sm font-semibold text-slate-100">
                  120+ published apps
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mx-auto max-w-6xl px-4 pb-6 overflow-hidden"
        style={{ transform: `translate3d(0, ${scrollY * -0.05}px, 0)` }}
      >
        <div className="rounded-xl border border-slate-800/70 bg-slate-900/65 py-2">
          <div className="marquee-track flex min-w-[200%] gap-3 px-3">
            {[...heroPills, ...heroPills].map((pill, index) => (
              <span
                key={`${pill}-${index}`}
                className="inline-flex shrink-0 rounded-full border border-slate-700/80 bg-slate-950/70 px-3 py-1 text-xs text-slate-300"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <Features />

      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;