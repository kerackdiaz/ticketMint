import React, { useState } from 'react'
import { BsQrCodeScan } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GiDonkey } from "react-icons/gi";

function SellTicket() {
    const eventsUser = useSelector((state) => state.authReducer.events)
    const [isAGift, setIsAGift] = useState(false)
    const { id } = useParams()
    /* const event = eventsUser?.find((event) => event.id === id) */

    const hanleSubmit = (e) => {
        e.preventDefault()
    }
    const hanleInput = (e) => {
        if (e.target.value === "0") {
            setIsAGift(true)
            return
        }
        setIsAGift(false)
        console.log(e.target.value);
    }

    return (
        <div className='bg-[#0b0b1c] desktop:mt-20 flex flex-1 p-3 gap-6 flex-col items-center'>
            <h2 className='text-3xl text-white pt-3 desktop:text-5xl'>Sell Ticket</h2>
            <img src={"/prueba.png"} alt="" />
            <form onSubmit={hanleSubmit} className='flex flex-col desktop:w-[420px] gap-2 w-full items-center md:w-1/2 xl:w-1/3'>
                <label className='desktop:w-full'>
                    <input required min={0} onChange={hanleInput} className='w-[90%] text-center text-white  desktop:w-full bg-[#0b0b1c] border border-[#8468fb] placeholder:text-sm placeholder:text-center rounded-lg' type="number" placeholder='How much will NFT sell for?'/>
                </label>
                <label className='desktop:w-full'>
                    <input required className='w-[90%] text-center desktop:w-full bg-[#0b0b1c] text-white border border-[#8468fb] placeholder:text-sm placeholder:text-center rounded-lg' type="email" placeholder='To which mail will you transfer?'/>
                </label>
                <div className='flex flex-col items-center'>
                    <BsQrCodeScan className='text-3xl text-white'/>
                    {/* <img className='w-8' src="/Union.svg" alt="" /> */}
                    <p className='text-white opacity-90 w-[80%] text-center'>Scan the QR with the cell phone you will transfer this NFT to</p>
                </div>
                <div className='w-[232px] h-[232px] bg-white flex justify-center items-center rounded-xl'>
                    <GiDonkey className='text-6xl text-black'/>
                    {/* <p className='font-bold text-4xl'>aqui va el qr</p> */}
                </div>
                <div>
                    <p className='text-white opacity-60 w-[185px] md:w-full text-center'>The code will be updated in 10 seconds</p>
                </div>
                {
                    isAGift ? <button className='bg-[#8468fb] py-1 w-[30%] md:w-[150px] rounded-lg text-white' type="submit">Give away</button> 
                    : <button className='bg-[#8468fb] w-[30%] py-1 md:w-[150px] rounded-lg text-white' type="submit">Accept</button>
                }
            
            </form>
        </div>
    )
}

export default SellTicket