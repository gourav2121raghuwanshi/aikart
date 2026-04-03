import React, { useState } from 'react';
import Markdown from 'react-markdown';
import Publish from './Publish';

function TextToText() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [divs, setDivs] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [prompt, setprompt] = useState('');
  const [final, setfinal] = useState({});
  const [modelOutput, setmodelOutput] = useState('');
  const [isRunning, setisRunning] = useState(false);

  const handleAddDiv = () => {
    const newDivs = [...divs, divs.length];
    const newInputValues = [...inputValues, { prefix: '', placeholder: '' }];
    setDivs(newDivs);
    setInputValues(newInputValues);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputValues = [...inputValues];
    newInputValues[index][name] = value;
    setInputValues(newInputValues);
  };

  const handleDeleteDiv = (index) => {
    const newDivs = [...divs];
    newDivs.splice(index, 1);

    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1);

    setDivs(newDivs);
    setInputValues(newInputValues);
  };

  const handleClickOutside = (e, id) => {
    if (e.target.id !== "run") {
      return;
    }
    document.getElementById(id).style.display = "none";
  };

  const handleInput = (index, event) => {
    const { value } = event.target;

    setfinal((prev) => ({
      ...prev,
      texts: prev.texts.map((text, i) =>
        i === index ? { ...text, value } : text
      ),
    }));
  };

  const finalise = () => {
    const obj = {
      model: "text-to-text",
      prompt,
      texts: [...inputValues],
      inputs: ["text"],
    };

    console.log(obj);
    setfinal(obj);
  };

  const TestApp = () => {
    finalise();
    document.getElementById("test").style.display = "block";
  };

  const handleRun = async () => {
    setisRunning(true);

    try {
      const res = await fetch(`${API_URL}/ai/testrun`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(final),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed: ${res.status} ${text}`);
      }

      const data = await res.json();
      setmodelOutput(data);
      console.log(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }

    setisRunning(false);
  };

  const handlePublish = () => {
    finalise();
    document.getElementById("publish").style.display = "block";
  };

  return (
    <div className='pt-20 gradientbg' style={{ minHeight: "100vh" }}>
      <div className='mx-auto max-w-6xl px-4 py-8' style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className='glass-panel text-white rounded-2xl p-5 md:p-6'>
          <div id='inputs' className='space-y-4'>
            <div className='flex items-center justify-between gap-2'>
              <div>
                <h1 className='text-sm font-semibold text-slate-100'>Text-to-Text Builder</h1>
                <p className='text-xs text-slate-400'>Design prompt logic and user input fields.</p>
              </div>
              <button onClick={handlePublish} className='primary-gradient px-4 py-1.5 rounded-full text-xs font-semibold shadow-[0_12px_32px_rgba(79,70,229,0.8)]'>
                Publish
              </button>
            </div>

            <textarea
              name='prompt'
              value={prompt}
              onChange={(e) => { setprompt(e.target.value); }}
              placeholder='Example: You are an assistant. Based on car name input, return models with engine, mileage, power, and features.'
              className='min-h-[8rem] w-full resize-none rounded-xl border border-slate-700 bg-slate-900/70 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none'
            />

            {divs.map((divIndex, index) => (
              <div key={divIndex} className='p-3 rounded-xl border border-slate-800 bg-slate-900/70 relative'>
                <div className='flex justify-between'>
                  <div className='text-xs text-slate-400'>
                    Input Field #{index + 1}
                  </div>
                  <button onClick={() => handleDeleteDiv(index)} className='bg-slate-800 px-2 rounded absolute right-2 top-2 text-slate-300 hover:bg-slate-700'>
                    X
                  </button>
                </div>

                <input
                  name='prefix'
                  value={inputValues[index].prefix}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Input prefix in prompt'
                  type="text"
                  className='w-full mt-2 rounded-md border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none'
                />
                <br />

                <p>
                  <span className='text-xs text-slate-400'>Placeholder for input box.</span>
                </p>

                <input
                  name='placeholder'
                  value={inputValues[index].placeholder}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='User example value'
                  type="text"
                  className='w-full mt-1 rounded-md border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none'
                />
                <br />
              </div>
            ))}

            <div className='flex justify-end mt-1'>
              <div className='flex gap-2'>
                <button onClick={handleAddDiv} className='px-3 py-1.5 rounded-full border border-slate-700 bg-slate-900/80 text-xs hover:bg-slate-800'>
                  + Insert Input
                </button>
                <button onClick={TestApp} className='px-3 py-1.5 rounded-full bg-emerald-500/90 text-xs font-semibold text-slate-950 hover:bg-emerald-400'>
                  {">"} Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id='test'
        className=''
        style={{ display: 'none', position: 'absolute', top: "0px", left: "0px", width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)' }}
      >
        <div id='run' onClick={(e) => handleClickOutside(e, 'test')} className='flex items-center justify-center h-full'>
          <div className='glass-panel rounded-xl pt-5' style={{ height: 'calc(100vh - 180px)', maxWidth: "900px", width: "90%" }}>
            <div className='flex justify-end gap-2 px-5'>
              <button onClick={handleRun} className='primary-gradient px-4 py-1.5 rounded-full text-xs font-semibold'>
                Run
              </button>
            </div>

            <div className='overflow-y-auto' style={{ height: "calc(100% - 30px)" }}>
              {final.texts ? final.texts.map((text, index) => (
                <div key={index} className='px-5 text- my-4'>
                  <p className='text-slate-300 text-xs font-mono'>{text.prefix}</p>
                  <input
                    onChange={(e) => { handleInput(index, e); }}
                    className='w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none'
                    type='text'
                    placeholder={text.placeholder}
                    value={text.value || ''}
                  />
                </div>
              )) : ""}

              <div className='p-3 px-5'>
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

      <div
        id='publish'
        className=''
        style={{ display: 'none', position: 'absolute', top: "0px", left: "0px", width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)' }}
      >
        <div id='run' onClick={(e) => handleClickOutside(e, 'publish')} className='flex items-center justify-center h-full'>
          <div id='runMain' className='glass-panel rounded-xl pt-5' style={{ height: 'calc(100vh - 180px)', maxWidth: "900px", width: "90%" }}>
            <div className='overflow-y-auto' style={{ height: "calc(100% - 30px)" }}>
              <Publish data={final} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextToText;