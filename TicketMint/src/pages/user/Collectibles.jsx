import React from 'react'
import { Link } from 'react-router-dom'
import CardMyTickets from '../../components/CardMyTickets'
import CardCollectibles from '../../components/CardCollectibles'
import { useSelector } from 'react-redux'


function Collectibles() {
  const eventsUser = useSelector((state) => state.authReducer.user.events)
  

  return (
    <div className='bg-[#0b0b1c] flex flex-1 gap-6 flex-col items-center'>
    <h2 className='text-3xl text-white pt-3'>My Collectibles</h2>
      <div className='flex  justify-center  bg-[#bbabff] w-3/4 rounded-lg md:w-1/2'>
        <Link to={'/myTickets'} className='w-1/2 text-center flex justify-center'>
        <button className='bg text-white' type="button">Tickets</button>
        </Link>
        <button className='text-white border  bg-[#8468fb] w-1/2 md:py-1 border-[#bbabff] rounded-lg' type="button">Collectibles</button>
      </div>
      <div className='flex flex-wrap gap-5 justify-center'>
        {
          eventsUser?.length > 0 ? eventsUser?.map((event, index) => {
            return <CardCollectibles key={index} name={event.name} date={event.date} image={event.imageURL} id={event.id}/>}) : <h1 className='text-white'>No collectibles</h1>
        }
      </div>
  </div>
  )
}

export default Collectibles