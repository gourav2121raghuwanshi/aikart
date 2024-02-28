import React from 'react'
import { useState } from 'react';

const TextToText = () => {
    const [elements, setelements] = useState([]);

    const AddInput = () =>{
        const el = (
            <div className=' p-2 my-2 rounded border bg-gray-600'>
                <p><span className=' text-xs text-gray-300'>Prefix to append input in prompt.</span></p>
                <input name='inputfield' placeholder='Car Name' type="text" className=' w-full mt-1 rounded p-1 bg-slate-500'></input><br/>

                <p><span className=' text-xs text-gray-300'>Placeholder for input box.</span></p>
                <input name='inputfield' placeholder='Ferrari' type="text" className=' w-full mt-1 rounded p-1 bg-slate-500'></input><br/>
            </div>
        )
        setelements(prev=>[...prev, el]);
    }

    return (
        <div className=' pt-20 bg-gray-900' style={{minHeight:"100vh"}}>
            <div className='flex justify-center p-8 ' style={{minHeight:"calc(100vh - 80px)"}}>
                <div className='min-w-[20rem] bg-gray-900 text-white rounded-2xl' style={{minWidth:"300px", maxWidth:"900px", width:"99%"}}>
                    {/* <div className='flex items-center h-10 px-6 rounded-t-2xl bg-gray-500'>
                        <button onClick={()=>AddInput()} className=' p-0.5 rounded-md px-2 bg-gray-400 hover:bg-gray-300'>Insert Input</button>
                    </div> */}
                    <div id='inputs' className=' p-3' style={{minHeight:"calc(100%-2.5rem)"}}>
                        <p className='pb-2'>You can customise your prompts here.</p>
                        <textarea placeholder='example : You are an agent and you will be given the car name you have to output few car models with their details in the json object format with fields like model-name, engine, milage, power, and extra-features. ' 
                            className='bg-brand-amber-1 min-h-[8rem] w-full resize-none rounded border bg-zinc-700 border-zinc-300/100 p-2 text-sm focus:border-black/30 focus:outline-none'>
                        </textarea>
                        <div className=' p-2 my-2 rounded border bg-gray-600'>
                            <h2 className=' text-gray-400'>Input Field</h2>
                            <p><span className=' text-xs text-gray-300'>Prefix to append input in prompt.</span></p>
                            <input name='inputfield' placeholder='Car Name' type="text" className=' w-full mt-1 rounded p-1 bg-slate-500'></input><br/>

                            <p><span className=' text-xs text-gray-300'>Placeholder for input box.</span></p>
                            <input name='inputfield' placeholder='Ferrari' type="text" className=' w-full mt-1 rounded p-1 bg-slate-500'></input><br/>
                        </div>
                        {elements.map((element, index)=>(
                            <React.Fragment key={index}>
                                {element}
                            </React.Fragment>
                        ))}
                        <div className='flex justify-center mt-3'>
                            <div className='flex gap-2'>
                                <button onClick={()=>AddInput()} className=' p-0.5 pb-1 px-2 rounded bg-gray-400 hover:bg-slate-500'> + Insert Input</button>
                                <button onClick={()=>AddInput()} className=' p-0.5 pb-1 px-2 rounded bg-green-600 hover:bg-green-800'> {">"} Run</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextToText