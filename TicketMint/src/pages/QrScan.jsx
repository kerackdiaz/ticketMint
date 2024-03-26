import React from 'react'
import CardMyTickets from '../components/CardMyTickets'
import { BsQrCodeScan } from "react-icons/bs";

function QrScan() {
  return (
    <div className='bg-[#0b0b1c] flex flex-1 p-3 gap-6 flex-col items-center'>
        <h2 className='text-3xl text-white'>Qr Scan</h2>
        <CardMyTickets/>
        <div className='flex flex-col items-center'>
            <BsQrCodeScan className='text-3xl text-white'/>
            <p className='text-white opacity-90'>Present QR on scanner</p>
        </div>
        <div className='w-[232px] h-[232px] bg-white flex justify-center items-center rounded-xl'>
            <p className='font-bold text-4xl'>aqui va el qr</p>
        </div>
        <div>
            <p className='text-white opacity-60 w-[185px] text-center'>The code will be updated in 10 seconds</p>
        </div>
    </div>
  )
}

export default QrScan