import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { BsQrCodeScan } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import QRCode from "react-qr-code";


function SellTicket() {
    const token = useSelector((state) => state.authReducer.token.token)
    const UserData = useSelector((state) => state.authReducer.user)
    const events = useSelector((state) => state.authReducer.events)
    const MyTickets= Object.values(UserData.clientTicket)
    const [isAGift, setIsAGift] = useState(false)
    const { id } = useParams()
    const [showQR, setShowQR] = useState(false);
    const [qrValue, setQrValue] = useState(`unautorized access`);
    const ticket = MyTickets?.find(ticket => ticket.id === id);
    const eventTicket = Object.values(events)?.find((event) => event.id === ticket.eventId)
    console.log(eventTicket)
    const navigate = useNavigate();

    const destinationEmail = useRef("");
    const ticketPricing = useRef(0);
    const ticketsAmount = useRef(0);
    const [postData, setPostData] = useState({
        ticketDestinationEmail: "",
        description: "",
        ticketID: "",
        ticketPrice: 0,
        quantity: 0
    });


    const hanleSubmit = (e) => {
        e.preventDefault()
        const postData = {
            ticketID: id,
            description: "",
            ticketDestinationEmail: destinationEmail.current.value,
            ticketPrice: ticketPricing.current.value,
            quantity: ticketsAmount.current.value
        }

        axios.post("http://localhost:8080/api/transactions/transferTicket", postData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            if(res.data.success) {
                navigate("/mytickets")
            }
        })
        .catch(err => console.log(err))

    }
    const hanleInput = (e) => {
        if (e.target.value === "0") {
            setIsAGift(true)
            return
        }
        setIsAGift(false)
        console.log(e.target.value);
    }

    const handleTap = () => {
        setShowQR(true);
    };

    useEffect(() => {
        setQrValue(`http://localhost:8080/api/access/verifyAccess?id=${id}`);
    }, [id]);
    return (
        <div className=' desktop:mt-20 flex flex-1 p-3 gap-6 flex-col items-center'>
            <h2 className='text-3xl dark:text-white text-[#0b0b1c] pt-3 desktop:text-5xl'>Sell Ticket/ Transfer Ticket</h2>
            <form onSubmit={hanleSubmit} className='flex flex-col desktop:w-[420px] gap-2 w-full items-center md:w-1/2 xl:w-1/3 shadow-black shadow-2xl rounded-lg dark:shadow-none'>
                <img className='laptop:w-4/5 movil:w-1/3' src={eventTicket.imageURL} alt="" />


                <label className='w-full text-center'>
                    <input required 
                    type="number"
                    min={0} 
                    onChange={hanleInput} 
                    ref={ticketPricing}
                    className='w-[90%] text-center py-1 text-white  desktop:w-4/5 bg-[#0b0b1c] border border-[#8468fb] placeholder:text-sm placeholder:text-center rounded-lg' 
                    placeholder='How much will the ticket sell for?' />
                </label>

                <label className='w-full text-center'>
                    <input required 
                    type="number"
                    min={0} 
                    max={ticket.quantity}
                    ref={ticketsAmount}
                    className='w-[90%] text-center py-1 text-white  desktop:w-4/5 bg-[#0b0b1c] border border-[#8468fb] placeholder:text-sm placeholder:text-center rounded-lg' 
                    placeholder='How many tickets will you transfer?' />
                </label>

                <label htmlFor=""></label>
                <label className='w-full text-center'>
                    <input required  
                    ref={destinationEmail} 
                    type="email" 
                    className='w-[90%] text-center desktop:w-4/5 py-1 bg-[#0b0b1c] text-white border border-[#8468fb] placeholder:text-sm placeholder:text-center rounded-lg' 
                    placeholder="User destination email:" />
                </label>

                <div className='flex flex-col items-center'>
                    <BsQrCodeScan className='text-3xl dark:text-white text-[#0b0b1c]' />
                    <p className='dark:text-white text-[#0b0b1c] opacity-90' onClick={handleTap}>Present QR on scanner</p>
                </div>
                {showQR && <div id='qr' className='w-[256px] h-[256px] p-4 bg-white flex justify-center items-center rounded-xl'>
                    <QRCode value={qrValue} size={228} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />

                </div>}
                <div>
                    <p className='text-white opacity-60 w-[185px] md:w-full text-center'>The code will be updated in 10 seconds</p>
                </div>
                {
                    isAGift ? <button className='bg-[#8468fb] py-1 w-[30%] md:w-[150px] rounded-lg text-white' type="submit">Give away</button>
                        : <button className='bg-[#8468fb] w-[30%] py-1 md:w-[150px] rounded-lg text-white' type="submit">Accept</button>
                }

            </form>
        </div>
    )
}

export default SellTicket