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
    <div className='pt-20 bg-gray-900 gradientbg' style={{ minHeight: "100vh" }}>
      <div className='flex justify-center p-8' style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className='min-w-[20rem] bg-slate-600 text-white rounded-2xl' style={{ minWidth: "300px", maxWidth: "900px", width: "99%" }}>
          <div id='inputs' className='p-3' style={{ minHeight: "calc(100%-2.5rem)" }}>
            <div className='flex justify-between py-1 pb-2'>
              <p className='pb-2'>You can customise your prompts here.</p>
              <button onClick={handlePublish} className='px-2 pb-1 rounded bg-green-500'>
                Publish
              </button>
            </div>

            <textarea
              name='prompt'
              value={prompt}
              onChange={(e) => { setprompt(e.target.value); }}
              placeholder='example : You are an agent and you will be given the car name you have to output few car models with their details in the json object format with fields like model-name, engine, milage, power, and extra-features.'
              className='bg-brand-amber-1 min-h-[8rem] w-full resize-none rounded border bg-gray-500 p-2 text-sm border-black/20 focus:border-black/30 focus:outline-none'
            >
            </textarea>

            {divs.map((divIndex, index) => (
              <div key={divIndex} className='p-2 my-2 rounded border bg-gray-600 relative'>
                <div className='flex justify-between'>
                  <div className='text-xs text-gray-300'>
                    Prefix to append input in prompt.{divIndex} , {index}
                  </div>
                  <button onClick={() => handleDeleteDiv(index)} className='bg-red-900 px-2 rounded absolute -right-0 -top-0'>
                    X
                  </button>
                </div>

                <input
                  name='prefix'
                  value={inputValues[index].prefix}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Car Name'
                  type="text"
                  className='w-full mt-1 rounded p-1 bg-gray-500'
                />
                <br />

                <p>
                  <span className='text-xs text-gray-300'>Placeholder for input box.</span>
                </p>

                <input
                  name='placeholder'
                  value={inputValues[index].placeholder}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Ferrari'
                  type="text"
                  className='w-full mt-1 rounded p-1 bg-gray-500'
                />
                <br />
              </div>
            ))}

            <div className='flex justify-center mt-3'>
              <div className='flex gap-2'>
                <button onClick={handleAddDiv} className='p-0.5 pb-1 px-2 rounded bg-gray-400 hover:bg-slate-500'>
                  + Insert Input
                </button>
                <button onClick={TestApp} className='p-0.5 pb-1 px-2 rounded bg-green-600 hover:bg-green-800'>
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
          <div className='bg-neutral-700 rounded-xl pt-5' style={{ height: 'calc(100vh - 180px)', maxWidth: "900px", width: "90%" }}>
            <div className='flex justify-end gap-2 px-5'>
              <button onClick={handleRun} className='px-2 pb-1 rounded bg-pink-300'>
                Run
              </button>
            </div>

            <div className='overflow-y-auto' style={{ height: "calc(100% - 30px)" }}>
              {final.texts ? final.texts.map((text, index) => (
                <div key={index} className='px-5 text- my-4'>
                  <p className='text-white font-mono'>{text.prefix}</p>
                  <input
                    onChange={(e) => { handleInput(index, e); }}
                    className='bg-white w-full px-3 py-1 rounded'
                    type='text'
                    placeholder={text.placeholder}
                    value={text.value || ''}
                  />
                </div>
              )) : ""}

              <div className='text-white font-light p-3 px-5'>
                {isRunning ? (
                  <div>Running...</div>
                ) : (
                  <Markdown>{modelOutput}</Markdown>
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
          <div id='runMain' className='bg-slate-600 rounded-xl pt-5' style={{ height: 'calc(100vh - 180px)', maxWidth: "900px", width: "90%" }}>
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