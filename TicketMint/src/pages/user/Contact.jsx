import React from 'react';
import { MdEmail } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import Mesagge from '../../../public/mesagge.png'

const Contact = () => {
    return (
        <main className=' w-full min-h-screen desktop:mt-1 gap-10 text-white flex flex-col m-auto dark:bg-[#0B0B1C]'>
            <h1 className='text-lg md:text-3xl dark:text-white text-black font-bold text-center desktop:text-5xl desktop:mt-20'>Contact Us</h1>
            <h2 className='text-base md:text-lg dark:text-white text-black text-center desktop:text-xl px-5 md:w-[75%] mx-auto'>We are here to help you. Please do not hesitate to contact us. Your opinion matters to us. Write to us and we'll get back to you soon. Thank you for choosing TicketMint.</h2>
            <div className='dark:desktop:bg-slate-800 desktop:bg-slate-100 flex flex-col justify-center items-center desktop:flex-row-reverse desktop:w-full desktop:py-2'>
                <form className='flex flex-col text-lg text-black gap-3 p-5 w-[85%] md:w-[60%] desktop:w-1/3 my-auto rounded-lg dark:bg-gray-900 bg-[#6651c3]'>
                    <label className='relative'>
                        <FaRegUser className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500' />
                        <input type="text"  name='' className='w-full p-2 pl-10 rounded-xl dark:bg-[#131516] text-white' placeholder='Full Name' />
                    </label>
                    <label className='relative'>
                        <MdEmail className='absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500' />
                        <input type="email"  name='' className='w-full p-2 pl-10 rounded-xl dark:bg-[#131516] text-white' placeholder='Email Address' />
                    </label>
                    <label className='relative'>
                        <textarea
                             name=''
                            className='w-full p-2 pl-3 rounded-xl h-40 dark:bg-[#131516] text-white'
                            placeholder='Message...'
                        />
                    </label>
                    <input type="submit" value="Submit" className='w-full py-2 pl-3 text-white text-xl cursor-pointer rounded-xl dark:bg-slate-600 bg-slate-900 hover:bg-slate-700 duration-300' />
                </form>
                <div className='desktop:self-start bg--red-500 movil:mb-20 md:mb-0 desktop:w-[40%]'>
                    <img src={Mesagge} className='w-full h-full' alt="email" />
                </div>
            </div>
        </main>
    );
};

export default Contact;
