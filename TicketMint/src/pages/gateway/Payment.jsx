import React, { useState } from 'react'
import { FaCcVisa, FaCcMastercard } from "react-icons/fa6";
import Paymetbanner from '../../../public/paymet-banner.png'
import { walletCharger } from '../../utils/Db'
import { useSelector } from 'react-redux';

const Payment = () => {
    const token = useSelector((state) => state.authReducer.token.token);

    const [cardNumber, setCardNumber] = useState('');

    const handleChange = (event) => {
        let { value } = event.target;
        value = value.replace(/\D/g, '');
        value = value.replace(/(.{4})/g, '$1 ').trim();
        value = value.slice(0, 19); 
        setCardNumber(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const response = walletCharger(amount, token)
        console.log(response.message)
    }


    return (

        <main className='bg-white flex flex-col-reverse lg:flex-row lg:gap-20 justify-center w-full min-h-screen m-auto'>
            <div className='min-w-1/2 self-center pb-10 md:pb-5 lg:pb-0 bg-blue-500'>
                <img src={Paymetbanner} className='w-full h-full' alt="" />
            </div>

            <div className='w-full lg:w-1/3 self-center py-1 bg-desactive-red-400'>
                <form onSubmit={handleSubmit} className='bg-gray-100 flex flex-col px-10 gap-3 pb-8 m-auto  rounded-xl'>
                    <h1 className=' text-3xl font-semibold border-b py-4'>Payment</h1>
                    <label className='bg--700 text-xl'>
                        <span className='font-semibold'>Pay With:</span>
                        <div>
                            <label>
                                <input type="radio" id="card" name="paymentMethod" value="card" className='w-[18px] h-[18px]' />
                                <span className='relative left-1 bottom-[2px]'>Card</span>
                            </label>
                            <label>
                                <input type="radio" id="bankTransfer" name="paymentMethod" value="bankTransfer" className='ml-3 w-[18px] h-[18px]' />
                                <span className='relative left-1 bottom-[2px]'>Bank Transfer</span>
                            </label>
                        </div>
                        <div className='flex ml-2 gap-2'>
                            <FaCcMastercard className='text-4xl' />
                            <FaCcVisa className='text-4xl' />
                        </div>
                    </label>
                    <label className='bg--700 text-xl'>
                        <span className='font-medium text-lg'>Card Number</span>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={handleChange}
                            name=''
                            className='w-full p-2 py-4 pl-3 rounded-md text-lg font-medium'
                            placeholder='Enter credit card number'
                            maxLength={19}
                            pattern="[\d ]{13,19}"
                        />
                    </label>

                    <div className='flex gap-5 w-full bg-desactive-red-900'>
                        <label className='w-full'>
                            <span className='font-medium text-lg'>Expiration Date</span>
                            <div className='w-full py-1'>
                                <input
                                    type="number"
                                    className=" rounded-md w-full py-1 pl-3"
                                    placeholder='MM/YY'
                                />
                            </div>
                        </label>

                        <label className='w-full'>
                            <span className='font-medium text-lg'>CVV</span>
                            <div className='w-full py-1'>
                                <input type="number" placeholder="123" min="0" max="999" className="w-full py-1 rounded-md" />
                            </div>
                        </label>
                    </div>

                    <label className='bg--700 text-xl'>
                        <span className='font-medium text-lg'>Amount</span>
                        <div>
                            <input type="number" name='' className='w-full p-1 pl-3 rounded-md' placeholder='' />
                        </div>
                    </label>
                    <label className='flex items-center gap-1 bg--700 text-xl'>
                        <input type="checkbox" name='' className='w-[18px] h-[18px] rounded-md' placeholder='' />
                        <span className='text-[#5c5b5b] text-lg relative bottom-[1px]'>save card details:</span>
                    </label>
                    {/* <p className='bg--700 text-red-500'>errorMessage</p> */}
                    <input type="submit" value="Pay" className='w-full py-3 pl-3 text-white text-xl cursor-pointer rounded-md bg-[#23b057] hover:bg-green-500 duration-300' />
                </form>
            </div>
        </main>

    )
}

export default Payment