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
    <div className='w-11/12 max-w-6xl mx-auto pt-10 mb-20'>
      <div className='glass-panel px-5 py-5 sm:px-7 sm:py-6 mb-5'>
        <p className='text-[11px] uppercase tracking-[0.2em] text-indigo-300'>Support</p>
        <div className='text-3xl font-bold text-slate-50 mt-1 sm:text-left'>
          Frequently Asked Questions
        </div>
        <p className='text-sm text-slate-300 mt-1 max-w-2xl'>
          Quick answers to common questions about creating, publishing, and using apps on AI-Kart.
        </p>
      </div>

      <div className="faq-container flex flex-col gap-3">
        {faqData.map((faq) => (
          <div key={faq.id} className='rounded-2xl border border-slate-800/80 bg-slate-900/75 overflow-hidden'>
            <button
              className="question w-full text-left flex flex-row justify-between items-center px-4 py-4"
              onClick={() => toggleAnswer(faq.id)}
            >
              <span className='text-slate-100 text-sm sm:text-base font-medium pr-3'>{faq.question}</span>
              {activeAnswer === faq.id ? (
                <SlArrowUp className="text-slate-300 ml-2 shrink-0" />
              ) : (
                <SlArrowDown className="text-slate-300 ml-2 shrink-0" />
              )}
            </button>
            {activeAnswer === faq.id && (
              <div className="answer px-4 pb-4 text-slate-300 text-sm leading-relaxed border-t border-slate-800/80">
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
