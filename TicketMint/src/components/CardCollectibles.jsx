import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegCalendarAlt } from "react-icons/fa";

function CardCollectibles() {
  return (
    <Link to={`/market/${1}`}>
      <div className='bg-[url(/prueba.png)] bg-top bg-local  rounded-2xl flex flex-col justify-end  w-[343px] h-60'>
          <div className='h-24 bg-[#523276] opacity-90 w-full rounded-b-2xl flex flex-col justify-between px-6 py-1'>
                  <div className='flex flex-col items-start opacity-90'>
                      <h2 className=' text-white font-bold w-32'> Arch Enemy</h2>
                      <p className='text-white text-sm items-center flex gap-2'><FaRegCalendarAlt/> Sunday, November 27</p>
                  </div>
                  <div className='flex  justify-between items-end opacity-90'>
                    <p className='text-white'>Purchase price:</p>
                    <p className='text-white'>250.000 COP</p>
                  </div>
              </div>
      </div>
    </Link>
  )
}

export default CardCollectibles