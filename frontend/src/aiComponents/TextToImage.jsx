import React, {  useState } from 'react';



function TextToImage() {
  const [divs, setDivs] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [prompt, setprompt] = useState('');
  const [final, setfinal] = useState({});

  const finalise = () =>{
    var obj = {};
    obj["model"] = "text-to-image";
    obj["prompt"] = prompt;
    obj["texts"] = [...inputValues]
    console.log(obj);
    setfinal(obj);
    document.getElementById("test").style.display = "block";
  }

  const handleAddDiv = () => {
    const newDivs = [...divs, divs.length];
    const newInputValues = [...inputValues, { prefix: '', placeholder: ''}];
    setDivs(newDivs);
    setInputValues(newInputValues);
    console.log(divs)
    console.log(inputValues)
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

  const handleClickOutside = (e) =>{
    if(e.target.id !== "run"){
        return;
    }
    document.getElementById("test").style.display = "none";
  }

  const handleRun = () =>{
    
  }


  return (
    <div className='pt-20 gradientbg' style={{minHeight:"100vh"}}>
            <div className='mx-auto max-w-6xl px-4 py-8' style={{minHeight:"calc(100vh - 80px)"}}>
                <div className='glass-panel text-white rounded-2xl p-5 md:p-6'>
                    {/* <div className='flex items-center h-10 px-6 rounded-t-2xl bg-gray-500'>
                        <button onClick={()=>AddInput()} className=' p-0.5 rounded-md px-2 bg-gray-400 hover:bg-gray-300'>Insert Input</button>
                    </div> */}
                    <div id='inputs' className='space-y-4'>
                        <div>
                          <h1 className='text-sm font-semibold text-slate-100'>Text-to-Image Builder</h1>
                          <p className='text-xs text-slate-400'>Configure prompt and inputs for image generation flow.</p>
                        </div>
                        <textarea name='prompt' value={prompt} onChange={(e)=>{setprompt(e.target.value)}} placeholder='example : You are an agent and you will be given the car name you have to output few car models with their details in the json object format with fields like model-name, engine, milage, power, and extra-features. ' 
                            className='min-h-[8rem] w-full resize-none rounded-xl border border-slate-700 bg-slate-900/70 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none'>
                        </textarea>
                        {/* <div className=' p-2 my-2 rounded border bg-gray-600'>
                            <h2 className=' text-gray-400'>Input Field</h2>
                            <p><span className=' text-xs text-gray-300'>Prefix to append input in prompt.</span></p>
                            <input name='input1' onChange={(e)=>{input["input1"]=e.target.value;setinput(input)}} value={input["input1"]} placeholder='Car Name' type="text" className=' w-full mt-1 rounded p-1 bg-slate-500'></input><br/>

                            <p><span className=' text-xs text-gray-300'>Placeholder for input box.</span></p>
                            <input name='input2' onChange={(e)=>{input["input2"]=e.target.value;setinput(input)}} value={input["input2"]} placeholder='Ferrari' type="text" className=' w-full mt-1 rounded p-1 bg-slate-500'></input><br/>
                        </div> */}
                        {divs.map((divIndex, index) => (
                            <div key={divIndex} className='p-3 rounded-xl border border-slate-800 bg-slate-900/70 relative'>
                                <div className='flex justify-between'>
                                    <div className='text-xs text-slate-400'>Input Field #{index + 1}</div>
                                    <button onClick={() => handleDeleteDiv(index)} className='bg-slate-800 px-2 rounded absolute right-2 top-2 text-slate-300 hover:bg-slate-700'>X</button>
                                </div>
                                <input name='prefix' 
                                    value={inputValues[index].input1}  
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder='Car Name' type="text" 
                                    className='w-full mt-2 rounded-md border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none' 
                                /><br/>
                                <p><span className=' text-xs text-slate-400'>Placeholder for input box.</span></p>
                                <input name='placeholder'
                                    value={inputValues[index].input2}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder='Ferrari' type="text" 
                                    className='w-full mt-1 rounded-md border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none' 
                                /><br/>
                            </div>
                        ))}
                        <div className='flex justify-end mt-1'>
                            <div className='flex gap-2'>
                                <button onClick={()=>handleAddDiv()} className='px-3 py-1.5 rounded-full border border-slate-700 bg-slate-900/80 text-xs hover:bg-slate-800'> + Insert Input</button>
                                <button onClick={()=>finalise()} className='px-3 py-1.5 rounded-full bg-emerald-500/90 text-xs font-semibold text-slate-950 hover:bg-emerald-400'> {">"} Run</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='test' className='' style={{display:'none', position:'absolute', top: "0px", left:"0px", width:'100vw', height:'100vh', background: 'rgba(0,0,0,0.4)'}}>
                <div id='run' onClick={(e)=>handleClickOutside(e)} className='flex items-center justify-center h-full'>
                    <div id='runMain' className='glass-panel rounded-xl pt-5' style={{height:'calc(100vh - 180px)', maxWidth:"900px", width:"90%"}}>
                        <div className='flex justify-end gap-2 px-5'>
                            <button onClick={() => handleRun()} className='primary-gradient px-4 py-1.5 rounded-full text-xs font-semibold'>Run</button>
                        </div>
                        {(final['texts'])?final.texts.map((text,index) => (
                            <div key={index} className='px-5 text- my-4'>
                                <p className='text-slate-300 text-xs font-mono'> {text.prefix} </p>
                                <input className='w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none' type='text' placeholder={text.placeholder} /> 
                            </div>
                        )):""}
                    </div>
                </div>
            </div>
        </div>
  );
}

export default TextToImage;
