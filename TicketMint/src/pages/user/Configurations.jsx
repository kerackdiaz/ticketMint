import React, { useState, useEffect } from 'react'
import Switch from '../../utils/Switch.jsx';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { MdDarkMode, MdOutlinePrivacyTip, MdOutlineLightMode } from "react-icons/md";
import { PiCurrencyCircleDollarLight } from "react-icons/pi";
import { IoWalletOutline, IoChatbubbleOutline } from "react-icons/io5"
import { IoIosQrScanner, IoIosHelpCircleOutline, IoIosArrowForward } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import Swal from 'sweetalert2'

const Configurations = ({ onLogin }) => {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true' || false);
    const [isBiometry, setIsBiometry] = useState(false);
    const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'USD');
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('currency', currency);
    }, [currency]);
    
    const handleCurrencyChange = (event) => {
        const newCurrency = event.target.value;
        console.log(newCurrency);
        setCurrency(newCurrency);
        localStorage.setItem('currency', newCurrency);
    };

    useEffect(() => {
      console.log('Currency: ', currency);
        const fetchExchangeRates = async () => {
            try {
                const response = await axios.get(`https://v6.exchangerate-api.com/v6/0cb396bb3c28c20e0d8120a1/latest/USD`);
                localStorage.setItem('conversion_rates', JSON.stringify(response.data.conversion_rates[currency]));
            } catch (error) {
                console.error('Error fetching exchange rates: ', error);
            }
        };
    
        fetchExchangeRates();
    }, [currency]);

    useEffect(() => {
        if (isDarkMode) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
        localStorage.setItem('darkMode', isDarkMode.toString());
    }, [isDarkMode]);

      const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure you want to go out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/');
                onLogin();
            }});
      }

    return (

        <main className='flex dark:text-white text-[#0b0b1c] flex-col desktop:mt-20  items-center w-full m-auto '>
            <h1 className='text-lg font-medium py-1 text-center desktop:text-5xl'>Profile</h1>
            <section className='w-[86%] desktop:w-[60%] py-5 bg-desactive-slate-600'>
                <h3 className='text-start font-medium text-lg desktop:text-2xl py-3'>Main</h3>

                <ul className='text-sm font-medium'>
                {isDarkMode ?  <li className='bg-desactive-red-500 flex justify-between items-center gap-3 py-3'>
                        <div className="flex items-center gap-3">
                           <MdOutlineLightMode className='text-2xl' />
                            <span>Light Theme </span>
                        </div>
                        <Switch isToggle={!isDarkMode} onToggle={toggleDarkMode} />
                    </li> :
                    <li className='bg-desactive-red-500 flex justify-between items-center gap-3 py-3'>
                    <div className="flex items-center gap-3">
                       <MdDarkMode className='text-2xl' />
                        <span>Dark Theme </span>
                    </div>
                    <Switch isToggle={!isDarkMode} onToggle={toggleDarkMode} />
                </li>} 
                    <li className='bg-desactive-green-600 flex justify-between items-center gap-3 py-3'>
                        <Link to='/Currency' className='flex items-center gap-3'>
                            <PiCurrencyCircleDollarLight className='text-2xl' />
                            <span>Currency</span>
                        </Link>
                        <select
                            className='flex items-center gap-1 bg-transparent px-5'
                            value={currency}
                            onChange={handleCurrencyChange}
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
                    <Link to='/Help' className='bg-desactive-red-950 flex justify-between items-center gap-3 py-3'>
                        <li className='flex items-center gap-3'>
                            <IoIosHelpCircleOutline className='text-2xl' />
                            <span>Help</span>
                        </li>
                        <IoIosArrowForward className='text-2xl' />
                    </Link>
                    <Link to='/Privacity' className='bg-desactive-amber-600 flex justify-between items-center gap-3 py-3'>
                        <li  className='flex items-center gap-3 '>
                            <MdOutlinePrivacyTip className='text-2xl' />
                            <span>Privacy</span>
                        </li>
                        <IoIosArrowForward className='text-2xl' />
                    </Link>
                    <Link to='/Contact' className='bg-desactive-amber-600 flex justify-between items-center gap-3 py-3'>
                        <li  className='flex items-center gap-3'>
                            <IoChatbubbleOutline className='text-2xl' />
                            <span>Contact us</span>
                        </li>
                        <IoIosArrowForward className='text-2xl' />
                    </Link>
                </ul>

            </section>
            <section className='w-[86%] desktop:w-[60%] py-3 border-t bg-desactive-slate-600' >
                <h3 className='text-start font-medium text-lg desktop:text-2xl py-3'>Support</h3>

                <ul className='text-sm font-medium'>
                    <button onClick={handleLogout} className='bg-desactive-red-950 w-full flex justify-between items-center gap-3 py-3'>
                        <li className='flex items-center gap-3'>
                                <IoLogOut className='text-2xl' />
                                <span>LogOut</span>
                        </li>
                        <IoIosArrowForward className='text-2xl' />
                    </button>
                </ul>

            </section>
        </main>
    )
}

export default Configurations