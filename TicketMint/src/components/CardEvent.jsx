import React, { useState } from 'react'
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';

function CardEvent() {
    const [onFav, setOnFav] = useState(false)

    const handleFav = () => {
        setOnFav(!onFav)
    }

  return (
    <Link to={`/details/${1}`}>
        <div className='w-80 h-64 bg-[url(/prueba.png)] bg-top bg-local border-2 border-[#8468fb] rounded-2xl flex flex-col justify-between items-end'>
            {
                !onFav ? <CiStar className='text-4xl text-white mt-2 mr-2 cursor-pointer' onClick={handleFav}/> : <TiStarFullOutline className='cursor-pointer text-4xl text-white mt-2 mr-2' onClick={handleFav}/>
            }
            <div className='h-28 bg-[#523276] opacity-90 w-full rounded-b-2xl flex justify-between px-2 py-1'>
                <div className='flex flex-col items-start opacity-90 '>
                    <h2 className=' text-white font-bold '>Arch Enemy</h2>
                    <p className='text-white text-sm'>Domingo, Noviembre 27</p>
                    <p className='text-white text-sm'>Solo quedan 10 tickets</p>
                </div>
                <div className='flex flex-col items-end opacity-90'>
                    <h3 className='font-semibold text-white'>Tickets desde</h3>
                    <p className='text-sm text-white'>140.000 COP</p>
                    <p className='text-sm text-white'>30.72 USDT</p>
                    <p className='text-sm text-white'>1.80 SOL</p>
                    <p className='text-sm text-white'>0.0016 ETH</p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default CardEvent