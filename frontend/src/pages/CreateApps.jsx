import React from 'react'
import Footer from '../components/Footer'

const CreateApps = () => {
  return (
    <div>
        <div className='flex items-center justify-center'>
            <div className=' font-sans text-center mt-32' >
                <span style={{fontSize:"4rem", fontWeight:"bold", lineHeight:"3rem"}}> <span className='text-sky-500'>Ai-Kart</span> App Creator </span>
                <p className=' mt-6'>Create customized AI agents tailored to specific needs.</p>
            </div>
        </div>
        <div className=' mt-20 mb-20 px-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 '>
            <a class=" bg-red-50 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2"  href="/create/text-to-text">
                <h1 class="flex justify-between text-2xl">Text-to-Text</h1>
                <p>Create Text to Text custom tailored apps.</p>
                <div class="w-full overflow-hidden rounded-xl">
                    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" 
                    alt="Text-to-Image" class="w-full grayscale duration-100 group-hover:grayscale-0" />
                </div>
            </a>
            <a class=" bg-red-50 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2" href="/create/text&image-to-text">
                <h1 class="flex justify-between text-2xl">Text + Image to Text</h1>
                <p>Make apps that Texts from text and images both.</p>
                <div class="w-full overflow-hidden rounded-xl">
                    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" 
                    alt="Text-to-Image" class="w-full grayscale duration-100 group-hover:grayscale-0" />
                </div>
            </a>
            <a class=" bg-red-50 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2" href="/create/text-to-image">
                <h1 class="flex justify-between text-2xl">Text to Image</h1>
                <p>Make apps that generates Images from texts.</p>
                <div class="w-full overflow-hidden rounded-xl">
                    <img src="https://platform.stability.ai/svg/sandboxes/multi-prompting.webp" 
                    alt="Text-to-Image" class="w-full grayscale duration-100 group-hover:grayscale-0" />
                </div>
            </a>
            <a class=" bg-red-50 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2" href="/create/text&image-to-image">
                <h1 class="flex justify-between text-2xl">Text + Image to Image</h1>
                <p>Make apps that generates Images from texts and Images both.</p>
                <div class="w-full overflow-hidden rounded-xl">
                    <img src="https://platform.stability.ai/svg/sandboxes/multi-prompting.webp" 
                    alt="Text-to-Image" class="w-full grayscale duration-100 group-hover:grayscale-0" />
                </div>
            </a>
            <a class=" bg-red-50 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2" href="/create/document-querie">
                <h1 class="flex justify-between text-2xl">Document Quering</h1>
                <p>Create apps that can answer queries from large documents.</p>
                <div class="w-full overflow-hidden rounded-xl">
                    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" 
                    alt="Text-to-Image" class="w-full grayscale duration-100 group-hover:grayscale-0" />
                </div>
            </a>
        </div>
        <Footer />
    </div>
  )
}

export default CreateApps