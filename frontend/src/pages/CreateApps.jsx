import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const CreateApps = () => {
  const baseCard =
    "group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/75 p-4 md:p-5 shadow-[0_20px_50px_rgba(2,6,23,0.7)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-[0_30px_70px_rgba(79,70,229,0.35)]";

  return (
    <div className="gradientbg min-h-screen">
      <div className="max-w-6xl mx-auto pt-28 px-4 pb-16">
        <div className="relative overflow-hidden glass-panel mb-8 px-5 py-6 md:px-8 md:py-7">
          <div className="absolute -top-16 -right-10 h-44 w-44 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute -bottom-16 left-8 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-indigo-300">
                Builder
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-50 mt-1">
                Create AI Apps
              </h1>
              <p className="mt-2 text-sm md:text-base text-slate-300 max-w-2xl">
                Launch prompt-based AI tools with text and image workflows. Pick
                a template, customize inputs, test instantly, and publish.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-slate-700/70 bg-slate-900/75 px-3 py-2">
                <p className="text-slate-400">Ready now</p>
                <p className="text-lg font-semibold text-slate-100">3 modes</p>
              </div>
              <div className="rounded-xl border border-slate-700/70 bg-slate-900/75 px-3 py-2">
                <p className="text-slate-400">Coming soon</p>
                <p className="text-lg font-semibold text-slate-100">2 modes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3 flex items-center gap-2 text-xs">
          <span className="rounded-full border border-emerald-400/50 bg-emerald-500/15 px-3 py-1 text-emerald-200">
            Available
          </span>
          <span className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-slate-300">
            Start building now
          </span>
        </div>

        <div className="grid mt-4 mb-10 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            className={`${baseCard}`}
            to="/create/text-to-text"
          >
            <div className="absolute -top-20 right-0 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <span className="inline-flex rounded-full border border-emerald-400/50 bg-emerald-500/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-emerald-200">
                Live
              </span>
              <h1 className="mt-2 text-xl font-semibold text-slate-50">
                Text-to-Text
              </h1>
              <p className="mt-1 text-sm text-slate-300 min-h-[40px]">
                Create text-only assistants and workflows powered by prompts.
              </p>
            </div>
            <div className="relative mt-3 w-full overflow-hidden rounded-xl border border-slate-800/70">
              <img
                src="/text-to-text.png"
                alt="Text-to-Text"
                className="w-full h-44 object-cover group-hover:scale-[1.05] transition-transform duration-500"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Prompt workflow</span>
              <span className="text-xs font-medium text-indigo-300 group-hover:text-indigo-200">
                Build →
              </span>
            </div>
          </Link>

          <Link
            className={`${baseCard}`}
            to="/create/text-image-to-text"
          >
            <div className="absolute -top-20 right-0 h-44 w-44 rounded-full bg-pink-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <span className="inline-flex rounded-full border border-emerald-400/50 bg-emerald-500/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-emerald-200">
                Live
              </span>
              <h1 className="mt-2 text-xl font-semibold text-slate-50">
                Text + Image to Text
              </h1>
              <p className="mt-1 text-sm text-slate-300 min-h-[40px]">
                Mix images and text as inputs to generate richer outputs.
              </p>
            </div>
            <div className="relative mt-3 w-full overflow-hidden rounded-xl border border-slate-800/70">
              <img
                src="/image-to-text.png"
                alt="Text + Image to Text"
                className="w-full h-44 object-cover group-hover:scale-[1.05] transition-transform duration-500"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Multimodal flow</span>
              <span className="text-xs font-medium text-indigo-300 group-hover:text-indigo-200">
                Build →
              </span>
            </div>
          </Link>

          <Link
            className={`${baseCard}`}
            to="/create/text-to-image"
          >
            <div className="absolute -top-20 right-0 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <span className="inline-flex rounded-full border border-emerald-400/50 bg-emerald-500/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-emerald-200">
                Live
              </span>
              <h1 className="mt-2 text-xl font-semibold text-slate-50">
                Text to Image
              </h1>
              <p className="mt-1 text-sm text-slate-300 min-h-[40px]">
                Turn prompts into images and visual concepts in seconds.
              </p>
            </div>
            <div className="relative mt-3 w-full overflow-hidden rounded-xl border border-slate-800/70">
              <img
                src="/text-to-image1.png"
                alt="Text-to-Image"
                className="w-full h-44 object-cover group-hover:scale-[1.05] transition-transform duration-500"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Image generation</span>
              <span className="text-xs font-medium text-indigo-300 group-hover:text-indigo-200">
                Build →
              </span>
            </div>
          </Link>
        </div>

        <div className="mb-3 flex items-center gap-2 text-xs">
          <span className="rounded-full border border-amber-400/50 bg-amber-500/15 px-3 py-1 text-amber-200">
            Coming soon
          </span>
          <span className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-slate-300">
            On our roadmap
          </span>
        </div>

        <div className="grid mb-16 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className={`${baseCard} opacity-70 cursor-not-allowed`}>
            <span className="inline-flex w-fit rounded-full border border-amber-400/50 bg-amber-500/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-amber-200">
              Soon
            </span>
            <h1 className="mt-2 text-xl font-semibold text-slate-300">
              Text + Image to Image
            </h1>
            <p className="text-sm text-slate-400 min-h-[40px]">
              Generate images from combined text and image context.
            </p>
            <div className="w-full mt-3 overflow-hidden rounded-xl border border-slate-800/70">
              <img
                src="/text-to-image.png"
                alt="Text + Image to Image"
                className="w-full h-44 object-cover grayscale"
              />
            </div>
          </div>

          <div className={`${baseCard} opacity-70 cursor-not-allowed`}>
            <span className="inline-flex w-fit rounded-full border border-amber-400/50 bg-amber-500/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-amber-200">
              Soon
            </span>
            <h1 className="mt-2 text-xl font-semibold text-slate-300">
              Document Querying
            </h1>
            <p className="text-sm text-slate-400 min-h-[40px]">
              Coming soon: upload large documents and create queryable AI layers.
            </p>
            <div className="w-full mt-3 overflow-hidden rounded-xl border border-slate-800/70">
              <img
                src="/Query.png"
                alt="Document Querying"
                className="w-full h-44 object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateApps;