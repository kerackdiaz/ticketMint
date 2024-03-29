import React, { useState } from 'react'
import Switch from '../../utils/Switch.jsx';
import { Link } from 'react-router-dom'
import { MdOutlineDarkMode, MdOutlinePrivacyTip, MdOutlineLightMode } from "react-icons/md";
import { PiCurrencyCircleDollarLight } from "react-icons/pi";
import { IoWalletOutline, IoChatbubbleOutline } from "react-icons/io5"
import { IoIosQrScanner, IoIosHelpCircleOutline, IoIosArrowForward } from "react-icons/io";

const Configurations = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isBiometry, setIsBiometry] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleBiometry = () => {
        setIsBiometry(!isBiometry);
    };


    return (
        <main className='flex text-white flex-col items-center w-full m-auto min-h-screen bg-[#0B0B1C]'>
            <h1 className='text-lg font-medium py-1 text-center'>Configurations</h1>
            <section className='w-[86%] py-5 bg-desactive-slate-600'>
                <h3 className='text-start font-medium text-lg py-3'>Principal</h3>

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
                        <div className='flex items-center gap-1'>
                            <span className=' text-[#6d6d77] font-semibold'>ARS</span> <IoIosArrowForward className='text-2xl'/>
                        </div>
                    </li>
                </ul>

            </section>

            <section className='w-[86%] pt-4 border-t bg-desactive-slate-600'>
                <h3 className='text-start font-medium text-lg py-3'>Security</h3>

                <ul className='text-sm font-medium'>
                    <li className='bg-desactive-blue-500 flex justify-between items-center gap-3 py-3'>
                        <Link to='/Wallet' className='flex items-center gap-3'>
                            <IoWalletOutline className='text-2xl' />
                            <span>Wallet</span>
                        </Link>
                        <IoIosArrowForward className='text-2xl' />
                    </li>
                    <li className='bg-desactive-emerald-950 flex justify-between items-center gap-3 py-3'>
                        <div className="flex items-center gap-3">
                            <IoIosQrScanner className='text-2xl' />
                            <span>biomagnetic verification</span>
                        </div>
                        <Switch isToggle={isBiometry} onToggle={setIsBiometry} />
                    </li>
                </ul>

            </section>
            <section className='w-[86%] py-3 bg-desactive-slate-600' >
                <h3 className='text-start font-medium text-lg py-3'>Support</h3>

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