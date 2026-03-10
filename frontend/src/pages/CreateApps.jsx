import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const CreateApps = () => {
  return (
    <div>
      <div className='flex items-center justify-center'>
        <div className='font-sans text-center mt-32'>
          <span style={{ fontSize: "4rem", fontWeight: "bold", lineHeight: "3rem" }}>
            <span className='text-sky-500'>Ai-Kart</span> App Creator
          </span>
          <p className='mt-6'>Create customized AI agents tailored to specific needs.</p>
        </div>
      </div>

      <div className='mt-20 mb-20 px-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <Link
          className="bg-blue-300 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2"
          to="/create/text-to-text"
        >
          <h1 className="flex justify-between text-2xl">Text-to-Text</h1>
          <p>Create Text to Text custom tailored apps.</p>
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src="/text-to-text.png"
              alt="Text-to-Text"
              className="w-full duration-100 group-hover:-0"
            />
          </div>
        </Link>

        <Link
          className="bg-blue-300 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2"
          to="/create/text-image-to-text"
        >
          <h1 className="flex justify-between text-2xl">Text + Image to Text</h1>
          <p>Make apps that generate text from text and images.</p>
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src="/image-to-text.png"
              alt="Text + Image to Text"
              className="w-full duration-100 group-hover:-0"
            />
          </div>
        </Link>

        <Link
          className="bg-blue-300 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2"
          to="/create/text-to-image"
        >
          <h1 className="flex justify-between text-2xl">Text to Image</h1>
          <p>Make apps that generate images from text.</p>
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src="/text-to-image1.png"
              alt="Text-to-Image"
              className="w-full grayscale duration-100 group-hover:-0"
            />
          </div>
        </Link>

        <div className="bg-blue-300 group flex flex-col gap-3 rounded-2xl p-5 duration-100 opacity-70 cursor-not-allowed">
          <h1 className="flex justify-between text-2xl">Text + Image to Image</h1>
          <p>Make apps that generate images from text and images.</p>
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src="/text-to-image.png"
              alt="Text + Image to Image"
              className="w-full grayscale duration-100 group-hover:-0"
            />
          </div>
        </div>

        <div className="bg-blue-300 group flex flex-col gap-3 rounded-2xl p-5 duration-100 opacity-70 cursor-not-allowed">
          <h1 className="flex justify-between text-2xl">Document Querying</h1>
          <p>Create apps that can answer queries from large documents.</p>
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src="/Query.png"
              alt="Document Querying"
              className="w-full grayscale duration-100 group-hover:-0"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateApps;