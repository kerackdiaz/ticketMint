import React, { useEffect, useState } from 'react'
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import { CgAdd } from "react-icons/cg";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsTicketPerforated } from "react-icons/bs";
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


function DetailsEvent() {
  const [onFav, setOnFav] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const event = useSelector((state) => state.authReducer.events)
  const {id} = useParams()

    const handleFav = () => {
        setOnFav(!onFav)
        if (!onFav) {
          localStorage.setItem('favorite', id)
        }
    }

    const handleBuy = (e) => {
      e.preventDefault()
      alert('Compraste ' + quantity + ' tickets')
    /*axios.post('https://ticket-mint-api.herokuapp.com/buy',(datos), { 
        headers: {
          Authorization: `Bearer ${token}`
        }
    }) */
  }

    const handleQuantity = (e) => {
      setQuantity(e.target.value)
    }

    const handleAdd = () => {
      if (quantity < 10){
        setQuantity(quantity + 1)
      }
    }

    const handleSubtract = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1)
      }
    }

    const even = Object.values(event).find((event) => event.id === id)

  return (
    <div className={'bg-[url("'+ even.imageURL +'")] bg-contain md:bg-cover md:bg-no-repeat flex flex-col items-center justify-end w-screen h-screen bg-top '}>
      <div className='bg-[#55347b] p-3 w-full rounded-t-2xl md:w-1/2'>
        <div className=''>
          <div className='flex justify-between items-center '>
            <h2 className='text-white text-2xl font-bold'>{even.name}</h2>
            {
                !onFav ? <CiStar className='text-4xl text-white cursor-pointer' onClick={handleFav}/> : <TiStarFullOutline className=' cursor-pointer text-4xl text-white' onClick={handleFav}/>
            }
          </div>

          <div className='flex justify-between border-b-2 border-[#8468fb] p-3'>
            <div className='flex flex-col items-start opacity-90'>
              <p className='text-white pb-3 text-sm items-center flex gap-1'><FaRegCalendarAlt/>{even.date}</p>
              <p className='text-white pb-3 text-sm items-center flex gap-1'><BsTicketPerforated/>Only {/* even.tickets */} tickets left</p>
              <p className='text-white text-sm items-center flex gap-1'><FaRegClock/>9:00 PM - 10:00 PM{/* even.time */}</p>
            </div>
            <section className='flex flex-col items-end opacity-90'>
              {/* Aqui van los precios */}
              <h3 className='font-semibold text-white'>Tickets from</h3>
              <p className='text-sm text-white'>140.000 COP</p>
              <p className='text-sm text-white'>30.72 USDT</p>
              <p className='text-sm text-white'>25.050 ARS</p>
          </section>

          </div>
        </div>
        <form onSubmit={handleBuy} className='flex flex-wrap justify-between '>
          <div className='flex flex-col items-start opacity-90'>
            {/* Moneda de pago */}
            <p className='text-sm text-white py-3'>Your payment will be made in</p>
            <select className='text-white text-sm mb-2 bg-[#55347b] border py-1 px-3'>
              <option value="COP" >COP</option>
            </select>
          </div>
            {/* Stocks */}
          <p className='text-sm text-white p-3'>Only {/* even.tickets */}tickets left </p>
          <div className='w-screen flex justify-between items-center border-b-2 border-[#8468fb] pb-3'>
            <div>
              {/* Cantidades a comprar */}
              <p className='text-sm text-white text-center pb-1'>Quantity</p>
              <div className='flex'>
              <IoMdRemoveCircleOutline onClick={handleSubtract} className='text-white text-2xl' />
              <input type='number' className='text-white w-8 text-center bg-[#55347b]' onInput={handleQuantity} min={1} max={10} value={quantity} />
              <CgAdd onClick={handleAdd} className='text-white text-2xl'/>
              </div>
            </div>
            {/* Tipo de ticket */}
            <select className='text-white bg-[#55347b] text-sm border py-1 px-1'>
              <option value="">General</option>
              {
                /* even.ticketTypes.map((type, index) => (
                  <option value={type} key={index}>{type}</option>)) */
              }
            </select>
            <div>
              <p className='text-sm text-white'>Total with taxes</p>
              <p className='text-lg font-semibold text-white text-center'>$150.000</p>
            </div>
          </div>
          
        <div onSubmit={handleBuy} className='flex justify-center gap-2 p-3 w-full'>
          <button type="submit" className='text-white bg-[#8468fb] py-2 w-[50%]  rounded-xl'>Buy</button>
          <Link to={'/event'} className='border-2 border-[#8468fb] py-2 w-[50%] rounded-xl text-center'>
          <button type="button" className='text-white'>Cancel</button>
          </Link>
        </div>
        </form>
      </div>

    </div>
  )
}

export default DetailsEvent