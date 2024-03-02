import React, { useState } from 'react';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const FAQ = () => {
  const faqData = [
    { id: 'q1', question: 'How can I create my own AI application on your platform?', answer: 'Creating your AI application is easy! Simply click  the create  button, choose the desired functionalities such as image-to-text or text-to-text, and follow our intuitive step-by-step guide. Our platform is designed to make the process accessible for users of all skill levels.' },
    { id: 'q2', question: ' What types of AI applications can I find in the marketplace?', answer: 'Our marketplace hosts a diverse range of AI applications, from image recognition for disease diagnosis to language processing applications. Explore and discover solutions that suit your needs, or be inspired to  innovate.' },
    { id: 'q3', question: ' Can I monetize the AI applications I create on your platform?', answer: 'No, currently you do not have the option to monetize your AI applications , but our team is working on it.' },
  ];

  const [activeAnswer, setActiveAnswer] = useState(null);

  const toggleAnswer = (id) => {
    setActiveAnswer((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className='w-11/12 mx-auto pt-24 mb-20'>
      <div className='text-3xl font-bold text-blue-700 mt-5 mb-8 sm:text-center'>
        Frequently asked questions
      </div>
      <div className="faq-container flex flex-col gap-2">
        {faqData.map((faq) => (
          <div key={faq.id} className='flex flex-col gap-1 py-2 border-b-2 border-gray-700 bg-[#999DAA] bg-blue-200 border-opacity-30  px-4 rounded-xl'>
            <div className="question flex flex-row justify-between    px-4 py-2 rounded-xl  " onClick={() => toggleAnswer(faq.id)}>
              <span className='text-black '>{faq.question}</span>
              {activeAnswer === faq.id ? (
                <SlArrowUp className="text-black ml-2" />
              ) : (
                <SlArrowDown className="text-black ml-2" />
              )}
              
            </div>
            {activeAnswer === faq.id && (
              <div className="answer px-4 bg-blue-500 text-white  py-2 rounded-xl">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
