import React, {  useState, useRef } from 'react';
import Markdown from 'react-markdown'
import Publish from './Publish';
import axios from 'axios';


function Text_ImageToText() {
  const [divs, setDivs] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [images, setimages] = useState([]);
  const [inputImages, setinputImages] = useState([]);
  const [prompt, setprompt] = useState('');
  const [final, setfinal] = useState({});
  const [modelOutput, setmodelOutput] = useState();
  const [isRunning, setisRunning] = useState(false);
  const [textinputs, settextinputs] = useState({});
  const [imageinputs, setimageinputs] = useState({});
  const [files, setfiles] = useState({});
  const fileRef = useRef(null);

  const [isuploading, setIsuploading] = useState(false);


  const handleAddDiv = () => {
    const newDivs = [...divs, divs.length];
    const newInputValues = [...inputValues, { prefix: '', placeholder: ''}];
    setDivs(newDivs);
    setInputValues(newInputValues);
  };

  const handleAddImage = () => {
    const newImages = [...images, images.length];
    const newInputImages = [...inputImages, { placeholder : ''}];
    setimages(newImages);
    setinputImages(newInputImages);
  }

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
  };

  const handleClickOutside = (e, id) =>{
    if(e.target.id !== "run"){
        return;
    }
    document.getElementById(id).style.display = "none";
  }

  const handleInput = (index, event) =>{
    const {value} = event.target;
    const newInputs = {...textinputs};
    newInputs[index] = value;
    settextinputs(newInputs);
  }

  function imageFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
  }

  const handleInputImage = async (index, event) =>{
    setIsuploading(true);
    const value = event.target.files[0];
    var newInputs = imageinputs;
    var allImages = {...files};
    allImages[index] = value;
    setfiles(allImages);
    const formD = new FormData();
    formD.append("file", value);
    await axios.post("http://localhost:3000/upload", formD)
        .then(res => { 
            console.log("response : ", res.data)
            newInputs[index] = {"image" : res.data.destin, "mimetype" : res.data.mimetype};
        })
    setimageinputs(newInputs);
    setIsuploading(false);
  }

  const finalise = ()=>{
    var obj = {};
    obj["model"] = "text-image-to-text"
    obj["prompt"] = prompt;
    obj["texts"] = [...inputValues]
    obj["images"] = [...inputImages]
    obj["inputs"] = "text"
    console.log(obj);
    setfinal(obj);
  }

  async function getObj(){
        var newInputValues = [];
        var newInputImages = [];
        for(var i=0; i<inputValues.length; i++){
            newInputValues.push({...inputValues[i], ...{"value" : textinputs[i]}});
        }
        for(var i=0; i<inputImages.length; i++){
            newInputImages.push({...inputImages[i], ...imageinputs[i]});
        }
        var obj = {};
        obj["model"] =  "text-image-to-text"
        obj["prompt"] =  prompt 
        obj["texts" ] =  [...newInputValues]
        obj["images"] =  [...newInputImages]
        obj["inputs" ] =  ["text", "image"]
        return obj
  }

  const TestApp = () =>{
    finalise();
    document.getElementById("test").style.display = "block";
  }

  const handleRun = async () =>{
    setisRunning(true);
    const dataObj = await getObj();
    console.log("dataObj : ", dataObj);
    await axios.post("http://localhost:3000/ai/testrunimg", dataObj)
        .then(res => { 
            console.log("response : ", res.data)
            setmodelOutput(res.data);
        })
    setisRunning(false);
  }

  const handlePublish = (data) => {
    finalise();
    document.getElementById("publish").style.display = "block";
  }


  return (
    <div className=' pt-20 bg-gray-900 gradientbg' style={{minHeight:"100vh"}}>
            <div className='flex justify-center p-8 ' style={{minHeight:"calc(100vh - 80px)"}}>
                <div className='min-w-[20rem] bg-slate-600 text-white rounded-2xl' style={{minWidth:"300px", maxWidth:"900px", width:"99%"}}>
                   
                    <div id='inputs' className=' p-3' style={{minHeight:"calc(100%-2.5rem)"}}>
                        <div className='flex justify-between'>
                          <p className='pb-2'>You can customise your prompts here.</p>
                          <button onClick={() => handlePublish()} className=' px-2 pb-1 rounded bg-pink-300'>Publish</button>
                        </div>
                        <textarea name='prompt' value={prompt} onChange={(e)=>{setprompt(e.target.value)}} placeholder='Enter the prompt . . .' 
                            className='bg-brand-amber-1 min-h-[8rem] w-full resize-none rounded border bg-gray-500 border-zinc-300/100 p-2 text-sm focus:border-black/30 focus:outline-none'>
                        </textarea>
                        {divs.map((divIndex, index) => (
                            <div key={divIndex} className=' p-2 my-2 rounded border bg-gray-600 relative'>
                                <div className='flex justify-between'>
                                    <div className=' text-xs text-gray-300'>Prefix to append input in prompt.{divIndex} , {index}</div>
                                    <button onClick={() => handleDeleteDiv(index)} className=' bg-red-900 px-2 rounded absolute -right-0 -top-0'>X</button>
                                </div>
                                <input name='prefix' 
                                    value={inputValues[index].prefix}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder ='Enter Prefix' type="text" 
                                    className=' w-full mt-1 rounded p-1 bg-gray-500' 
                                /><br/>
                                <p><span className=' text-xs text-gray-300'>Placeholder for input box.</span></p>
                                <input name='placeholder'
                                    value={inputValues[index].placeholder}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder='Enter Placeholder' type="text" 
                                    className=' w-full mt-1 rounded p-1 bg-gray-500' 
                                /><br/>
                            </div>
                        ))}
                        {images.map((divIndex, index) => (
                            <div key={divIndex} className=' p-2 my-2 rounded border bg-gray-600 relative'>
                                <div className='flex justify-between'>
                                <p><span className=' text-xs text-gray-300'>Placeholder for Image Input.</span></p>
                                    <button onClick={() => handleDeleteImage(index)} className=' bg-red-900 px-2 rounded absolute -right-0 -top-0'>X</button>
                                </div>
                                
                                <input name='placeholder'
                                    value={inputImages[index].placeholder}
                                    onChange={(e) => handleImageInputChange(index, e)}
                                    placeholder='Enter the description of Image.' type="text" 
                                    className=' w-full mt-1 rounded p-1 bg-gray-500' 
                                /><br/>
                            </div>
                        ))}
                        <div className='flex justify-center mt-3'>
                            <div className='flex gap-2'>
                                <button onClick={()=>handleAddDiv()} className=' p-0.5 pb-1 px-2 rounded bg-gray-400 hover:bg-slate-500'> + Insert Texts</button>
                                <button onClick={()=>handleAddImage()} className=' p-0.5 pb-1 px-2 rounded bg-gray-400 hover:bg-slate-500'> + Insert Image</button>
                                <button onClick={()=>TestApp()} className=' p-0.5 pb-1 px-2 rounded bg-green-600 hover:bg-green-800'> {">"} Test</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='test' className='' style={{display:'none', position:'absolute', top: "0px", left:"0px", width:'100vw', height:'100vh', background: 'rgba(0,0,0,0.4)'}}>
                <div id='run' onClick={(e)=>handleClickOutside(e, 'test')} className='flex items-center justify-center h-full'>
                    <div className=' bg-neutral-700 rounded-xl pt-5' style={{height:'calc(100vh - 180px)',maxWidth:"900px", width:"90%"}}>
                        <div className='flex justify-end gap-2 px-5'>
                            {isuploading?
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>:""}
                            <button onClick={() => handleRun()} className=' px-2 pb-1 rounded bg-pink-300' disabled={isuploading}>Run</button>
                        </div>
                        <div className=' overflow-y-auto ' style={{height:"calc(100% - 30px)"}}>
                        {(final['texts'])?final.texts.map((text,index) => (
                            <div key={index} className='px-5 text- my-4'>
                                <p className='text-white font-mono'> {text.prefix} </p>
                                <input onChange={(e)=>{handleInput(index, e)}} className=' bg-white w-full px-3 py-1 rounded' type='text' placeholder={text.placeholder} /> 
                            </div>
                        )):""}
                        {(final['images'])?final.images.map((text,index) => (
                            <div key={index} className='px-5 text- my-4'>
                                <p className='text-white font-mono'> {text.placeholder} </p>
                                {/* <input onChange={(e)=>{handleInputImage(index, e)}} className=' bg-white w-full px-3 py-1 rounded' type='file' accept='image/*' placeholder={text.placeholder} />  */}
                                <input
                                    onChange={(e) => handleInputImage(index, e)}
                                    type='file'
                                    ref={fileRef}
                                    accept='image/*'
                                    hidden
                                />
                                <img
                                    src={(files[index])?URL.createObjectURL(files[index]): '/image.png'}
                                    onClick={() => fileRef.current.click()}
                                    alt="profile image"
                                    loading='lazy'
                                    className='rounded h-24 w-28  sm:h-40 sm:w-40 object-cover cursor-pointer  mt-4 self-center'
                                />
                            </div>
                        )):""}
                        <div className=' text-white font-light p-3 px-5'>
                            {isRunning?
                            <div>
                              Running...
                            </div>:
                            <Markdown>{modelOutput}</Markdown>
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='publish' className='' style={{display:'none', position:'absolute', top: "0px", left:"0px", width:'100vw', height:'100vh', background: 'rgba(0,0,0,0.4)'}}>
                <div id='run' onClick={(e)=>handleClickOutside(e, 'publish')} className='flex items-center justify-center h-full'>
                    <div id='runMain' className=' bg-slate-600 rounded-xl pt-5' style={{height:'calc(100vh - 180px)',maxWidth:"900px", width:"90%"}}>
                        <div className=' overflow-y-auto ' style={{height:"calc(100% - 30px)"}}>
                          <Publish data={final} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Text_ImageToText;
