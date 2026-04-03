import React, { useState } from 'react';
import hoemPageImg from "../assets/homePageImg.jpg";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const featureItems = [
    {
      title: 'Marketplace-first discovery',
      desc: 'Explore and run community-built AI apps with polished card-based browsing and quick launch paths.',
      tag: 'Discover',
      image: hoemPageImg,
      iconBg: 'bg-indigo-500/20 text-indigo-300',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 13h6V4H4v9zm0 7h6v-4H4v4zm10 0h6v-8h-6v8zM14 4v4h6V4h-6z"
        />
      ),
    },
    {
      title: 'Seamless AI workflow',
      desc: 'Design prompts, inject user inputs, and execute in one flow with scalable backend support.',
      tag: 'Workflow',
      image: image1,
      iconBg: 'bg-emerald-500/15 text-emerald-300',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 2h6v4H9zM5 8h14v4H5zM4 14h16v8H4z"
        />
      ),
    },
    {
      title: 'Creator control panel',
      desc: 'Build and publish your own AI apps with custom text/image inputs and reusable prompt logic.',
      tag: 'Build',
      image: image2,
      iconBg: 'bg-pink-500/15 text-pink-300',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 5v14m-7-7h14"
        />
      ),
    },
  ];

  return (
    <section id="features" className="w-11/12 max-w-6xl pt-12 mx-auto text-slate-100">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 mb-1 leading-tight">
            Everything needed to ship AI experiences
          </h2>
          <p className="text-sm text-slate-300/90 max-w-md">
            AI-Kart combines app discovery, prompt engineering, and publishing in one
            creator-friendly workspace.
          </p>

          {featureItems.map((item, index) => (
            <button
              key={item.title}
              onClick={() => setActiveIndex(index)}
              className={`text-left rounded-2xl p-4 border transition-all duration-200 hover:-translate-y-1 ${
                activeIndex === index
                  ? 'bg-slate-900/85 border-indigo-400/50 shadow-[0_20px_45px_rgba(79,70,229,0.22)]'
                  : 'bg-slate-900/70 border-slate-700/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${item.iconBg}`}>
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth={1.6}
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <span className="text-lg font-semibold text-slate-100">{item.title}</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  {item.tag}
                </span>
              </div>
              <p className="text-sm text-slate-300">{item.desc}</p>
            </button>
          ))}
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-5 primary-gradient opacity-35 blur-2xl" />
            <img
              className="relative rounded-3xl object-cover border border-slate-800/80 shadow-[0_30px_80px_rgba(15,23,42,0.95)]"
              src={featureItems[activeIndex].image}
              alt="Feature preview"
            />
            <div className="absolute bottom-3 left-3 rounded-lg border border-slate-700/70 bg-slate-950/80 px-3 py-1.5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Focus</p>
              <p className="text-sm font-semibold text-slate-100">{featureItems[activeIndex].title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;