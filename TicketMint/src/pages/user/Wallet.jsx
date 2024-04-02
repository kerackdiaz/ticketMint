import React, { useState } from 'react';
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
    const balance = user.balance
    const currency = localStorage.getItem('conversion_rates')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(transactions?.length / itemsPerPage);

    const changePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const transactionsToShow = transactions?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const getTextColor = (type) => {
        return type === 'CREDIT' ? 'text-green-600' : ' text-red-600';
    };


    return (
        <main className='flex text-white flex-col items-center w-full m-auto min-h-screen ' >

            <h1 className="text-lg dark:text-white text-[#0B0B1C] font-medium py-1 pb-3 text-center">Wallet</h1>

            <section className='** bgslate-500 flex justify-evenly items-center w-full py-4'>
                <div className='flex flex-col ** bgred-900 py-3 '>
                    <div className='flex gap-5 items-center'>
                        <div>
                            <h2 className="dark:text-white text-[#0B0B1C] bgblue-500 text-base font-medium h2">Cantidad Total</h2>
                            <p className="** bgred-900 text-xs text-center dark:text-white text-[#0B0B1C]">{transactions.length} / transactions</p>
                        </div>
                        <IoEyeOutline className='text-2xl dark:text-white text-[#0B0B1C]' />
                    </div>
                    <h3 className="dark:text-white text-[#0B0B1C] bgamber-900 text-4xl font-medium">{(balance * currency).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
                </div>
                <div className='dark:bg-[#8468fb] bg-[#0B0B1C] w-[45%] py-2 flex flex-col justify-center items-center gap-1 rounded-xl'>
                    <GiDonkey className='w-8  bgorange-400 h-8' />
                    <p className="text-xs  text-center">Want to recharge your wallet?</p>
                    <Link to={'/Payment'} className="px-5 py-1 ** bgpurple-500 button border rounded-lg text-xs text-center"> Connect </Link>
                </div>
            </section>

            <div className='flex justify-between items-center w-[90%] px-3 py-1 border border-[#6651c3] rounded-lg'>
                <div className="flex gap-2 w-full">
                    <IoSearchOutline className='text-xl dark:text-white text-[#0B0B1C]' />
                    <input type="text" className="w-full appearance-none border-none bg-transparent outline-none text-xs placeholder:text-[#0B0B1C] dark:placeholder:text-gray-500" placeholder=' Search currency' />
                </div>
                < IoMdCloseCircle className='text-lg text-[#e8635c]' />
            </div>
            <section className='flex flex-col ** bgred-500 gap-5 w-[90%] py-4'>
                <h1 className='text-3xl font-bold dark:text-white text-[#0B0B1C] '>Transactions</h1>
                <div className='flex flex-col text-black gap-3 ** bgblue-500 flex-wrap w-full rounded-xl justify-around'>
                {transactionsToShow?.length > 0 ? (
                    transactionsToShow.map((transaction) => (
                        <div className='flex justify-between items-center px-10 py-5 border rounded-lg text-white bg-gray-900'>
                            <div className="flex gap-3 items-center">
                                <div className="div p-2 bg-[#6651c3] rounded-full">
                                    <BiSolidStore className='text-3xl text-white' />
                                </div>
                                <div className="">
                                    <p className='font-medium'>{transaction.type}</p>
                                    <p className='text-[13px] font-'><span>{new Date(transaction.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span > - {transaction.description}</p>
                                </div>
                            </div>
                            <div className="div">
                                <p className='font-bold'>{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='flex flex-col justify-center items-center gap-5 w-64 min-h-64 text-center text-green-700 rounded-md bg-[#d1ecf1]'>
                        <p className='text-lg font-semibold'>Do not register Transactions</p>
                        <p>cucarachita</p>
                    </div>
                )}
            </div>
            <div className='w-full flex justify-center gap-3'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button className='text-white px-3 py-2 bg-[#0B0B1C] dark:bg-[#6651c3] hover:scale-95 hover:bg-[#6651c3] dark:hover:bg-[#6651c3]' onClick={() => changePage(index + 1)}>{index + 1}</button>
                ))}
                </div>
            </section>
        </main>
    )
}

export default Wallet