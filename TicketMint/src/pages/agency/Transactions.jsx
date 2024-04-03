import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { BiSolidStore } from "react-icons/bi";


const Transactions = () => {

    const user = useSelector((state) => state.authReducer.user)

    const transactions = user.transactions

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
        <div className=" laptop:translate-x-[10vw] laptop:translate-y-[15vh] laptop:w-4/5 movil:w-full max-h-[80vh]  movil:translate-x-[-8vw] movil:translate-y-[18vh] rounded-lg flex justify-center">
            <section className='flex flex-col bgred-500 gap-5 w-[90%] py-4 h-full overflow-y-scroll'>
                <h1 className='text-3xl font-bold dark:text-white text-[#0B0B1C] '>Transactions</h1>
                <div className='flex flex-col text-black gap-3 ** bgblue-500 flex-wrap w-full rounded-xl justify-around'>
                    {transactionsToShow?.length > 0 ? (
                        transactionsToShow.map((transaction) => (
                            <div key={transaction.id} className='flex justify-between items-center px-10 py-5 border rounded-lg text-white bg-gray-900'>
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
                        </div>
                    )}
                </div>
                <div className='w-full flex justify-center gap-3'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        totalPages <= 1 ? <></> : <button key={index} className='text-white px-3 py-2 bg-[#0B0B1C] dark:bg-[#6651c3] hover:scale-95 hover:bg-[#6651c3] dark:hover:bg-[#6651c3]' onClick={() => changePage(index + 1)}>{index + 1}</button>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Transactions
