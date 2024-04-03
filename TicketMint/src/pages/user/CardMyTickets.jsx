import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";

function CardMyTickets({ ticket }) {
  const {imageURL, name, date, city, time, venueName} = ticket.event;

  return (
    <Link to={`/detailTicket/${1}`}>
      <div className='hey bg-top bg-local rounded-2xl flex flex-col justify-end  w-[343px] h-64 border-purple-500 border-solid border shadow-neon'>
      <img className='object-cover relative w-full h-full translate-y-28 rounded-2xl' src={imageURL} alt="" />
          <div className='h-28 bg-[#523276] opacity-90 w-full rounded-b-2xl flex justify-between px-2 py-1'>
                  <div className=' items-start opacity-90 '>
                      <h2 className='text-white font-bold w-80'>{name}</h2>
                      <p  className='text-white text-sm items-center flex gap-1'><FaRegCalendarAlt/>{date}</p>
                      <p  className='text-white text-sm items-center flex gap-1'><IoLocationOutline />{`${city.name}, ${venueName}`}</p>
                      <p  className='text-white text-sm items-center flex gap-1'><FaRegClock/>{time}</p>
                  </div>
              </div>
      </div>
    </Link>
  )
}

export default CardMyTickets