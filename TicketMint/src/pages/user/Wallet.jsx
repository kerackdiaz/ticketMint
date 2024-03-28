import React from 'react'
import { IoSearchOutline, IoEyeOutline } from "react-icons/io5";
import { GiDonkey } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import Account from '../../components/Account';


const Wallet = () => {
    return (
        <main className='flex text-white flex-col items-center w-full m-auto min-h-screen bg-[#0B0B1C]' >

            <h1 className="text-lg font-medium py-1 pb-3 text-center">Wallet</h1>

            <section className='bg-desactive-slate-500 flex justify-evenly items-center w-full py-4'>
                <div className='flex flex-col bg-desactive-red-900 py-3 '>
                    <div className='flex gap-5 items-center'>
                        <div>
                            <h2 className="bg-desactive-blue-500 text-base font-medium h2">Cantidad Total</h2>
                            <p className="bg-desactive-red-900 text-xs">21 cuentas / 33 cryptos</p>
                        </div>
                        <IoEyeOutline className='text-2xl' />
                    </div>
                    <h3 className="bg-desactive-amber-900 text-4xl font-medium">$0.00</h3>
                </div>
                <div className='bg-[#8468fb] w-[45%] py-2 flex flex-col justify-center items-center gap-1 rounded-xl'>
                    <GiDonkey className='w-8 bg-desactive-orange-400 h-8' />
                    <p className="text-xs text-center">Do you have a MetaMask wallet?</p>
                    <button className="px-5 py-1 bg-desactive-purple-500 button border rounded-lg text-xs text-center"> Connect </button>
                </div>
            </section>

            <div className='flex justify-between items-center w-[90%] px-3 py-1 border border-[#6651c3] rounded-lg'>
                <div className="flex gap-2">
                    <IoSearchOutline className='text-xl'/>
                    <input type="text" className="appearance-none border-none bg-transparent outline-none text-xs" placeholder=' Search currency' />
                </div>
                < IoMdCloseCircle className='text-lg text-[#e8635c]'/>
            </div>
            <section className='flex flex-col gap-5 w-[90%] py-4'>
                <Account />
                <Account />
                <Account />
                <Account />
                <Account />
                <Account />
                
            </section>
        </main>
    )
}

export default Wallet