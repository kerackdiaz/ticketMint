import React, { useEffect, useState } from 'react'
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import { CgAdd } from "react-icons/cg";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsTicketPerforated } from "react-icons/bs";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";
import Swal from 'sweetalert2'

function DetailsEvent() {
  const { id } = useParams()
  const EVENTS = useSelector((state) => state.authReducer.events)
  const token = useSelector((state) => state.authReducer.token.token)
  const [onFav, setOnFav] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const event = Object.values(EVENTS).find(event => event.id === id);
  const [ticketTypeSelected, setTicketTypeSelected] = useState(event?.ticketTypes ? event.ticketTypes[0] : {});
  const [numericPrice, setNumericPrice] = useState(null);
  const [purchaseData, setPurchaseData] = useState({})
  const [ticketId, setTicketId] = useState("");
  const [formatOption, setFormatOption] = useState({
    country: 'en-US',
    currency: 'USD',
    currencyFactor: 1
  })
  const COPToUSD = 3860;
  const ARSToUSD = 1010;
  const navigate = useNavigate();

  useEffect(() => {
    if (ticketTypeSelected) {
      setNumericPrice(ticketTypeSelected?.basePrice);
      setTicketId(ticketTypeSelected?.id);
    }
  }, [ticketTypeSelected])
  
  const handleFav = () => {
    setOnFav(!onFav)
    if (!onFav) {
      localStorage.setItem('favorite', id)
    }
  }
  useEffect(() => {
    console.log(purchaseData);
  }, [purchaseData]);




  const handleAdd = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1)
      setNumericPrice(numericPrice + ticketTypeSelected?.basePrice)
    }

  }

  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      setNumericPrice(numericPrice - ticketTypeSelected?.basePrice)
    }
  }

  const currencyConverterPro = (priceToParse, currency) => {
    if (currency === "USDT") {
      const formattedPrice = (priceToParse)?.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      return `USDT ${formattedPrice}`;
    }
    if (currency === "ARS") {
      const formattedPrice = (priceToParse * 1010).toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
      });
      return `AR$ ${formattedPrice}`;
    }
    if (currency === "COP") {
      const formattedPrice = (priceToParse * 3860).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP'
      });
      return `COP ${formattedPrice}`;

    }
  }

  const handleCurrencySelected = (e) => {
    const currency = e.target.value;
    if (currency === "USDT") {
      setFormatOption({
        country: 'en-US',
        currency: 'USD',
        currencyFactor: 1
      })
    }
    if (currency === "ARS") {
      setFormatOption({
        country: 'es-AR',
        currency: 'ARS',
        currencyFactor: ARSToUSD
      })
    }
    if (currency === "COP") {
      setFormatOption({
        country: 'es-CO',
        currency: 'COP',
        currencyFactor: COPToUSD
      })
    }
  }

  const handleTicketTypeChange = (e) => {
    const selectedTicketType = event?.ticketTypes?.find(ticket => ticket.type === e.target.value);
    if (selectedTicketType) {
      setTicketTypeSelected(selectedTicketType);
      setPurchaseData({
        ticketId: ticketId,
        quantity: quantity,
        totalPrice: selectedTicketType.basePrice
      })

    }
  }

  const handleBuy = (e) => {
    e.preventDefault()
  
    const updatedPurchaseData = {
      ticketId: ticketId,
      quantity: quantity,
      totalPrice: numericPrice
    };
  
    setPurchaseData(updatedPurchaseData)
  
    console.log(updatedPurchaseData);
    axios.post('http://localhost:8080/api/tickets/buy', updatedPurchaseData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if(res.data.success) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: `Ticket bought successfully`
          });
          navigate("/mytickets");
      }
      })
      .catch(err => console.error(err))
  }

  return (

    <div className=' bg-contain md:bg-cover pb-[50px] desktop:pb-0 md:bg-no-repeat flex flex-col items-center justify-end w-screen h-screen bg-top '>
      <img className='object-cover absolute -z-0 w-full movil:h-4/5 laptop:h-full movil:bottom-[34%] laptop:bottom-[12%] translate-y-28 rounded-2xl' src={event.imageURL} alt="" />
      <div className='bg-[#55347b] z-10 p-3 w-full rounded-t-2xl md:w-1/2'>
        <div className=''>
          <div className='flex justify-between items-center '>
            <h2 className='text-white text-2xl font-bold'>{event.name}</h2>
            {
              !onFav ? <CiStar className='text-4xl text-white cursor-pointer' onClick={handleFav} /> : <TiStarFullOutline className=' cursor-pointer text-4xl text-white' onClick={handleFav} />
            }
          </div>

          <div className='flex justify-between border-b-2 border-[#8468fb] p-3'>
            <div className='flex flex-col items-start opacity-90'>
              <p className='text-white pb-3 text-sm items-center flex gap-1'><FaRegCalendarAlt />{event.date}</p>
              <p className='text-white pb-3 text-sm items-center flex gap-1'><BsTicketPerforated />Only {ticketTypeSelected?.availableQuantity < 10 ? <span className='text-red-500 font-bold '>{ticketTypeSelected?.availableQuantity}</span> : ticketTypeSelected?.availableQuantity} tickets left</p>
              <p className='text-white text-sm items-center flex gap-1'><FaRegClock />{event.time}</p>
            </div>
            <section className='flex flex-col items-end opacity-90'>
              {/* Aqui van los precios */}
              <h3 className='font-semibold text-white'>Tickets from</h3>
              <p className='text-sm text-white'>{currencyConverterPro(ticketTypeSelected?.basePrice, "COP")}</p>
              <p className='text-sm text-white'>{currencyConverterPro(ticketTypeSelected?.basePrice, "USDT")}</p>
              <p className='text-sm text-white'>{currencyConverterPro(ticketTypeSelected?.basePrice, "ARS")}</p>
            </section>

          </div>
        </div>
        <form onSubmit={handleBuy} className='flex flex-wrap justify-between '>
          <div className='flex flex-col items-start opacity-90'>
            {/* Moneda de pago */}
            <p className='text-sm text-white py-3'>Your payment will be made in</p>
            <select onChange={handleCurrencySelected} className='text-white text-sm mb-2 bg-[#55347b] border py-1 px-3'>
              <option value="USDT">USDT</option>
              <option value="COP">COP</option>
              <option value="ARS">ARS</option>
            </select>
          </div>
          {/* Stocks */}
          <p className='text-sm text-white p-3'>Only {ticketTypeSelected?.availableQuantity < 10 ? <span className='text-red-500 font-bold '>{ticketTypeSelected?.availableQuantity}</span> : ticketTypeSelected?.availableQuantity} tickets left </p>
          <div className='w-screen flex justify-between items-center border-b-2 border-[#8468fb] pb-3'>
            <div>
              {/* Cantidades a comprar */}
              <p className='text-sm text-white text-center pb-1'>Quantity</p>
              <div className='flex items-center'>
                <IoMdRemoveCircleOutline onClick={handleSubtract} className='text-white text-2xl' />
                <span className='text-white text-lg'>| {quantity} |</span>
                <CgAdd onClick={handleAdd} className='text-white text-2xl' />
              </div>
            </div>
            {/* Tipo de ticket */}

            <select onChange={handleTicketTypeChange} c lassName='text-white bg-[#55347b] text-sm border py-1 px-1'>
              <option defaultValue  value={event?.ticketTypes[0]?.type}>Select Type</option>
              {
                event.ticketTypes?.map((type, index) => (
                  <option value={type.type} key={index}>{type.type}</option>))
              }
            </select>
            <div className='flex flex-col pr-3 w-[120px]'>
              <p className='text-sm text-end text-white'>Total with taxes</p>
              
              <p className='text-lg font-semibold text-white text-end'>{(numericPrice ? numericPrice * formatOption.currencyFactor : 0).toLocaleString(formatOption.country, {
                style: 'currency',
                currency: formatOption.currency
                
              })}</p>
            </div>
          </div>

          <div onSubmit={handleBuy} className='flex justify-center gap-2 p-3 w-full'>
            <button type="submit" className='text-white bg-[#8468fb] py-2 w-[50%]  rounded-xl'>Buy</button>
            <Link to={'/'} className='border-2 border-[#8468fb] py-2 w-[50%] rounded-xl text-center'>
              <button type="button" className='text-white'>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>

  )
}

export default DetailsEvent