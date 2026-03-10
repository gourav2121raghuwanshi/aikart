import React, { useState } from 'react';
import axios from "axios";

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
      window.alert("Please select at least one file");
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
      window.alert("Upload failed");
    }
  };

  const addPrompt = () => {
    const newElement = (
      <div>
        <textarea style={{ width: "inherit" }}></textarea>
      </div>
    );
    setElements((prevElements) => [...prevElements, newElement]);
  };

  const addInput = () => {
    const newElement = (
      <div>
        <input type="text" style={{ width: "400px" }} />
      </div>
    );
    setElements((prevElements) => [...prevElements, newElement]);
  };

  const addImageInput = () => {
    const newElement = (
      <div>
        <input type="file" accept="image/*" />
      </div>
    );
    setElements((prevElements) => [...prevElements, newElement]);
  };

  return (
    <div className='w-full flex bg-fuchsia-200' style={{ minHeight: "calc(100vh - 77px)" }}>
      <div id='sidepan' className='bg-slate-400 p-1 flex flex-col gap-1' style={{ width: "150px" }}>
        <button onClick={addInput} className='w-full bg-gray-500 hover:bg-slate-300'>
          text input
        </button>

        <button onClick={addImageInput} className='w-full bg-gray-500 hover:bg-slate-300'>
          image input
        </button>

        <button onClick={addPrompt} className='w-full bg-gray-500 hover:bg-slate-300'>
          prompt
        </button>
      </div>

      <div id='canvas' className='bg-slate-300 p-3 scroll-my-1' style={{ width: "calc(100% - 150px)" }}>
        <textarea className='bg-brand-amber-1 min-h-[8rem] min-w-[20rem] max-w-[25rem] resize-none rounded border border-zinc-300/100 p-2 text-sm focus:border-black/30 focus:outline-none'></textarea>

        <div className='my-4'>
          <input type="file" multiple onChange={handleFileChange} />
          <button onClick={handleSubmit} className='ml-3 px-3 py-1 bg-blue-500 text-white rounded'>
            Upload
          </button>
        </div>

        {res && (
          <pre className='bg-white p-3 rounded text-sm overflow-auto'>
            {res}
          </pre>
        )}

        {elements.map((element, index) => (
          <React.Fragment key={index}>
            {element}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ImageForm;