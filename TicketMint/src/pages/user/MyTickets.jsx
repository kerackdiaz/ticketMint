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
  const totalPages = Math.ceil(eventsWithTicketCounts?.length / itemsPerPage);

  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };  
  
  const getEvents = () => {
    if(!eventsWithTicketCounts || eventsWithTicketCounts.length === 0 || eventsWithTicketCounts === undefined || eventsWithTicketCounts === null){
      return (
        <div role="status">
          {/* <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg> */}
          <span className="f text-4xl dark:text-white text-black">You don't have a tickets</span>
        </div>
        )}

  
        let filterEvent = eventsWithTicketCounts;
        const totalPages = Math.ceil(filterEvent.length / itemsPerPage);
        const eventsToShow = filterEvent.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    console.log(eventsToShow)
    return eventsToShow.length > 0 ? 
    eventsToShow
    
      .filter(event => new Date(event.date) > new Date())
      .map((event, index) => (
        <Link to={`/detailTicket/${event.id}`} key={index}>
          <CardMyTickets name={event.name} date={event.date} time={event.time} image={event.imageURL} id={event.id} ticketCount={event.ticketCount}/>
        </Link>
      )) 
  : <h1 className='dark:text-white text-[0b0b1c]'>No events</h1> 
    }


    return (
      <main className=' flex flex-1 gap-6 flex-col desktop:mt-20 items-center mb-20'>
          <h2 className='text-lg dark:text-white text-[#0b0b1c]  font-medium py-1 desktop:text-start desktop:w-[70%] desktop:text-5xl'>My Tickets</h2>
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