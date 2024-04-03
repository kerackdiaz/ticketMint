import React from 'react'
import CardMyTickets from '../../components/CardMyTickets'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


function DetailTicket() {
  const events = useSelector((state) => state.authReducer.events)
  const {id} = useParams()
  const MyTickets = useSelector((state) => state.authReducer.user.clientTicket)
  const eventTicket = Object.values(events)?.find((event) => event.id === id)
  const ticket = Object.values(MyTickets).find((ticket) => ticket.eventId === id)
  const description = Object.values(events).find((event) => event.id === id)
  console.log(eventTicket)
  const currency = localStorage.getItem('currency')
  const total = currency === 'COP' ? Math.round(ticket.price * localStorage.getItem("conversion_rates")) : ticket.price * localStorage.getItem("conversion_rates");

  const formattedTotal = new Intl.NumberFormat('en-US', 
  { 
      style: 'currency', 
      currency: currency, 
      currencyDisplay: 'code',
      minimumFractionDigits: ['USD', 'ARS'].includes(currency) ? 2 : 0 
  }).format(total);


  return (
    <div className=' p-4 flex flex-1 gap-5 flex-col desktop:mt-20 items-center'>
        <h2 className='text-3xl desktop:text-5xl dark:text-white text-[#0b0b1c] mb-5'>{/* Arch Enemy */}{eventTicket.name}</h2>
        <CardMyTickets key={eventTicket.id} name={eventTicket.name} date={eventTicket.date} time={eventTicket.time} image={eventTicket.imageURL} id={eventTicket.id} ticketCount={eventTicket.ticketCount}/>
        <div className='flex justify-between desktop:w-[420px] items-center w-full md:w-1/2 xl:w-1/3'>
            <p className='text-sm dark:text-white text-[#0b0b1c] opacity-70'>Current price</p>
            <p className='text-xl dark:text-white text-[#0b0b1c] opacity-70'>{formattedTotal}</p>
        </div>
        <div className='flex justify-center opacity-70'>
            <p className='text-sm md:w-1/2 xl:w-1/3 desktop:w-[420px] dark:text-white text-[#0b0b1c]'>{description.description}</p>
        </div>
        <div className='flex justify-center desktop:mt-10 desktop:w-[420px] md:w-1/2 xl:w-1/3 w-full'>
        <Link to={`/sell/${ticket.id}`} className='w-1/2 flex justify-start'>
          <button type="button" className='text-white bg-[#8468fb] py-2 w-[90%] rounded-xl'>Sell</button>
        </Link>
        <Link to={`/scan/${ticket.id}`} className='w-1/2 flex justify-end'>
          <button type="button" className='text-white bg-[#8468fb] py-2 w-[90%] rounded-xl'>Scan</button>
        </Link>
        </div>
    </div>
  )
}

export default DetailTicket