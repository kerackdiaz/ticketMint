import React  from 'react'
import { Link } from 'react-router-dom'
import CardCollectibles from '../../components/CardCollectibles'
import { useSelector } from 'react-redux'


function Collectibles() {
  const UserData = useSelector((state) => state.authReducer.user)
  const MyTickets= Object.values(UserData.clientTicket)
  const eventsData = useSelector((state) => state.authReducer.events)
  const nowDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
  const nowTime = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

  const events = Object.values(eventsData).filter(event => 
    MyTickets.some(ticket => ticket.eventId === event.id)
  );
  const filteredEvents = events.filter(event => new Date(event.date + "T00:00:00Z") < new Date())

  const ticketCounts = MyTickets.reduce((counts, ticket) => {
    counts[ticket.eventId] = (counts[ticket.eventId] || 0) + ticket.quantity;
    return counts;
  }, {});

  const eventsWithTicketCounts = filteredEvents.map(event => ({
    ...event,
    ticketCount: ticketCounts[event.id]
  }));


  

  
  const getEvents = () => {
    if(!eventsWithTicketCounts || events.length === 0 || events === undefined || events === null){
      return (
        <h2>No collectibles</h2>
        )}
      let filterEvent = eventsWithTicketCounts 
      return filterEvent.length > 0 ? filterEvent.map((event, index) => {
        return <CardCollectibles key={index} type={event.ticketTypes} name={event.name} date={event.date} image={event.imageURL} id={event.id } ticketCount={event.ticketCount}/>}) : <h1 className='text-white'>No collectibles</h1>
  }
  return (
    <div className=' flex flex-1 gap-6 desktop:mt-20 mb-20 flex-col items-center'>
    <h2 className='text-lg font-bold py-1 dark:text-white text-[#0b0b1c] desktop:text-5xl desktop:text-center desktop:w-[70%]'>My Collectibles</h2>
      <div className='flex  justify-center  bg-[#bbabff] w-3/4 rounded-lg md:w-1/2'>
        <Link to={'/myTickets'} className='w-1/2 text-center flex justify-center'>
        <button className=' text-white' type="button">Tickets</button>
        </Link>
        <button className='text-white  border  bg-[#8468fb] w-1/2 md:py-1 border-[#bbabff] rounded-lg' type="button">Collectibles</button>
      </div>
      <div className='flex flex-wrap gap-5 justify-center'>
        {getEvents()}
      </div>
  </div>
  )
}

export default Collectibles