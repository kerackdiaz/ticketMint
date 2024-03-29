import React from 'react'
import CardMyTickets from '../../components/CardMyTickets'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function MyTickets() {
  const user = useSelector((state) => state.authReducer.user)


  return (
    <div className='bg-[#0b0b1c] flex flex-1 gap-6 flex-col items-center'>
      <h2 className='text-lg font-medium py-1 text-white'>My Tickets</h2>
        <div className='flex  justify-center  bg-[#bbabff] w-3/4 rounded-lg md:w-1/2 '>
          <button className='bg text-white bg-[#8468fb] w-1/2 border md:py-1 border-[#bbabff] rounded-lg' type="button">Tickets</button>
          <Link to={'/collectibles'} className='w-1/2 text-center flex justify-center'>
          <button className='text-white' type="button">Collectibles</button>
          </Link>
        </div>
        <div className='flex flex-wrap gap-5 justify-center'>
          {
            user.tickets?.length > 0 ? user.tickets?.map((ticket, index) => {
              return <CardMyTickets key={index} name={ticket.name} date={ticket.date} image={ticket.image} id={ticket.id}/>}) : <h1 className='text-white'>No tickets</h1>
          }
        </div>
    </div>
  )
}

export default MyTickets