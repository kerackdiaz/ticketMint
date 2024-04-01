import React from 'react'
import { IoSearchOutline, IoEyeOutline } from "react-icons/io5";
import { GiDonkey } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
// import Account from '../../components/Account';
import { useSelector } from 'react-redux';
import { BiSolidStore } from "react-icons/bi";
import { Link } from 'react-router-dom';


const Wallet = () => {

    const user = useSelector((state) => state.authReducer.user)

    const transactions = user.transactions

    const getTextColor = (type) => {
        return type === 'CREDIT' ? 'text-green-600' : ' text-red-600';
    };


    return (
        <main className='flex text-white flex-col items-center w-full m-auto min-h-screen bg-[#0B0B1C]' >

            <h1 className="text-lg font-medium py-1 pb-3 text-center">Wallet</h1>

            <section className='** bgslate-500 flex justify-evenly items-center w-full py-4'>
                <div className='flex flex-col ** bgred-900 py-3 '>
                    <div className='flex gap-5 items-center'>
                        <div>
                            <h2 className="** bgblue-500 text-base font-medium h2">Cantidad Total</h2>
                            <p className="** bgred-900 text-xs">21 cuentas / 33 cryptos</p>
                        </div>
                        <IoEyeOutline className='text-2xl' />
                    </div>
                    <h3 className="** bgamber-900 text-4xl font-medium">$0.00</h3>
                </div>
                <div className='bg-[#8468fb] w-[45%] py-2 flex flex-col justify-center items-center gap-1 rounded-xl'>
                    <GiDonkey className='w-8 ** bgorange-400 h-8' />
                    <p className="text-xs text-center">Do you have a MetaMask wallet?</p>
                    <Link to={'/Payment'} className="px-5 py-1 ** bgpurple-500 button border rounded-lg text-xs text-center"> Connect </Link>
                </div>
            </section>

            <div className='flex justify-between items-center w-[90%] px-3 py-1 border border-[#6651c3] rounded-lg'>
                <div className="flex gap-2 w-full">
                    <IoSearchOutline className='text-xl' />
                    <input type="text" className="w-full appearance-none border-none ** bg-transparent outline-none text-xs" placeholder=' Search currency' />
                </div>
                < IoMdCloseCircle className='text-lg text-[#e8635c]' />
            </div>
            <section className='flex flex-col ** bgred-500 gap-5 w-[90%] py-4'>
                <h1 className='text-3xl font-bold '>Transactions</h1>
                <div className='flex flex-col text-black gap-3 ** bgblue-500 flex-wrap w-full rounded-xl justify-around'>
                    {transactions?.length > 0 ? (
                        transactions.map((transaction) => (
                            <div className='flex justify-between items-center px-10 py-5 border rounded-lg  text-white bg-gray-900' >
                                <div className="flex gap-3 items-center">
                                    <div className="div p-2 bg-[#6651c3] rounded-full">
                                        <BiSolidStore className='text-3xl text-white' />
                                    </div>
                                    <div className="** bgred-500">
                                        <p className='font-medium'>{transaction.type}</p>
                                        <p className='text-[13px]'><span>{new Date(transaction.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span> - {transaction.description}</p>
                                    </div>
                                </div>
                                <div className="div">
                                    <p className='font-bold' >{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2})}</p>
                                </div>
                            </div>
                        ))

                    ) : (
                        <div className='flex flex-col justify-center items-center gap-5 w-64 min-h-64 text-center text-green-700  rounded-md bg-[#d1ecf1]'>
                            <p className='text-lg font-semibold'>Do not register Transactions</p>
                            {/* <img src={Sad} alt="sad" /> */}
                            <p>cucarachita</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}

export default Wallet