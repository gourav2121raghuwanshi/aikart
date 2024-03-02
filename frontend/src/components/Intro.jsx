import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';


const Intro = () => {
    const {id}  = useParams();
    const [market, setMarket] = useState([]);
    const [isRunning, setisRunning] = useState();
    const [modelOutput, setmodelOutput] = useState();
    const [final, setfinal] = useState();
    const [files, setfiles] = useState({});
    const [isuploading, setIsuploading] = useState();
    const fileRef = useRef(null);
    const [imageinputs, setimageinputs] = useState({});

    useEffect(() => {
        const getMarket = async () => {
          try {
            const res = await axios.get(`/ai/getprompt/${id}`);
            const data = await res.data;
            setMarket(data);
            setfinal(data);
            console.log(data);
            console.log(JSON.parse(data.texts));
          } catch (err) {
            console.log("cannot get market ");
          }
        };
        getMarket();
    }, []);

    const handleInput = (index, event) =>{
      const { value } = event.target;
      const newInputValues = final;
      newInputValues['texts'][index]["value"] = value;
      setfinal(newInputValues);
    }

    const handleInputImage = async (index, event) =>{
      setIsuploading(true);
      const value = event.target.files[0];
      var newInputs = final;
      var allImages = {...files};
      allImages[index] = value;
      setfiles(allImages);
      const formD = new FormData();
      formD.append("file", value);
      await axios.post("http://localhost:3000/upload", formD)
          .then(res => { 
              console.log("response : ", res.data)
              newInputs["images"][index] ={...final["images"][index] , ...{"image" : res.data.destin, "mimetype" : res.data.mimetype}};
          })
      
      setfinal(newInputs);
      setIsuploading(false);
    }

    const handleRun = async () => {
      setisRunning(true);
      try {
        if(final?.model==="text-image-to-text"){
          const res = await axios.post(`/ai/testrunimg`, final);
          const data = await res.data;
          setmodelOutput(data);
        }else if(final?.model==="text-to-text"){
          const res = await axios.post(`/ai/testrun`, final);
          const data = await res.data;
          setmodelOutput(data);
        }else{
          window.alert("Model not found");
          return;
        }
      } catch (err) {
        console.log(err);
      }
      setisRunning(false);
    }

  return (
    <div>
        <div className=' pt-28 w-full ' style={{ height : "100vh"}}>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex flex-col items-center'>
                <img className='rounded-xl ' src={market.avatar} style={{width:"300px"}}/>
                <div className='mt-1 flex justify-center' style={{fontSize:30,display:"flex"}}>{market?.title}</div>
                <div className=' ' style={{fontWeight:500, marginTop:"10px",marginBottom:"10px"}}>
                   {market?.description}
                </div>
                <div style={{fontWeight:500}}>
                   {(market["howtouse"]!=="")?<div className=' font-thin'><span className=' font-bold' style={{fontSize:18}}> How to use : </span>{market["howtouse"]}</div>:""}
                </div>
                
              </div>
              <div className=''>
                  <div  className='' style={{ top: "0px", left:"0px", width:'100vw', height:'100vh', }}>
                    <div  className='flex items-center justify-center h-full'>
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
                            {(market['texts'])?market.texts.map((text,index) => (
                                <div key={index} className='px-5 text- my-4'>
                                    <p className='text-white font-mono'> {text.prefix} </p>
                                    <input onChange={(e)=>{handleInput(index, e)}} className=' bg-white w-full px-3 py-1 rounded' type='text' placeholder={text.placeholder} /> 
                                </div>
                            )):""}
                            {(final?.images)?final.images.map((text,index) => (
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
                              {/* <textarea className='bg-brand-amber-1 min-h-[8rem] w-full resize-none rounded border bg-zinc-700 border-zinc-300/100 p-2 text-sm focus:border-black/30 focus:outline-none' value={modelOutput} style={{scrollbarWidth:"3px"}} ></textarea>
                             */}
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
              </div>
            </div>
        </div>
    </div>
  )
}

export default Intro