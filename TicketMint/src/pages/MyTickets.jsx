import React from 'react'
import CardMyTickets from '../components/CardMyTickets'
import { Link } from 'react-router-dom'

function MyTickets() {
  return (
    <div className='bg-[#0b0b1c] flex flex-1 gap-6 flex-col items-center'>
      <h2 className='text-3xl text-white pt-3'>My Tickets</h2>
        <div className='flex  justify-center  bg-[#bbabff] w-3/4 rounded-lg md:w-1/2 '>
          <button className='bg text-white bg-[#8468fb] w-1/2 border md:py-1 border-[#bbabff] rounded-lg' type="button">Tickets</button>
          <Link to={'/collectibles'} className='w-1/2 text-center flex justify-center'>
          <button className='text-white' type="button">Collectibles</button>
          </Link>
        </div>
        <div className='flex flex-wrap gap-5 justify-center'>
        <CardMyTickets/>
        <CardMyTickets/>
        <CardMyTickets/>
        <CardMyTickets/>
        </div>
    </div>
  )
}

export default MyTickets