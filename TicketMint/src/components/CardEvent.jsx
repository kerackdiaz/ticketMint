import React from 'react'
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsTicketPerforated } from "react-icons/bs";

function CardEvent({ handleFav, onFav, name, date, image, id }) {


    return (
        <Link to={`/details/${id}`} >
            <div className={'relative w-80 h-64 bg-[url("' + image + '")] bg-top bg-local rounded-2xl flex flex-col justify-end items-end'}>
                <div className='absolute top-0 right-0 mt-2 mr-2 z-50'>
                    {
                        !onFav ? <CiStar className='text-4xl text-white cursor-pointer z-50' onClick={handleFav}/> : <TiStarFullOutline className='cursor-pointer text-4xl text-white' onClick={handleFav} />
                    }
                </div>
                <div className='h-28 bg-[#523276] opacity-90 w-full rounded-b-2xl flex justify-between px-2 py-1'>
                    <div className='flex flex-col items-start opacity-90 '>
                        <h2 className=' text-white font-bold line-clamp-1'>{name}</h2>
                        <p className='text-white text-sm items-center flex gap-1'><FaRegCalendarAlt />{date}</p>
                        <p className='text-white text-sm items-center flex gap-1'><BsTicketPerforated />Only 10 tickets left</p>
                    </div>
                    <div className='flex flex-col items-end opacity-90'>
                        <h3 className='font-semibold text-white'>Tickets from</h3>
                        <p className='text-sm text-white'>x</p>
                        <p className='text-sm text-white'>30.72 USDT</p>
                        <p className='text-sm text-white'>20.050 ARS</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardEvent