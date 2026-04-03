import React, { useState } from 'react';
import Markdown from 'react-markdown';
import Publish from './Publish';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function Text_ImageToText() {
  const [divs, setDivs] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [images, setimages] = useState([]);
  const [inputImages, setinputImages] = useState([]);
  const [prompt, setprompt] = useState('');
  const [final, setfinal] = useState({});
  const [modelOutput, setmodelOutput] = useState('');
  const [isRunning, setisRunning] = useState(false);
  const [textinputs, settextinputs] = useState({});
  const [imageinputs, setimageinputs] = useState({});
  const [files, setfiles] = useState({});
  const [isuploading, setIsuploading] = useState(false);

  const handleAddDiv = () => {
    const newDivs = [...divs, divs.length];
    const newInputValues = [...inputValues, { prefix: '', placeholder: '' }];
    setDivs(newDivs);
    setInputValues(newInputValues);
  };

  const handleAddImage = () => {
    const newImages = [...images, images.length];
    const newInputImages = [...inputImages, { placeholder: '' }];
    setimages(newImages);
    setinputImages(newInputImages);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputValues = [...inputValues];
    newInputValues[index][name] = value;
    setInputValues(newInputValues);
  };

  const handleImageInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputValues = [...inputImages];
    newInputValues[index][name] = value;
    setinputImages(newInputValues);
  };

  const handleDeleteDiv = (index) => {
    const newDivs = [...divs];
    newDivs.splice(index, 1);
    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1);
    setDivs(newDivs);
    setInputValues(newInputValues);
  };

  const handleDeleteImage = (index) => {
    const newDivs = [...images];
    newDivs.splice(index, 1);
    const newInputValues = [...inputImages];
    newInputValues.splice(index, 1);
    setimages(newDivs);
    setinputImages(newInputValues);

    setfiles((prev) => {
      const copy = { ...prev };
      delete copy[index];
      return copy;
    });

    setimageinputs((prev) => {
      const copy = { ...prev };
      delete copy[index];
      return copy;
    });
  };

  const handleClickOutside = (e, id) => {
    if (e.target.id !== 'run') return;
    document.getElementById(id).style.display = 'none';
  };

  const handleInput = (index, event) => {
    const { value } = event.target;
    settextinputs((prev) => ({
      ...prev,
      [index]: value,
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

      setimageinputs((prev) => ({
        ...prev,
        [index]: {
          image: res.data.url,
          mimetype: res.data.mimetype,
        },
      }));
    } catch (err) {
      console.log(err);
      window.alert('Image upload failed');
    } finally {
      setIsuploading(false);
    }
  };

  const finalise = () => {
    const obj = {
      model: 'text-image-to-text',
      prompt,
      texts: [...inputValues],
      images: [...inputImages],
      inputs: 'text',
    };
    console.log(obj);
    setfinal(obj);
  };

  async function getObj() {
    const newInputValues = [];
    const newInputImages = [];

    for (let i = 0; i < inputValues.length; i++) {
      newInputValues.push({
        ...inputValues[i],
        value: textinputs[i] || '',
      });
    }

    for (let i = 0; i < inputImages.length; i++) {
      newInputImages.push({
        ...inputImages[i],
        ...(imageinputs[i] || {}),
      });
    }

    return {
      model: 'text-image-to-text',
      prompt,
      texts: [...newInputValues],
      images: [...newInputImages],
      inputs: ['text', 'image'],
    };
  }

  const TestApp = () => {
    finalise();
    document.getElementById('test').style.display = 'block';
  };

  const handleRun = async () => {
    setisRunning(true);

    try {
      const dataObj = await getObj();
      console.log('dataObj : ', dataObj);

      const res = await axios.post(`${API_URL}/ai/testrunimg`, dataObj, {
        withCredentials: true,
      });

      console.log('response : ', res.data);
      setmodelOutput(res.data);
    } catch (err) {
      console.log(err);
      setmodelOutput('Failed to run model');
    } finally {
      setisRunning(false);
    }
  };

  const handlePublish = () => {
    finalise();
    document.getElementById('publish').style.display = 'block';
  };

  return (
    <div className="gradientbg min-h-screen pt-24 pb-10">
      <div className="mx-auto max-w-6xl px-4 flex flex-col lg:flex-row gap-6">
        {/* Left: Prompt designer */}
        <div className="flex-1">
          <div className="glass-panel p-5 md:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-sm font-semibold text-slate-100">
                  Text + Image prompt designer
                </h1>
                <p className="text-xs text-slate-400">
                  Configure how text and images feed into your model.
                </p>
              </div>
              <button
                onClick={handlePublish}
                className="primary-gradient inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-[0_12px_32px_rgba(79,70,229,0.85)]"
              >
                Publish app
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-slate-200 mb-1">
                  Base prompt
                </p>
                <textarea
                  name="prompt"
                  value={prompt}
                  onChange={(e) => setprompt(e.target.value)}
                  placeholder="Describe how the model should combine text and images..."
                  className="w-full min-h-[120px] rounded-lg border border-slate-800/80 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between mt-2">
                <p className="text-xs font-semibold text-slate-200">
                  Text inputs
                </p>
                <button
                  onClick={handleAddDiv}
                  className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-100 hover:bg-slate-800"
                >
                  + Add text field
                </button>
              </div>

              {divs.map((divIndex, index) => (
                <div
                  key={divIndex}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-3 relative space-y-2"
                >
                  <button
                    onClick={() => handleDeleteDiv(index)}
                    className="absolute right-2 top-2 rounded-full bg-slate-800 px-2 text-[11px] text-slate-300 hover:bg-slate-700"
                  >
                    ×
                  </button>
                  <div className="text-[11px] text-slate-400">
                    Text field #{index + 1}
                  </div>
                  <input
                    name="prefix"
                    value={inputValues[index].prefix}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Prefix shown before the user input in the prompt"
                    type="text"
                    className="w-full rounded-md border border-slate-800 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <input
                    name="placeholder"
                    value={inputValues[index].placeholder}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Placeholder text for this input field"
                    type="text"
                    className="w-full rounded-md border border-slate-800 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              ))}

              <div className="flex items-center justify-between mt-4">
                <p className="text-xs font-semibold text-slate-200">
                  Image inputs
                </p>
                <button
                  onClick={handleAddImage}
                  className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-100 hover:bg-slate-800"
                >
                  + Add image field
                </button>
              </div>

              {images.map((divIndex, index) => (
                <div
                  key={divIndex}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-3 relative space-y-2"
                >
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-slate-800 px-2 text-[11px] text-slate-300 hover:bg-slate-700"
                  >
                    ×
                  </button>
                  <div className="text-[11px] text-slate-400">
                    Image field #{index + 1}
                  </div>
                  <input
                    name="placeholder"
                    value={inputImages[index].placeholder}
                    onChange={(e) => handleImageInputChange(index, e)}
                    placeholder="Describe what the user should upload here"
                    type="text"
                    className="w-full rounded-md border border-slate-800 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              ))}

              <div className="pt-2 border-t border-slate-800/80 flex justify-end">
                <button
                  onClick={TestApp}
                  className="rounded-full bg-emerald-500/90 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  {'>'} Open test runner
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info panel */}
        <div className="flex-1 hidden lg:block">
          <div className="glass-panel h-full flex items-center justify-center text-xs text-slate-400 px-4">
            <div className="text-center max-w-xs">
              <p className="font-semibold text-slate-200 mb-2">
                Test & publish your app
              </p>
              <p>
                Use the “Open test runner” and “Publish app” buttons on the left
                to bring up full-screen modals for running and publishing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Test overlay */}
      <div
        id="test"
        style={{
          display: 'none',
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.55)',
        }}
      >
        <div
          id="run"
          onClick={(e) => handleClickOutside(e, 'test')}
          className="flex items-center justify-center h-full"
        >
          <div
            className="glass-panel pt-5"
            style={{ height: 'calc(100vh - 180px)', maxWidth: '900px', width: '90%' }}
          >
            <div className="flex justify-end gap-2 px-5">
              {isuploading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-slate-300 animate-spin fill-blue-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : null}
              <button
                onClick={handleRun}
                className="primary-gradient rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-[0_12px_32px_rgba(79,70,229,0.85)] disabled:opacity-60"
                disabled={isuploading}
              >
                Run
              </button>
            </div>

            <div className="overflow-y-auto" style={{ height: 'calc(100% - 30px)' }}>
              {final.texts
                ? final.texts.map((text, index) => (
                    <div key={index} className="px-5 my-3">
                      <p className="text-xs text-slate-300 font-mono mb-1">
                        {text.prefix}
                      </p>
                      <input
                        onChange={(e) => handleInput(index, e)}
                        className="w-full rounded-md border border-slate-800 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        type="text"
                        placeholder={text.placeholder}
                        value={textinputs[index] || ''}
                      />
                    </div>
                  ))
                : null}

              {final.images
                ? final.images.map((text, index) => (
                    <div key={index} className="px-5 my-3">
                      <p className="text-xs text-slate-300 mb-1">
                        {text.placeholder}
                      </p>

                      <input
                        id={`image-upload-${index}`}
                        onChange={(e) => handleInputImage(index, e)}
                        type="file"
                        accept="image/*"
                        hidden
                      />

                      <img
                        src={
                          files[index]
                            ? URL.createObjectURL(files[index])
                            : '/image.png'
                        }
                        onClick={() =>
                          document
                            .getElementById(`image-upload-${index}`)
                            .click()
                        }
                        alt="uploaded preview"
                        loading="lazy"
                        className="rounded-2xl h-24 w-28 sm:h-32 sm:w-40 object-cover cursor-pointer mt-2 self-center border border-slate-800/80"
                      />
                    </div>
                  ))
                : null}

              <div className="p-3 px-5">
                {isRunning ? (
                  <div className="text-xs text-slate-400">Running...</div>
                ) : (
                  <div className="output-panel min-h-[90px]">
                    <div className="output-markdown">
                      <Markdown>{modelOutput}</Markdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publish overlay */}
      <div
        id="publish"
        style={{
          display: 'none',
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.55)',
        }}
      >
        <div
          id="run"
          onClick={(e) => handleClickOutside(e, 'publish')}
          className="flex items-center justify-center h-full"
        >
          <div
            id="runMain"
            className="glass-panel pt-5"
            style={{ height: 'calc(100vh - 180px)', maxWidth: '900px', width: '90%' }}
          >
            <div
              className="overflow-y-auto"
              style={{ height: 'calc(100% - 30px)' }}
            >
              <Publish data={final} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Text_ImageToText;