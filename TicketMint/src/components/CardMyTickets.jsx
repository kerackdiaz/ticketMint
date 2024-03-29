import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";

function CardMyTickets({name, date, image, id, location}) {
  return (
    <Link to={`/detailTicket/${id}`}>
      <div className={'bg-[url("'+ image +'")] bg-top bg-local rounded-2xl flex flex-col justify-end  w-[343px] h-64'}>
          <div className='h-28 bg-[#523276] opacity-90 w-full rounded-b-2xl flex justify-between px-2 py-1'>
                  <div className=' items-start opacity-90 '>
                      <h2 className=' text-white font-bold w-32'> Arch Enemy {name} </h2>
                      <p className='text-white text-sm items-center flex gap-1'><FaRegCalendarAlt/> Sunday, November 27{date}</p>
                      <p className='text-white text-sm items-center flex gap-1'><IoLocationOutline /> 19th Street Event Center {location}</p>
                      <p className='text-white text-sm items-center flex gap-1'><FaRegClock/> 9:00 PM - 10:00 PM{date}</p>
                  </div>
              </div>
      </div>
    </Link>
  )
}

export default CardMyTickets