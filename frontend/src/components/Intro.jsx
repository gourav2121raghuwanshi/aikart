import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Markdown from 'react-markdown';

const API_URL = import.meta.env.VITE_API_URL;

const Intro = () => {
  const { id } = useParams();
  const [market, setMarket] = useState([]);
  const [isRunning, setisRunning] = useState(false);
  const [modelOutput, setmodelOutput] = useState('');
  const [final, setfinal] = useState(null);
  const [files, setfiles] = useState({});
  const [isuploading, setIsuploading] = useState(false);

  useEffect(() => {
    const getMarket = async () => {
      try {
        const res = await axios.get(`${API_URL}/ai/getprompt/${id}`, {
          withCredentials: true,
        });

        const data = res.data;
        setMarket(data);
        setfinal(data);
        console.log(data);
      } catch (err) {
        console.log('cannot get market ', err);
      }
    };

    getMarket();
  }, [id]);

  const handleInput = (index, event) => {
    const { value } = event.target;

    setfinal((prev) => ({
      ...prev,
      texts: prev.texts.map((item, i) =>
        i === index ? { ...item, value } : item
      ),
    }));
  };

  const handleInputImage = async (index, event) => {
    setIsuploading(true);

    try {
      const value = event.target.files[0];
      if (!value) {
        setIsuploading(false);
        return;
      }

      setfiles((prev) => ({
        ...prev,
        [index]: value,
      }));

      const formD = new FormData();
      formD.append('file', value);

      const res = await axios.post(`${API_URL}/upload`, formD, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('response : ', res.data);

      setfinal((prev) => ({
        ...prev,
        images: prev.images.map((item, i) =>
          i === index
            ? {
                ...item,
                image: res.data.url,
                mimetype: res.data.mimetype,
              }
            : item
        ),
      }));
    } catch (err) {
      console.log('image upload failed', err);
    } finally {
      setIsuploading(false);
    }
  };

  const handleRun = async () => {
    setisRunning(true);

    try {
      if (final?.model === 'text-image-to-text') {
        const res = await axios.post(`${API_URL}/ai/testrunimg`, final, {
          withCredentials: true,
        });
        setmodelOutput(res.data);
      } else if (final?.model === 'text-to-text') {
        const res = await axios.post(`${API_URL}/ai/testrun`, final, {
          withCredentials: true,
        });
        setmodelOutput(res.data);
      } else {
        window.alert('Model not found');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setisRunning(false);
    }
  };

  return (
    <div className="gradientbg min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-6xl px-4 flex flex-col lg:flex-row gap-8">
        {/* Left: app info */}
        <div className="flex-1">
          <div className="glass-panel p-6 md:p-7 h-full flex flex-col gap-4">
            <div className="flex items-start gap-4">
              {market?.avatar && (
                <div className="relative">
                  <div className="absolute -inset-1 rounded-3xl primary-gradient opacity-40 blur-lg" />
                  <img
                    className="relative h-28 w-28 rounded-3xl object-cover border border-slate-800/80"
                    src={market.avatar}
                    alt={market?.title}
                  />
                </div>
              )}
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-50">
                  {market?.title || 'Loading app...'}
                </h1>
                <p className="text-sm text-slate-300/90">
                  {market?.description}
                </p>
              </div>
            </div>

            {market?.howtouse && market.howtouse.trim() !== '' && (
              <div className="mt-2">
                <h2 className="text-sm font-semibold text-slate-100 mb-1">
                  How to use
                </h2>
                <p className="text-sm text-slate-300/90 whitespace-pre-line">
                  {market.howtouse}
                </p>
              </div>
            )}

            {final?.model && (
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Model: {final.model}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: run panel */}
        <div className="flex-1">
          <div className="glass-panel h-full flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-800/80">
              <div>
                <h2 className="text-sm font-semibold text-slate-100">
                  Run this app
                </h2>
                <p className="text-xs text-slate-400">
                  Fill in the inputs below and run the model.
                </p>
              </div>
              <button
                onClick={handleRun}
                disabled={isuploading}
                className="primary-gradient inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-[0_12px_32px_rgba(79,70,229,0.8)] disabled:opacity-60"
              >
                {isuploading ? 'Uploading...' : 'Run app'}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-4 pt-2 space-y-4">
              {final?.texts &&
                final.texts.map((text, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-xs font-mono text-slate-300">
                      {text.prefix}
                    </p>
                    <input
                      onChange={(e) => handleInput(index, e)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      type="text"
                      placeholder={text.placeholder}
                      value={text.value || ''}
                    />
                  </div>
                ))}

              {final?.images &&
                final.images.map((text, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-xs text-slate-300">{text.placeholder}</p>
                    <label className="inline-flex items-center gap-3 cursor-pointer">
                      <input
                        onChange={(e) => handleInputImage(index, e)}
                        type="file"
                        accept="image/*"
                        hidden
                      />
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-2xl border border-slate-700/60" />
                        <img
                          src={
                            files[index]
                              ? URL.createObjectURL(files[index])
                              : '/image.png'
                          }
                          alt="uploaded preview"
                          loading="lazy"
                          className="relative h-24 w-28 sm:h-32 sm:w-40 rounded-2xl object-cover"
                        />
                      </div>
                      <span className="text-xs text-indigo-300 underline">
                        {files[index] ? 'Change image' : 'Upload image'}
                      </span>
                    </label>
                  </div>
                ))}

              <div className="mt-4 border-t border-slate-800/80 pt-3">
                <p className="text-xs font-semibold text-slate-300 mb-1">
                  Output
                </p>
                <div className="output-panel min-h-[90px]">
                  {isRunning ? (
                    <div className="text-slate-400 text-xs">Running...</div>
                  ) : (
                    <div className="output-markdown">
                      <Markdown>{modelOutput}</Markdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;