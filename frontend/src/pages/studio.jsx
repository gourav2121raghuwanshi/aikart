import React, { useRef, useState } from 'react';
import axios from "axios";

const ImageForm = () => {

const [file, setFile] = useState(null);
const [res, setRes] = useState(null);
const [elements, setElements] = useState([]);
const object = {};


const handleFileChange = (event) => {
    setFile(event.target.files);
    console.log(file)
}


const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    for(var x = 0; x<file.length; x++) {
        data.append('file', file[x])
    }
    axios.post("http://localhost:3000/upload", data)
    .then(res => { 
        console.log(res)
        setRes(JSON.stringify({"path":res.data.path, "mimetype": res.data.mimetype}))
    })
}

const addPrompt = ()=> {
    const newElement = (
        <div>
            <textarea style={{width:"inherit"}}></textarea>
        </div>)
    setElements(prevElements => [...prevElements, newElement])
}

const addInput = ()=> {
    const newElement = (
        <div>
            <input type="text" style={{width:"400"}}></input>
        </div>)
    setElements(prevElements => [...prevElements, newElement])
}

const buttonStyle = {}

return ( 
    <div className=' w-full flex bg-fuchsia-200' style={{minHeight:"calc(100vh - 77px)"}}>
        <div id='sidepan' className=' bg-slate-400 p-1 flex flex-col gap-1' style={{width:"150px"}}>
            <button onClick={()=>addInput()} className=' w-full bg-gray-500 hover:bg-slate-300'>
                text input
            </button>
            <button onClick={()=>addImageInput()} className=' w-full bg-gray-500 hover:bg-slate-300'>
                
            </button>
        </div>
        <div id='canvas' className=' bg-slate-300 p-3 scroll-my-1' style={{width:"calc(100% - 150px)"}}>
            <textarea className='bg-brand-amber-1 min-h-[8rem] min-w-[20rem] max-w-[25rem] resize-none rounded border border-zinc-300/100 p-2 text-sm focus:border-black/30 focus:outline-none'></textarea>
            {elements.map((element, index)=>(
                <React.Fragment key={index}>
                    {element}
                </React.Fragment>
            ))}
        </div>
    </div>
 );
}

export default ImageForm;