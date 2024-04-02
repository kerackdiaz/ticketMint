import React from 'react'
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";

function CardMyTickets({name, date, image, id, location, ticketCount, time}) {
  return (
    <article>
      <div key={id} className={'bg-[url("' + image + '")] shadow-lg shadow-[#0b0b1c] dark:shadow-none desktop:bg-no-repeat desktop:bg-cover desktop:w-[430px] rounded-2xl flex flex-col justify-end  w-[343px] h-64'}>
      {ticketCount == undefined ? <div></div>:<div className='relative z-20 bg-red-800 bottom-1/2 left-[95%] w-8 h-8 text-xl flex justify-center items-center text-white rounded-full font-bold border-white border'>{ticketCount}</div>}
          <div className='h-28 bg-[#523276] opacity-90 w-full rounded-b-2xl flex justify-between px-2 py-1'>
                  <div className=' items-start opacity-90 '>
                      <h2 className=' text-white font-bold w-full line-clamp-1'> {name} </h2>
                      <p className='text-white text-sm items-center flex gap-1'><FaRegCalendarAlt/> {date}</p>
                      <p className='text-white text-sm items-center flex gap-1'><IoLocationOutline /> 19th Street Event Center {location}</p>
                      <p className='text-white text-sm items-center flex gap-1'><FaRegClock/> {time}</p>
                  </div>
              </div>
      </div>
    </article>
  )
}

export default CardMyTickets