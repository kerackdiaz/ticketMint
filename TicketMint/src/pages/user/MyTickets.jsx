import React, { useState } from 'react';
import CardMyTickets from '../../components/CardMyTickets'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function MyTickets() {
  const UserData = useSelector((state) => state.authReducer.user)
  const MyTickets= Object.values(UserData.clientTicket)
  const eventsData = useSelector((state) => state.authReducer.events)
  const events = Object.values(eventsData).filter(event => 
    MyTickets.some(ticket => ticket.eventId === event.id)
  );
  const ticketCounts = MyTickets.reduce((counts, ticket) => {
    counts[ticket.eventId] = (counts[ticket.eventId] || 0) + ticket.quantity;
    return counts;
  }, {});

  const eventsWithTicketCounts = events.map(event => ({
    ...event,
    ticketCount: ticketCounts[event.id]
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  let totalPages = 0;

  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };  
  
  const getEvents = () => {
    if(!eventsWithTicketCounts || eventsWithTicketCounts.length === 0 || eventsWithTicketCounts === undefined || eventsWithTicketCounts === null){
      return (
        <div role="status">
          <span className="f text-4xl dark:text-white text-black">You don't have a tickets</span>
        </div>
        )}
  
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
  
    let filterEvent = eventsWithTicketCounts.filter(event => {
      let eventDate = new Date(event.date);
      eventDate.setUTCHours(0, 0, 0, 0);
      return eventDate.getTime() >= today.getTime();
    });
    totalPages = Math.ceil(filterEvent.length / itemsPerPage);
    const eventsToShow = filterEvent.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    console.log(eventsToShow)
    return eventsToShow.length > 0 ? 
    eventsToShow
      .map((event, index) => (
        <Link to={`/detailTicket/${event.id}`} key={index}>
          <CardMyTickets name={event.name} date={event.date} time={event.time} image={event.imageURL} id={event.id} ticketCount={event.ticketCount}/>
        </Link>
      )) 
  : <h1 className='dark:text-white text-[0b0b1c]'>No events</h1> 
    }

    return (
      <main className=' flex flex-1 gap-6 flex-col desktop:mt-20 items-center mb-20 min-h-screen'>
          <h2 className='text-lg dark:text-white text-[#0b0b1c]  font-bold py-1 desktop:text-start desktop:w-[70%] desktop:text-5xl movil:mt-5 movil:text-2xl laptop:mt-0'>My Tickets</h2>
          <div className='flex  justify-center  bg-[#bbabff] w-3/4 rounded-lg md:w-1/2 '>
              <button className='bg text-white bg-[#8468fb] w-1/2 border md:py-1 border-[#bbabff] rounded-lg' type="button">Tickets</button>
              <Link to={'/collectibles'} className='w-1/2 text-center flex justify-center'>
                  <button className='text-white' type="button">Collectibles</button>
              </Link>
          </div>
          <div className='flex flex-wrap gap-5 mt-5 justify-center'>
              {getEvents()}
          </div>
          <div>
              {Array.from({ length: totalPages }, (_, index) => (
                  totalPages <= 1 ? "" :  <button key={index} className='text-white px-3 py-2 bg-[#0B0B1C] dark:bg-[#6651c3] hover:scale-95 hover:bg-[#6651c3] dark:hover:bg-[#6651c3]' onClick={() => changePage(index + 1)}>{index + 1}</button>
              ))}
          </div>
      </main>
  );
}

export default MyTickets;