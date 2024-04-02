import React, { useState, useEffect } from 'react'
import Switch from '../../utils/Switch.jsx';
import { Link } from 'react-router-dom'
import { MdOutlineDarkMode, MdOutlinePrivacyTip, MdOutlineLightMode } from "react-icons/md";
import { PiCurrencyCircleDollarLight } from "react-icons/pi";
import { IoWalletOutline, IoChatbubbleOutline } from "react-icons/io5"
import { IoIosQrScanner, IoIosHelpCircleOutline, IoIosArrowForward } from "react-icons/io";

const Configurations = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isBiometry, setIsBiometry] = useState(false);
    const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'USD');

    useEffect(() => {
        localStorage.setItem('currency', currency);
    }, [currency]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleBiometry = () => {
        setIsBiometry(!isBiometry);
    };


    return (
        <main className='flex text-white flex-col desktop:mt-20 items-center w-full m-auto min-h-screen bg-[#0B0B1C]'>
            <h1 className='text-lg font-medium py-1 text-center desktop:text-5xl'>Configurations</h1>
            <section className='w-[86%] desktop:w-[60%] py-5 bg-desactive-slate-600'>
                <h3 className='text-start font-medium text-lg desktop:text-2xl py-3'>Principal</h3>

                <ul className='text-sm font-medium'>
                    <li className='bg-desactive-red-500 flex justify-between items-center gap-3 py-3'>
                        <div className="flex items-center gap-3">
                            <MdOutlineLightMode className='text-2xl' />
                            <span>Light Theme </span>
                        </div>
                        <Switch isToggle={isDarkMode} onToggle={toggleDarkMode} />
                    </li>
                    <li className='bg-desactive-green-600 flex justify-between items-center gap-3 py-3'>
                        <Link to='/Currency' className='flex items-center gap-3'>
                            <PiCurrencyCircleDollarLight className='text-2xl' />
                            <span>Currency</span>
                        </Link>
                        <select
                            className='flex items-center gap-1 bg-transparent px-5'
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option value='USD' className=' text-[#6d6d77] font-semibold'>USD</option>
                            <option value='ARS' className=' text-[#6d6d77] font-semibold'>ARS</option>
                            <option value='COP' className=' text-[#6d6d77] font-semibold'>COP</option>
                        </select>
                    </li>
                </ul>

            </section>
            <section className='w-[86%] desktop:w-[60%] py-3 border-t bg-desactive-slate-600' >
                <h3 className='text-start font-medium text-lg desktop:text-2xl py-3'>Support</h3>

                <ul className='text-sm font-medium'>
                    <li className='bg-desactive-red-950 flex justify-between items-center gap-3 py-3'>
                        <Link to='/Help' className='flex items-center gap-3'>
                            <IoIosHelpCircleOutline className='text-2xl' />
                            <span>Help</span>
                        </Link>
                        <IoIosArrowForward className='text-2xl' />
                    </li>
                    <li className='bg-desactive-amber-600 flex justify-between items-center gap-3 py-3'>
                        <Link to='/Privacity' className='flex items-center gap-3 '>
                            <MdOutlinePrivacyTip className='text-2xl' />
                            <span>Privacy</span>
                        </Link>
                        <IoIosArrowForward className='text-2xl' />
                    </li>
                    <li className='bg-desactive-amber-600 flex justify-between items-center gap-3 py-3'>
                        <Link to='/Contact' className='flex items-center gap-3'>
                            <IoChatbubbleOutline className='text-2xl' />
                            <span>Contact us</span>
                        </Link>
                        <IoIosArrowForward className='text-2xl' />
                    </li>
                </ul>

            </section>
        </main>
    )
}

export default Configurations