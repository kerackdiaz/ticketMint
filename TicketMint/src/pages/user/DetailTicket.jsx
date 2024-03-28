import React from 'react'
import CardMyTickets from '../../components/CardMyTickets'
import { Link } from 'react-router-dom'


function DetailTicket() {
  
  return (
    <div className='bg-[#0b0b1c] p-4 flex flex-1 gap-5 flex-col items-center'>
        <h2 className='text-3xl text-white'>Arch Enemy</h2>
        <CardMyTickets/>
        <div className='flex justify-between items-center w-full md:w-1/2 xl:w-1/3'>
            <p className='text-sm text-white opacity-70'>Current price</p>
            <p className='text-xl text-white opacity-70'>150.000 COP</p>
        </div>
        <div className='flex justify-center opacity-70'>
            <p className='text-sm md:w-1/2 xl:w-1/3 text-white'>Arch Enemy is a Swedish melodic death metal band formed in Halmstad in 1995. In its beginnings it explored the original death metal, but suffered a musical transformation after the change of members they had, and began to make a more melodic death metal, which they continue to do today.</p>
        </div>
        <Link to={`/scan/${1}`} className='w-full flex justify-center md:w-1/2 xl:w-1/3'>
        <button type="button" className='text-white bg-[#8468fb] py-2 w-2/3 rounded-xl'>Scan</button>
        </Link>
    </div>
  )
}

export default DetailTicket