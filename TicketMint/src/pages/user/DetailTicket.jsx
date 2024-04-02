import React from 'react'
import CardMyTickets from '../../components/CardMyTickets'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


function DetailTicket() {
  const events = useSelector((state) => state.authReducer.events)
  const {id} = useParams()
  const MyTickets = useSelector((state) => state.authReducer.user.clientTicket)

  console.log(id)
  const eventTicket = Object.values(events)?.find((event) => event.id === id)
  const ticket = Object.values(MyTickets).find((ticket) => ticket.eventId === id)
  console.log(ticket)
  return (
    <div className='bg-[#0b0b1c] p-4 flex flex-1 gap-5 flex-col desktop:mt-20 items-center'>
        <h2 className='text-3xl desktop:text-5xl text-white'>{/* Arch Enemy */}{eventTicket.name}</h2>
        <CardMyTickets key={eventTicket.id} name={eventTicket.name} date={eventTicket.date} image={eventTicket.imageURL} id={eventTicket.id} time={eventTicket.time} ticketCount={eventTicket.ticketCount}/>
        <div className='flex justify-between desktop:w-[420px] items-center w-full md:w-1/2 xl:w-1/3'>
            <p className='text-sm text-white opacity-70'>Current price</p>
            <p className='text-xl text-white opacity-70'>150.000 COP{/* ticket.price */}</p>
        </div>
        <div className='flex justify-center opacity-70'>
            <p className='text-sm md:w-1/2 xl:w-1/3 desktop:w-[420px] text-white'>{/* Arch Enemy is a Swedish melodic death metal band formed in Halmstad in 1995. In its beginnings it explored the original death metal, but suffered a musical transformation after the change of members they had, and began to make a more melodic death metal, which they continue to do today. */}{ticket.description}</p>
        </div>
        <div className='flex justify-center desktop:mt-10 desktop:w-[420px] md:w-1/2 xl:w-1/3 '>
        <Link to={`/sell/${id}`} className='w-1/2 flex justify-start'><button type="button" className='text-white bg-[#8468fb] py-2 w-[90%] rounded-xl'>Sell</button></Link>
        <Link to={`/scan/${ticket.id}`} className='w-1/2 flex justify-end'>
        <button type="button" className='text-white bg-[#8468fb] py-2 w-[90%] rounded-xl'>Scan</button>
        </Link>
        </div>
    </div>
  )
}

export default DetailTicket