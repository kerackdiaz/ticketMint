import React from 'react'
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsTicketPerforated } from "react-icons/bs";

function CardEvent({ handleFav, onFav, name, date, image, id, quantity, time, price, location, idProx }) {
    const currency = localStorage.getItem('currency') || 'USD';
    const total = currency === 'COP' ? Math.round(price * localStorage.getItem("conversion_rates")) : price * localStorage.getItem("conversion_rates");
    const imgformatted = image+".jpg";
    const formattedTotal = new Intl.NumberFormat('en-US',
        {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'code',
            minimumFractionDigits: ['USD', 'ARS'].includes(currency) ? 2 : 0
        }).format(total);

    const soldOut = quantity === 0 ? "Soldout opacity-50" : "";

    const handleFavoriteClick = (event) => {
        event.preventDefault();
        handleFav(id);

    };
    const FavIcon = onFav ? TiStarFullOutline : CiStar;
    if (onFav) {
        console.log(Object.keys(onFav))
        
    }

    return (
        <Link to={`/details/${id}`} className={soldOut} >
            <div id={idProx} className={`relative w-80 h-64 desktop:bg-no-repeat shadow-md shadow-[#0b0b1c] dark:shadow-none desktop:bg-cover desktop:w-[430px] bg-top bg-local rounded-2xl flex flex-col justify-end items-end`}>
            <img className='object-cover relative w-full h-full translate-y-28 rounded-2xl' src={image} alt="" />
                <button className='absolute top-2 right-2 z-50' onClick={handleFavoriteClick}>
                    <FavIcon className='cursor-pointer text-4xl text-white' />
                </button>
                <div className='h-28 dark:bg-[#523276] bg-[#0B0B1C] opacity-90 w-full   rounded-b-2xl flex  justify-between px-2 py-1'>
                    <div className='flex flex-col items-start opacity-90 '>
                        <h2 className=' text-white font-bold line-clamp-1 w-[140px] desktop:w-[300px]'>{name}</h2>
                       {quantity == null ? <></> : <p className='text-white text-sm items-center flex gap-1'>
                            <BsTicketPerforated />
                            {quantity > 10 ? quantity : (quantity === 0 ? 'Sold out' : `Only ${quantity} tickets left`)}
                        </p>}
                        <p className='text-white text-sm items-center flex gap-1'><FaRegCalendarAlt />{date}</p>
                        <p className='text-white text-sm items-center flex gap-1'>{time}</p>
                        <p className='text-white text-sm items-center flex gap-1'>{location}</p>
                    </div>
                    {formattedTotal.includes("NaN")? <></> :<div className='flex flex-col items-start opacity-90'>
                        <h3 className='font-semibold text-white'>Tickets from</h3>
                        <p className='text-sm text-white w-full text-end'>{formattedTotal}</p>
                    </div>}
                </div>
            </div>
        </Link>
    )
}

export default CardEvent