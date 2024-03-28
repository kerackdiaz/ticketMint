import React from 'react'
import { FaBitcoin } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Account = () => {
    return (
        <article className='bg-desactive-green-900 flex w-full justify-between items-center gap-2 px-3 py-1 rounded-lg'>
            <div className='flex justify-center items-center gap-2'>
                <FaBitcoin className='bg-orange-600 h-11 w-11 rounded-lg' />
                <div className='text-center'>
                    <h2 className='font-semibold'>BTC</h2>
                    <p className="text-xs text-red-500">-0.44%</p>
                </div>
            </div>
            <div className='text-xs text-center font-medium'>
                <h2 className="h2">0.00</h2>
                <p className="text-[#6d6d77]">= 0.00 COP</p>
            </div>
            <Link to='/Event'>
                <button className='bg-[#8468fb] px-9 py-[2.7px] rounded-lg '>Buy</button>
            </Link>
        </article>
    )
}

export default Account