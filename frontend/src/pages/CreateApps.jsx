import React from 'react'

const CreateApps = () => {
  return (
    <div>
        <div className='flex items-center justify-center'>
            <div className=' font-sans text-center mt-16' >
                <span style={{fontSize:"4rem", fontWeight:"bold", lineHeight:"3rem"}}> Ai-Kart App Creator </span>
                <p className=' mt-6'>Create customized AI agents tailored to specific needs.</p>
            </div>
        </div>
        <div className=' mt-20 px-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            <a class=" bg-red-50 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2" href="/sandbox/text-to-image">
                <h1 class="flex justify-between text-2xl">Text-to-Image</h1>
                <p>Generate images from text</p>
                <div class="w-full overflow-hidden rounded-xl">
                    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" 
                    alt="Text-to-Image" class="w-full grayscale duration-100 group-hover:grayscale-0" />
                </div>
            </a>
            <a class=" bg-red-50 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2" href="/sandbox/text-to-image">
                <h1 class="flex justify-between text-2xl">Text-to-Image</h1>
                <p>Generate images from text</p>
                <div class="w-full overflow-hidden rounded-xl">
                    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" 
                    alt="Text-to-Image" class="w-full grayscale duration-100 group-hover:grayscale-0" />
                </div>
            </a>
            <a class=" bg-red-50 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2" href="/sandbox/text-to-image">
                <h1 class="flex justify-between text-2xl">Text-to-Image</h1>
                <p>Generate images from text</p>
                <div class="w-full overflow-hidden rounded-xl">
                    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" 
                    alt="Text-to-Image" class="w-full grayscale duration-100 group-hover:grayscale-0" />
                </div>
            </a>
            <a class=" bg-red-50 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2" href="/sandbox/text-to-image">
                <h1 class="flex justify-between text-2xl">Text-to-Image</h1>
                <p>Generate images from text</p>
                <div class="w-full overflow-hidden rounded-xl">
                    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" 
                    alt="Text-to-Image" class="w-full grayscale duration-100 group-hover:grayscale-0" />
                </div>
            </a>
        </div>
    </div>
  )
}

export default CreateApps