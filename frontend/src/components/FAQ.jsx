import React, { useState } from 'react';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const FAQ = () => {
  const faqData = [
    { id: 'q1', question: 'How do I contact customer support if I have a question or issue?', answer: ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: 'q2', question: 'How do I return the product if it doesn\'t meet my expectations?', answer: ' It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },
    { id: 'q3', question: 'What makes your product stand out from others in the market?', answer: ' Contrary to popular belief, Lorem Ipsum is not simply random text.' },
  ];

  const [activeAnswer, setActiveAnswer] = useState(null);

  const toggleAnswer = (id) => {
    setActiveAnswer((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className='w-11/12 mx-auto pt-24 mb-20'>
    <div     className='text-3xl font-bold text-gray-700 mt-5 mb-8 sm:text-center'>
    Frequently asked questions
    </div>
    <div className="faq-container   flex flex-col ">
      {faqData.map((faq) => (
        <div key={faq.id} className='flex flex-col gap-1 py-2 border-b-2 border-gray-700 bg-gray-300  border-opacity-30  px-4 rounded-xl'>
          <div className="question flex flex-row justify-between   hover:bg-gray-200 px-4 py-2 rounded-xl  " onClick={() => toggleAnswer(faq.id)}>
            <span className='text-gray-600 '>{faq.question}</span>
            {activeAnswer === faq.id ? (
              <SlArrowUp className="text-black ml-2" />
            ) : (
              <SlArrowDown className="text-black ml-2" />
            )}
          </div>
          {activeAnswer === faq.id && (
            <div className="answer px-4 py-2 text-black">
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
