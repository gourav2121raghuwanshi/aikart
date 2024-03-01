import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Publish = ({data}) => {
    const [file, setFile] = useState(null);
    const [fileurl, setfileurl] = useState();
    const [formData, setFormData] = useState();
    const fileRef = useRef(null);
    const { currentUser } = useSelector(state => state.user);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        //formData["avatar"] = file;
        var newData = { ...data, ...formData };
        console.log(currentUser)
        const formD = new FormData();
        formD.append('userid', currentUser._id);
        formD.append("avatar", file);
        Object.keys(newData).forEach(key=>{
            formD.append(key, newData[key]);
        })
        document.getElementById("publish").style.display = "none";
        
        axios.post("http://localhost:3000/ai/publish", formD)
        .then(res => { 
            console.log(res.data)
            window.alert(res.data.message, "id : ", res.data.id);
        })
    }
    
    
    return (
        <div className='w-full flex flex-col items-center gap-3 px-3 pb-2 '>
            <input
                onChange={(e) => {setfileurl(URL.createObjectURL(e.target.files[0])); setFile(e.target.files[0]); }}
                type='file'
                ref={fileRef}
                accept='image/*'
                hidden
            />
            <img
                src={  fileurl || ''}
                onClick={() => fileRef.current.click()}
                alt="profile image"
                loading='lazy'
                className='rounded-full h-16 w-16  sm:h-40 sm:w-40 object-cover cursor-pointer border mt-4 self-center'
            />
            <div className='w-full'>
                <p className='text-white'>Title</p>
                <input
                     name='title'
                     onChange={(e)=> handleChange(e)}
                     placeholder='Enter title of the App.'
                     className='w-full py-1 px-3 rounded'
                />
            </div> 
            <div className='w-full'>
                <p className='text-white'>Describe your App</p>
                <textarea
                     name='description'
                     onChange={(e)=> handleChange(e)}
                     placeholder='Description'
                     className='w-full py-1 px-3 rounded'
                ></textarea>
            </div>
            <div className='w-full'>
                <p className='text-white'>How to Use It</p>
                <textarea
                     name='howtouse'
                     onChange={(e)=> handleChange(e)}
                     placeholder='Describe how user should use it'
                     className='w-full py-1 px-3 rounded'
                ></textarea>
            </div>
            <div className='flex justify-end gap-2 px-5'>
                <button onClick={() => handleSubmit()} className=' px-2 pb-1 rounded bg-pink-300'>Publish</button>
            </div>
        </div>
    )
}

export default Publish