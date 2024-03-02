import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Publish = ({data}) => {
    const [file, setFile] = useState(null);
    const [fileurl, setfileurl] = useState();
    const [formData, setFormData] = useState();
    const fileRef = useRef(null);
    const [isUploading, setisUploading] = useState(false);
    const { currentUser } = useSelector(state => state.user);
    const [imageUrl, setImageUrl] = useState(null);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        //formData["avatar"] = file;
        if(!imageUrl){window.alert("Image is not Uploaded!"); return};
        var newData = { ...data, ...formData };
        newData["avatar"] = imageUrl;
        newData["userid"] = currentUser._id;
        console.log(newData);
        document.getElementById("publish").style.display = "none";

        axios.post("http://localhost:3000/ai/publish", newData)
        .then(res => { 
            console.log(res.data)
            window.alert(res.data.message +  "\nid : " + res.data.id);
        })
    }

    const handleImageUpload = async (e) => {
        setisUploading(true);
        setfileurl(URL.createObjectURL(e.target.files[0])); 
        setFile(e.target.files[0]); 

        const formD = new FormData();
        formD.append("file", e.target.files[0]);
        await axios.post("http://localhost:3000/ai/upload", formD)
        .then(res => { 
            console.log("response : ", res.data)
            setImageUrl(res.data.path);
        })
        setisUploading(false);
    }
    
    
    return (
        <div className='w-full flex flex-col items-center gap-3 px-3 pb-2 '>
            <input
                onChange={(e) => handleImageUpload(e)}
                type='file'
                ref={fileRef}
                accept='image/*'
                hidden
                required
            />
            <img
                src={  fileurl || '/image.png'}
                onClick={() => fileRef.current.click()}
                alt="App image"
                loading='lazy'
                className=' rounded h-28 w-32  sm:h-40 sm:w-40 object-cover cursor-pointer border border-gray-600 mt-4 self-center'
            />
            <p className=' text-pretty text-stone-200'>Upload Image</p>
            <div className='w-full'>
                <p className='text-white'>Title</p>
                <input
                     name='title'
                     onChange={(e)=> handleChange(e)}
                     placeholder='Enter title of the App.'
                     className='w-full py-1 px-3 rounded'
                     required
                />
            </div> 
            <div className='w-full'>
                <p className='text-white'>Describe your App</p>
                <textarea
                     name='description'
                     onChange={(e)=> handleChange(e)}
                     placeholder='Description'
                     className='w-full py-1 px-3 rounded'
                     required
                ></textarea>
            </div>
            <div className='w-full'>
                <p className='text-white'>How to Use It</p>
                <textarea
                     name='howtouse'
                     onChange={(e)=> handleChange(e)}
                     placeholder='Describe how user should use it'
                     className='w-full py-1 px-3 rounded'
                     required
                ></textarea>
            </div>
            <div className='flex justify-end gap-2 px-5'>
                        {isUploading?
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>:""}
                <button onClick={() => handleSubmit()} className=' px-2 pb-1 rounded bg-pink-300' disabled={isUploading}>Publish</button>
            </div>
        </div>
    )
}

export default Publish