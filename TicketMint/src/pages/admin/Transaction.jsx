import React from 'react'
import { useSelector } from 'react-redux';
import { BiSolidStore } from "react-icons/bi";


const Transactions = () => {

    const user = useSelector((state) => state.authReducer.user)

    const transactions = user.transactions

    console.log(transactions);


  return (
    <div className="laptop:w-[77%] relative laptop:left-[14%] tablet:left-[25%] tablet:w-1/2 w-[80%] h-[80%] md:w-[490px] top-32 right-8 py-6 px-6 rounded-xl border border-gray-200 bg-[#DBC1FA] mt-10 flex flex-wrap gap-10 dark:bg-[#0B0B1C]">

    <section className='flex flex-col ** bgred-500 gap-5 w-[90%] py-4'>
                <h1 className='text-3xl font-bold '>Transactions</h1>
                <div className='flex flex-col text-black gap-3 ** bgblue-500 flex-wrap w-full rounded-xl justify-around'>
                    {transactions?.length > 0 ? (
                        transactions.map((transaction) => (
                            <div className='flex justify-between items-center px-10 py-5 border rounded-lg  text-black bg-gray-900 bg-white dark:text-white dark:bg-[#0B0B1C] laptop:w-[750px] tablet:w-[450px] desktop:w-[1050px]' >
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
            </div>
  )
}

export default Transactions
