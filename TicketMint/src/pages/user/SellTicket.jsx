import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { BsQrCodeScan } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import QRCode from "react-qr-code";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import ScanQr from '../../../public/ScanQR.png'



function SellTicket() {
    const token = useSelector((state) => state.authReducer.token.token)
    const UserData = useSelector((state) => state.authReducer.user)
    const events = useSelector((state) => state.authReducer.events)
    const MyTickets = Object.values(UserData.clientTicket)
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
                if (res.data.success) {
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

        <div className='flex flex-1 flex-col items-center min-h-screen'>

            <div
                className='absolute inset-0 w-full h-full dark:opacity-50'
                style={{
                    backgroundImage: `url(${eventTicket.imageURL})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(10px)',
                    zIndex: 0,
                }}
            ></div>


            <div className='z-10 p-3 gap-6 flex flex-col justify-center items-center desktop:mt-1 min-h-screen'>

                <h2 className='text-3xl text-white pt-3 destop:pt-0 desktop:text-5xl'>Sell Ticket/ Transfer Ticket</h2>
                <form onSubmit={hanleSubmit} className=' bg--slate-500 flex flex-col justify-center gap-20 desktop:w-[80%] desktop:flex-row w-full items-center md:w-1/2 xl:w-1/3 rounded-lg dark:shadow-none'>
                    <img className='bg--purple-500 laptop:w-4/5 movil:w-1/3 desktop:w-1/3' src={eventTicket.imageURL} alt="" />


                    <div className='flex flex-col items-center gap-2 w-1/4 text-center bg--green-50'>
                        <label className='w-full text-center'>
                            <p className='text-white text-center'>How much will the ticket sell for?</p>
                            <input required
                                type="number"
                                min={0}
                                onChange={hanleInput}
                                ref={ticketPricing}
                                className='w-[90%] text-center py-2 pl-4 text-white  desktop:w-4/5 bg-[#0b0b1c] border border-[#8468fb] text-lg placeholder:text-center rounded-lg'
                                placeholder={`E.g: $${ticket.price} `} />
                        </label>

                        <label className='w-full text-center'>
                            <p className='text-white text-center'>How many tickets will you transfer?</p>
                            <input required
                                type="number"
                                min={0}
                                max={ticket.quantity}
                                ref={ticketsAmount}
                                className='w-[90%] text-center py-2 pl-4 text-white  desktop:w-4/5 bg-[#0b0b1c] border border-[#8468fb] text-lg placeholder:text-center rounded-lg'
                                placeholder={`Up to: ${ticket.quantity} `} />
                        </label>


                        <label className='w-full text-center'>
                            <p className='text-white text-center'>User destination email:</p>
                            <input required
                                ref={destinationEmail}
                                type="email"
                                className='w-[90%] text-center py-2 desktop:w-4/5  bg-[#0b0b1c] text-white border border-[#8468fb] text-lg placeholder:text-center rounded-lg'
                                placeholder="client@example.com" />
                        </label>
                        {
                            isAGift ? <button className='bg--[#8468fb] py-2 w-[60%] md:w-[150px] rounded-lg text-white' type="submit">Give away</button>
                                : <button className='bg-[#8468fb] w-[60%] py-2 md:w-[150px] rounded-lg text-white' type="submit" onClick={handleTap}>Transfer</button>
                        }


                        <div className='flex flex-col gap-2'>

                            {
                                showQR ?
                                    <>
                                        {/* <div className=' flex flex-col items-center'>
                                            <BsQrCodeScan className='text-3xl dark:text-white text-[#0b0b1c]' />
                                            <p className='dark:text-white text-[#0b0b1c] opacity-90' onClick={handleTap}>Present QR on scanner</p>
                                        </div> */}

                                        <div id='qr' className='mx-auto w-[256px] h-[256px] p-4 bg-white flex justify-center items-center rounded-xl'>
                                            <QRCode value={qrValue} size={228} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                                        </div>
                                    </> :
                                    <div className='dark:bg-gray-900 bg-white m-auto rounded-xl w-[256px] h-[256px]'>
                                        <MdKeyboardDoubleArrowUp className='text-3xl m-auto dark:text-gray-300 text-[#0b0b1c]' />
                                        <p className='dark:text-gray-300 text-xs text-[#0b0b1c]'>
                                            Press the Transfer to generate a scan.
                                        </p>
                                        <img src={ScanQr} className='w-52 relative bottom-2 mx-auto' alt="" />
                                    </div>
                            }
                            <div>
                                <p className='dark:text-white opacity-60 w-[185px] md:w-full text-center'>The code will be updated in 10 seconds</p>
                            </div>
                        </div>
                    </div>
                </form>

                <div className='z-10 p-3 gap-6 flex flex-col justify-center items-center'>
                    <h2 className='text-3xl dark:text-white text-[#0b0b1c] pt-3 desktop:text-5xl'>Sell Ticket/ Transfer Ticket</h2>
                    <form onSubmit={hanleSubmit} className=' bg--slate-500 flex flex-col justify-center gap-20 desktop:w-[80%] desktop:flex-row w-full items-center md:w-1/2 xl:w-1/3 shadow-black shadow-2xl rounded-lg dark:shadow-none'>
                        <img className='bg--purple-500 laptop:w-4/5 movil:w-1/3 desktop:w-1/3' src={eventTicket.imageURL} alt="" />


                        <div className='flex flex-col items-center gap-2 w-1/4 text-center bg--green-50'>
                            <label className='w-full text-center'>
                                <p className='dark:text-white text-center'>How much will the ticket sell for?</p>
                                <input required
                                    type="number"
                                    min={0}
                                    onChange={hanleInput}
                                    ref={ticketPricing}
                                    className='w-[90%] text-center py-2 text-white  desktop:w-4/5 bg-[#0b0b1c] border border-[#8468fb] placeholder:text-center rounded-lg'
                                    placeholder={`E.g: $${ticket.price} `} />
                            </label>

                            <label className='w-full text-center'>
                                <p className='dark:text-white text-center'>How many tickets will you transfer?</p>
                                <input required
                                    type="number"
                                    min={0}
                                    max={ticket.quantity}
                                    ref={ticketsAmount}
                                    className='w-[90%] text-center py-2 text-white  desktop:w-4/5 bg-[#0b0b1c] border border-[#8468fb] placeholder:text-center rounded-lg'
                                    placeholder={`Up to: ${ticket.quantity} `} />
                            </label>


                            <label className='w-full text-center'>
                                <p className='dark:text-white text-center'>User destination email:</p>
                                <input required
                                    ref={destinationEmail}
                                    type="email"
                                    className='w-[90%] text-center desktop:w-4/5 py-2 bg-[#0b0b1c] text-white border border-[#8468fb] text-lg placeholder:text-center rounded-lg'
                                    placeholder="client@example.com" />
                            </label>
                            {
                                isAGift ? <button className='bg--[#8468fb] py-2 w-[60%] md:w-[150px] rounded-lg text-white' type="submit">Give away</button>
                                    : <button className='bg-[#8468fb] w-[60%] py-2 md:w-[150px] rounded-lg text-white' type="submit">Transfer</button>
                            }


                            <div className='flex flex-col gap-2'>

                                {
                                    showQR ?
                                        <>
                                            <div className='bg-red-500 flex flex-col items-center'>
                                                <BsQrCodeScan className='text-3xl dark:text-white text-[#0b0b1c]' />
                                                <p className='dark:text-white text-[#0b0b1c] opacity-90' onClick={handleTap}>Present QR on scanner</p>
                                            </div>

                                            <div id='qr' className='mx-auto w-[256px] h-[256px] p-4 bg-white flex justify-center items-center rounded-xl'>
                                                <QRCode value={qrValue} size={228} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                                            </div>
                                        </> :
                                        <div className='dark:bg-gray-900 bg-white m-auto rounded-xl w-[228px] h-[228px]'>
                                            <MdKeyboardDoubleArrowUp className='text-3xl m-auto dark:text-gray-300 text-[#0b0b1c]' />
                                            <p className='dark:text-gray-300 text-xs text-[#0b0b1c]'>
                                                Press the Transfer to generate a scan.
                                            </p>
                                            <img src={ScanQr} className='w-52 relative bottom-2 mx-auto' alt="" />
                                        </div>
                                }
                                <div>
                                    <p className='dark:text-white opacity-60 w-[185px] md:w-full text-center'>The code will be updated in 10 seconds</p>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default SellTicket