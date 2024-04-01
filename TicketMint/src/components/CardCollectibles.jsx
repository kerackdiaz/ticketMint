import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaRegCalendarAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';

function CardCollectibles({name, date, image, price}) {

  return (
      <div className={'bg-[url(/prueba.png)] desktop:bg-no-repeat desktop:bg-cover desktop:w-[430px] rounded-2xl flex flex-col justify-end  w-[343px] h-60'}>
      {/* bg-[url("' + image + '")] reemplazar al tener img*/}
          <div className='h-24 bg-[#523276] opacity-90 w-full rounded-b-2xl flex flex-col justify-between px-6 py-1'>
                  <div className='flex flex-col items-start opacity-90'>
                      <h2 className=' text-white font-bold w-full line-clamp-1'> {name}</h2>
                      <p className='text-white text-sm items-center flex gap-2'><FaRegCalendarAlt/>{date}</p>
                  </div>
                  <div className='flex  justify-between items-end opacity-90'>
                    <p className='text-white'>Purchase price:</p>
                    <p className='text-white'>250.000 COP{/* price */}</p>
                  </div>
              </div>
      </div>
  )
}

export default CardCollectibles