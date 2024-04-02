import React from 'react';
import { IoIosArrowForward } from "react-icons/io";

const Acordion = ({ title, answer, isOpen, onToggle }) => {
    return (
        <div className='bg-[#0f1111] rounded-md flex flex-col h-full'>
            <button onClick={onToggle} className='w-full rounded-md py-2 flex justify-between items-center text-black '>
                <span className='text-base text-white md:text-lg font-medium ml-2'>{title}</span>
                <span><IoIosArrowForward className={`${isOpen ? 'rotate-90' : 'rotate-0'} transition-all duration-900`} /></span>
            </button>
            <ul className={`bg-[#131516] rounded-b-md grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-3' : 'grid-rows-[0fr] opacity-0'}`}>
                <li className='text-sm md:text-base px-3 text-[#9d9487] overflow-hidden'>{answer}</li>
            </ul>
        </div>
    );
};

export default Acordion;
