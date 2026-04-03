import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const ImageForm = () => {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);
  const [elements, setElements] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFile(selectedFiles);
    console.log(selectedFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || file.length === 0) {
      window.alert('Please select at least one file');
      return;
    }

    try {
      const data = new FormData();

      for (let x = 0; x < file.length; x++) {
        data.append('file', file[x]);
      }

      const response = await axios.post(`${API_URL}/upload`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);

      setRes(
        JSON.stringify(
          {
            url: response.data.url,
            mimetype: response.data.mimetype,
            filename: response.data.filename,
          },
          null,
          2
        )
      );
    } catch (err) {
      console.log(err);
      window.alert('Upload failed');
    }
  };

  const addPrompt = () => {
    const newElement = (
      <div className="w-full">
        <textarea className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
      </div>
    );
    setElements((prevElements) => [...prevElements, newElement]);
  };

  const addInput = () => {
    const newElement = (
      <div className="w-full">
        <input
          type="text"
          className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
    );
    setElements((prevElements) => [...prevElements, newElement]);
  };

  const addImageInput = () => {
    const newElement = (
      <div className="w-full">
        <input
          type="file"
          accept="image/*"
          className="block w-full text-xs text-slate-300 file:mr-2 file:rounded-md file:border-0 file:bg-slate-800 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-slate-100 hover:file:bg-slate-700"
        />
      </div>
    );
    setElements((prevElements) => [...prevElements, newElement]);
  };

  return (
    <div className="gradientbg min-height-screen pt-24 pb-10">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row gap-6">
        {/* Side toolbar */}
        <div className="w-full md:w-48">
          <div className="glass-panel p-4 flex flex-col gap-3">
            <h2 className="text-xs font-semibold text-slate-200 uppercase tracking-[0.18em]">
              Studio
            </h2>
            <p className="text-xs text-slate-400">
              Add building blocks to experiment with prompts and uploads.
            </p>
            <div className="mt-2 flex flex-col gap-2 text-xs">
              <button
                onClick={addInput}
                className="w-full rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-left text-slate-100 hover:bg-slate-800/90"
              >
                + Text input
              </button>
              <button
                onClick={addImageInput}
                className="w-full rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-left text-slate-100 hover:bg-slate-800/90"
              >
                + Image input
              </button>
              <button
                onClick={addPrompt}
                className="w-full rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-left text-slate-100 hover:bg-slate-800/90"
              >
                + Prompt block
              </button>
            </div>
          </div>
        </div>

        {/* Canvas + upload tester */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="glass-panel p-4 md:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-sm font-semibold text-slate-100">
                  Playground canvas
                </h1>
                <p className="text-xs text-slate-400">
                  Drop in inputs and prompts to sketch new ideas.
                </p>
              </div>
            </div>

            <div className="min-h-[140px] rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4 flex flex-col gap-3">
              <textarea
                className="w-full min-h-[80px] rounded-lg border border-slate-800/80 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Write a base prompt, idea, or notes for this experiment..."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-400">
                <span>Use this canvas as scratch space.</span>
                <span>Below, you can attach actual upload tests to see Cloudinary responses.</span>
              </div>
            </div>

            <div className="space-y-3">
              {elements.map((element, index) => (
                <React.Fragment key={index}>{element}</React.Fragment>
              ))}
            </div>
          </div>

          <div className="glass-panel p-4 md:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-100">
                  Upload tester
                </h2>
                <p className="text-xs text-slate-400">
                  Send files through the same Cloudinary-backed endpoint the apps use.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full text-xs text-slate-300 file:mr-2 file:rounded-md file:border-0 file:bg-slate-800 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-slate-100 hover:file:bg-slate-700"
              />
              <button
                onClick={handleSubmit}
                className="primary-gradient inline-flex items-center justify-center rounded-full px-5 py-1.5 text-xs font-semibold text-white shadow-[0_14px_36px_rgba(79,70,229,0.85)]"
              >
                Upload
              </button>
            </div>

            {res && (
              <pre className="mt-2 max-h-56 overflow-auto rounded-lg border border-slate-800/80 bg-slate-950/70 p-3 text-xs text-slate-100">
                {res}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageForm;