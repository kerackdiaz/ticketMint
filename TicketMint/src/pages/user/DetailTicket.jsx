import React from 'react'
import CardMyTickets from '../../components/CardMyTickets'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


function DetailTicket() {
  const tickets = useSelector((state) => state.authReducer.events)
  const {id} = useParams()

  const ticket = Object.values(tickets)?.find((ticket) => ticket.id === id)
  console.log(ticket);

  return (
    <div className='bg-[#0b0b1c] p-4 flex flex-1 gap-5 flex-col desktop:mt-20 items-center'>
        <h2 className='text-3xl desktop:text-5xl text-white'>{/* Arch Enemy */}{ticket.name}</h2>
        <CardMyTickets/>
        <div className='flex justify-between desktop:w-[420px] items-center w-full md:w-1/2 xl:w-1/3'>
            <p className='text-sm text-white opacity-70'>Current price</p>
            <p className='text-xl text-white opacity-70'>150.000 COP{/* ticket.price */}</p>
        </div>
        <div className='flex justify-center opacity-70'>
            <p className='text-sm md:w-1/2 xl:w-1/3 desktop:w-[420px] text-white'>{/* Arch Enemy is a Swedish melodic death metal band formed in Halmstad in 1995. In its beginnings it explored the original death metal, but suffered a musical transformation after the change of members they had, and began to make a more melodic death metal, which they continue to do today. */}{ticket.description}</p>
        </div>
        <Link to={`/scan/${id}`} className='w-full flex justify-center md:w-1/2 xl:w-1/3 desktop:mt-40'>
        <button type="button" className='text-white bg-[#8468fb] py-2 w-2/3 rounded-xl'>Scan</button>
        </Link>
    </div>
  )
}

export default DetailTicket